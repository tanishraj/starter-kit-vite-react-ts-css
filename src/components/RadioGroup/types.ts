import type { RadioSize } from '../Radio';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface RadioGroupProps extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: RadioSize;
  orientation?: RadioGroupOrientation;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  children?: ReactNode;
}
