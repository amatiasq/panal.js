export function replaceItem<T>(list: T[], index: number, value: T) {
  const before = list.slice(0, index);
  const after = list.slice(index + 1);
  return [...before, value, ...after];
}

export function replaceItems<T>(
  list: T[],
  index: number,
  amount: number,
  ...values: T[]
) {
  const before = list.slice(0, index);
  const after = list.slice(index + amount);
  return [...before, ...values, ...after];
}

export function px<T extends number | undefined>(value: T) {
  return value && `${value}px`;
}
