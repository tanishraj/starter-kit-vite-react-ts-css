import type { ComponentPropsWithRef, ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps
  extends Omit<ComponentPropsWithRef<'input'>, 'children' | 'size' | 'type'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: RadioSize;
  fullWidth?: boolean;
}
