// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const takeFirst = <T extends any[]>(values: T): T[number] => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return values[0]!;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const takeFirstOrNull = <T extends any[]>(
  values: T
): T[number] | null => {
  if (values.length !== 1) return null;
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return values[0]!;
};
