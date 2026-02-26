import type { ComponentPropsWithRef } from 'react';

export type IconName = string;

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'current';

export interface IconProps extends Omit<ComponentPropsWithRef<'span'>, 'children' | 'color'> {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  decorative?: boolean;
  title?: string;
}
