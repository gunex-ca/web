"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Re-export server-safe codecs for external use
export {
  booleanCodec,
  numberCodec,
  stringCodec,
  optional,
  type QueryParamCodec,
} from "./query-param-codecs";

// Import for internal use within this file
import { type QueryParamCodec, booleanCodec } from "./query-param-codecs";

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
      options?: { replace?: boolean },
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
      if (options?.replace ?? true) router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    },
    [pathname, router, searchParamsString],
  );

  return setQueryParams;
}

// Debounce utilities
export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delayMs: number,
  deps: ReadonlyArray<unknown> = [],
) {
  const timeoutRef = useRef<number | null>(null);
  const latestCallbackRef = useRef<T>(callback);

  useEffect(() => {
    latestCallbackRef.current = callback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        latestCallbackRef.current(...(args as unknown as Parameters<T>));
      }, delayMs);
    }) as T,
    deps,
  );
}

export function useQueryParam<T>(
  key: string,
  codec: QueryParamCodec<T>,
  options?: { debounceMs?: number },
) {
  const searchParams = useSearchParams();
  const setQueryParams = useSetQueryParams();
  const debouncedSetQueryParams = useDebouncedCallback(
    setQueryParams,
    options?.debounceMs ?? 150,
    [setQueryParams],
  );

  const value = useMemo(
    () => codec.parse(searchParams.get(key)),
    [codec, key, searchParams],
  );

  const setValue = useCallback(
    (next: T, options?: { replace?: boolean }) => {
      const serialized = codec.serialize(next);
      if ((options?.replace ?? true) === false) {
        setQueryParams({ [key]: serialized }, options);
      } else {
        debouncedSetQueryParams({ [key]: serialized }, options);
      }
    },
    [codec, debouncedSetQueryParams, key, setQueryParams],
  );

  return [value, setValue] as const;
}

export function useToggleQueryParam(
  key: string,
  options?: {
    defaultValue?: boolean;
    serializeFalseAs?: "0" | "false" | null;
    debounceMs?: number;
  },
) {
  const codec = useMemo(
    () =>
      booleanCodec(options?.defaultValue ?? false, {
        serializeFalseAs: options?.serializeFalseAs ?? null,
      }),
    [options?.defaultValue, options?.serializeFalseAs],
  );
  const [value, setValue] = useQueryParam<boolean>(key, codec, {
    debounceMs: options?.debounceMs,
  });

  const toggle = useCallback(() => setValue(!value), [setValue, value]);
  return [value, toggle, setValue] as const;
}

// ----- Strongly-typed schema utilities -----

export type InferCodecType<C> = C extends QueryParamCodec<infer T> ? T : never;
export type SchemaValues<S extends Record<string, QueryParamCodec<unknown>>> = {
  [K in keyof S]: InferCodecType<S[K]>;
};

export function useQueryParamsSchema<
  S extends Record<string, QueryParamCodec<unknown>>,
>(schema: S) {
  const searchParams = useSearchParams();
  const setQueryParams = useSetQueryParams();
  const debouncedSetQueryParams = useDebouncedCallback(setQueryParams, 250, [
    setQueryParams,
  ]);

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
          value as never,
        );
        serialized[key as string] = result;
      }
      if ((options?.replace ?? true) === false) {
        setQueryParams(serialized, options);
      } else {
        debouncedSetQueryParams(serialized, options);
      }
    },
    [debouncedSetQueryParams, schema, setQueryParams],
  );

  function useParam<K extends keyof S>(
    key: K,
    options?: { debounceMs?: number },
  ) {
    const externalValue = values[key];
    const [localValue, setLocalValue] = useState<SchemaValues<S>[K]>(
      externalValue as SchemaValues<S>[K],
    );

    useEffect(() => {
      setLocalValue(externalValue as SchemaValues<S>[K]);
    }, [externalValue]);

    const debouncedApply = useDebouncedCallback(
      (next: SchemaValues<S>[K], applyOptions?: { replace?: boolean }) => {
        setValues(
          { [key]: next } as unknown as Partial<SchemaValues<S>>,
          applyOptions,
        );
      },
      options?.debounceMs ?? 150,
      [key, setValues, options?.debounceMs],
    );

    const setValue = (
      next: SchemaValues<S>[K],
      applyOptions?: { replace?: boolean },
    ) => {
      setLocalValue(next);
      debouncedApply(next, applyOptions);
    };

    return [localValue, setValue] as const;
  }

  const setParam = useCallback(
    <K extends keyof S>(
      key: K,
      next: SchemaValues<S>[K],
      options?: { replace?: boolean },
    ) => {
      setValues(
        { [key]: next } as unknown as Partial<SchemaValues<S>>,
        options,
      );
    },
    [setValues],
  );

  return { values, setValues, useParam, setParam } as const;
}

export function createQueryParamsHook<
  S extends Record<string, QueryParamCodec<unknown>>,
>(schema: S) {
  return function useTypedQueryParams() {
    return useQueryParamsSchema(schema);
  };
}
