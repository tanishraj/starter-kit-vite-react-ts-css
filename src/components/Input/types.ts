import type { ComponentPropsWithRef, ReactNode } from 'react';

export type InputVariant = 'outline' | 'soft';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputTone = 'default' | 'success' | 'warning' | 'danger';

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'prefix' | 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  variant?: InputVariant;
  size?: InputSize;
  tone?: InputTone;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}
