import clsx from 'clsx';

import type { SpinnerProps } from './types';
import './Spinner.css';

export function Spinner({
  size = 'md',
  color = 'primary',
  label = 'Loading',
  className,
  ...rest
}: SpinnerProps) {
  return (
    <output
      {...rest}
      aria-label={label}
      aria-live="polite"
      className={clsx(
        'spinner',
        `spinner--${size}`,
        color !== 'current' && `spinner--color-${color}`,
        className,
      )}
    />
  );
}
