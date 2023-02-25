// export function replaceItem<T>(list: T[], index: number, value: T) {
//   const before = list.slice(0, index);
//   const after = list.slice(index + 1);
//   return [...before, value, ...after];
// }

import { RefProp } from './types';

// export function replaceItems<T>(
//   list: T[],
//   index: number,
//   amount: number,
//   ...values: T[]
// ) {
//   const before = list.slice(0, index);
//   const after = list.slice(index + amount);
//   return [...before, ...values, ...after];
// }

export function px<T extends number | undefined>(value: T) {
  return value && `${value}px`;
}

type AnyFunction = (...args: any[]) => any;
export function isCallable<T>(x: T): x is Extract<T, AnyFunction> {
  return typeof x === 'function';
}

export function forwardRef<T extends HTMLElement>(props: RefProp<T>, ref: T) {
  isCallable(props.ref) ? props.ref(ref) : (props.ref = ref);
  return ref;
}
