import type { SpinnerProps } from './types';
import './Spinner.css';

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

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
      className={cx(
        'spinner',
        `spinner--${size}`,
        color !== 'current' && `spinner--color-${color}`,
        className,
      )}
    />
  );
}
