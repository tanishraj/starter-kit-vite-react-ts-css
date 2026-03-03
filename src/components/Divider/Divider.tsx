import clsx from 'clsx';

import type { DividerProps } from './types';
import type { CSSProperties } from 'react';

import './Divider.css';

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'primary',
  inset = 'none',
  thickness,
  decorative = true,
  className,
  style,
  ...rest
}: DividerProps) {
  const thicknessStyle: CSSProperties | undefined =
    typeof thickness === 'number'
      ? ({ '--divider-thickness': `${thickness}px` } as CSSProperties)
      : undefined;

  return (
    <div
      {...rest}
      aria-hidden={decorative || undefined}
      aria-orientation={!decorative ? orientation : undefined}
      className={clsx(
        'divider',
        `divider--${orientation}`,
        `divider--${variant}`,
        `divider--inset-${inset}`,
        color !== 'current' && `divider--color-${color}`,
        className,
      )}
      role={!decorative ? 'separator' : undefined}
      style={{ ...thicknessStyle, ...style }}
    />
  );
}
