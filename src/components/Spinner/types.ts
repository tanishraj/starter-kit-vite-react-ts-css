import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type SpinnerColor =
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'current';

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
}
