"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type QueryParamCodec<T> = {
  parse: (raw: string | null) => T;
  serialize: (value: T) => string | null;
};

export function booleanCodec(
  defaultValue = false,
  options?: { serializeFalseAs?: "0" | "false" | null }
): QueryParamCodec<boolean> {
  const serializeFalseAs = options?.serializeFalseAs ?? null;
  return {
    parse: (raw) => {
      if (raw === null) return defaultValue;
      const lower = raw.toLowerCase();
      if (
        lower === "1" ||
        lower === "true" ||
        lower === "t" ||
        lower === "yes" ||
        lower === "on"
      )
        return true;
      if (
        lower === "0" ||
        lower === "false" ||
        lower === "f" ||
        lower === "no" ||
        lower === "off"
      )
        return false;
      return defaultValue;
    },
    serialize: (value) => {
      if (value === true) return "1";
      if (serializeFalseAs === null) return null;
      return serializeFalseAs;
    },
  };
}

export function numberCodec(
  defaultValue: number,
  options?: { min?: number; max?: number }
): QueryParamCodec<number> {
  const { min, max } = options ?? {};
  return {
    parse: (raw) => {
      const num = Number(raw);
      if (!Number.isFinite(num)) return defaultValue;
      let value = num;
      if (typeof min === "number") value = Math.max(min, value);
      if (typeof max === "number") value = Math.min(max, value);
      return value;
    },
    serialize: (value) => {
      let v = value;
      if (typeof min === "number") v = Math.max(min, v);
      if (typeof max === "number") v = Math.min(max, v);
      return String(v);
    },
  };
}

export function stringCodec(defaultValue: string): QueryParamCodec<string> {
  return {
    parse: (raw) => (raw === null ? defaultValue : raw),
    serialize: (value) => value,
  };
}

export function useSearchParamsString() {
  const searchParams = useSearchParams();
  return useMemo(() => searchParams.toString(), [searchParams]);
}

export function useSetQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsString = useSearchParamsString();

  const setQueryParams = useCallback(
    (
      updates: Record<string, string | null | undefined>,
      options?: { replace?: boolean }
    ) => {
      const params = new URLSearchParams(searchParamsString);
      let changed = false;
      for (const [key, val] of Object.entries(updates)) {
        const current = params.get(key);
        if (val === null || val === undefined) {
          if (current !== null) {
            params.delete(key);
            changed = true;
          }
        } else {
          if (current !== val) {
            params.set(key, val);
            changed = true;
          }
        }
      }
      if (!changed) return;
      const url = `${pathname}?${params.toString()}`;
      if (options?.replace ?? true) router.replace(url);
      else router.push(url);
    },
    [pathname, router, searchParamsString]
  );

  return setQueryParams;
}

export function useQueryParam<T>(key: string, codec: QueryParamCodec<T>) {
  const searchParams = useSearchParams();
  const setQueryParams = useSetQueryParams();

  const value = useMemo(
    () => codec.parse(searchParams.get(key)),
    [codec, key, searchParams]
  );

  const setValue = useCallback(
    (next: T, options?: { replace?: boolean }) => {
      const serialized = codec.serialize(next);
      setQueryParams({ [key]: serialized }, options);
    },
    [codec, key, setQueryParams]
  );

  return [value, setValue] as const;
}

export function useToggleQueryParam(
  key: string,
  options?: { defaultValue?: boolean; serializeFalseAs?: "0" | "false" | null }
) {
  const codec = useMemo(
    () =>
      booleanCodec(options?.defaultValue ?? false, {
        serializeFalseAs: options?.serializeFalseAs ?? null,
      }),
    [options?.defaultValue, options?.serializeFalseAs]
  );
  const [value, setValue] = useQueryParam<boolean>(key, codec);

  const toggle = useCallback(() => setValue(!value), [setValue, value]);
  return [value, toggle, setValue] as const;
}

// ----- Strongly-typed schema utilities -----

export type InferCodecType<C> = C extends QueryParamCodec<infer T> ? T : never;
export type SchemaValues<S extends Record<string, QueryParamCodec<unknown>>> = {
  [K in keyof S]: InferCodecType<S[K]>;
};

export function optional<T>(
  codec: QueryParamCodec<T>
): QueryParamCodec<T | undefined> {
  return {
    parse: (raw) => (raw === null ? undefined : codec.parse(raw)),
    serialize: (value) => (value === undefined ? null : codec.serialize(value)),
  };
}

export function useQueryParamsSchema<
  S extends Record<string, QueryParamCodec<unknown>>
>(schema: S) {
  const searchParams = useSearchParams();
  const setQueryParams = useSetQueryParams();

  const values = useMemo(() => {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(schema) as Array<keyof S>) {
      const codec = schema[key];
      if (!codec) continue;
      result[key as string] = codec.parse(searchParams.get(key as string));
    }
    return result as SchemaValues<S>;
  }, [schema, searchParams]);

  const setValues = useCallback(
    (updates: Partial<SchemaValues<S>>, options?: { replace?: boolean }) => {
      const serialized: Record<string, string | null> = {};
      for (const key of Object.keys(updates) as Array<keyof S>) {
        const value = updates[key] as SchemaValues<S>[typeof key];
        const codec = schema[key];
        if (!codec) continue;
        const result = (codec as QueryParamCodec<unknown>).serialize(
          value as never
        );
        serialized[key as string] = result;
      }
      setQueryParams(serialized, options);
    },
    [schema, setQueryParams]
  );

  function useParam<K extends keyof S>(key: K) {
    const value = values[key];
    const setValue = useCallback(
      (next: SchemaValues<S>[K], options?: { replace?: boolean }) => {
        setValues(
          { [key]: next } as unknown as Partial<SchemaValues<S>>,
          options
        );
      },
      [key]
    );
    return [value, setValue] as const;
  }

  const setParam = useCallback(
    <K extends keyof S>(
      key: K,
      next: SchemaValues<S>[K],
      options?: { replace?: boolean }
    ) => {
      setValues(
        { [key]: next } as unknown as Partial<SchemaValues<S>>,
        options
      );
    },
    [setValues]
  );

  return { values, setValues, useParam, setParam } as const;
}

export function createQueryParamsHook<
  S extends Record<string, QueryParamCodec<unknown>>
>(schema: S) {
  return function useTypedQueryParams() {
    return useQueryParamsSchema(schema);
  };
}
