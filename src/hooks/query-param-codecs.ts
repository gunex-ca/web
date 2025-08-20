// Server-safe query parameter codecs (no "use client")

export type QueryParamCodec<T> = {
  parse: (raw: string | null) => T;
  serialize: (value: T) => string | null;
};

export function booleanCodec(
  defaultValue = false,
  options?: { serializeFalseAs?: "0" | "false" | null },
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
  options?: { min?: number; max?: number },
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

export function optional<T>(
  codec: QueryParamCodec<T>,
): QueryParamCodec<T | undefined> {
  return {
    parse: (raw) => (raw === null ? undefined : codec.parse(raw)),
    serialize: (value) => (value === undefined ? null : codec.serialize(value)),
  };
}
