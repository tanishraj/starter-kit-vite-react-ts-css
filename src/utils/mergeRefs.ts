import type { Ref, RefCallback, RefObject } from 'react';

// Type covers the RefCallbacks and RefObjects
type PossibleRef<T> = Ref<T> | undefined;

export interface ISetRefProps<T> {
  ref: PossibleRef<T>;
  value: T | null;
}

export const setRef = <T>({ ref, value }: ISetRefProps<T>): void => {
  if (!ref) return;

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as RefObject<T | null>).current = value;
};

export const mergeRefs = <T>(...refs: PossibleRef<T>[]): RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => setRef({ ref, value }));
  };
};
