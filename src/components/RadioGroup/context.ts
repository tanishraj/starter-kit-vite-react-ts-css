import { createContext, useContext } from 'react';

import type { RadioSize } from '../Radio';

export interface RadioGroupContextValue {
  name: string;
  value?: string;
  size: RadioSize;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  onValueChange: (value: string) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}
