import { useCallback, useState } from 'react';

export interface IUseControllableStateProps<T> {
  prop?: T;
  defaultProp?: T;
  onChange?: (value: T) => void;
}

export type UseControllableStateReturn<T> = readonly [T | undefined, (next: T) => void];

export const useControllableState = <T>({
  prop,
  defaultProp,
  onChange,
}: IUseControllableStateProps<T>): UseControllableStateReturn<T> => {
  const [uncontrolled, setUncontrolled] = useState<T | undefined>(defaultProp);

  const isControlled = prop != undefined;
  const value = isControlled ? prop : uncontrolled;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [value, setValue] as const;
};
