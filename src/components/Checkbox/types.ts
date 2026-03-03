import type { ComponentPropsWithRef, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<ComponentPropsWithRef<'input'>, 'children' | 'size' | 'type'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: CheckboxSize;
  indeterminate?: boolean;
  fullWidth?: boolean;
}
