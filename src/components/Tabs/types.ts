import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsVariant = 'underline' | 'solid' | 'soft';
export type TabsColor = 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

export interface TabsItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  items: TabsItem[];
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  variant?: TabsVariant;
  color?: TabsColor;
  orientation?: TabsOrientation;
  size?: TabsSize;
  fullWidth?: boolean;
  disabled?: boolean;
  destroyInactivePanel?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
