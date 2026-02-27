import type { HTMLAttributes } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'current';
export type DividerInset = 'none' | 'sm' | 'md' | 'lg';

export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  color?: DividerColor;
  inset?: DividerInset;
  thickness?: number;
  decorative?: boolean;
}
