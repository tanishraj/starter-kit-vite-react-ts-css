import clsx from 'clsx';

import type { ButtonProps } from './types';
import type { ReactNode } from 'react';
import './Button.css';

function renderIcon(icon: ReactNode, position: 'start' | 'end') {
  if (!icon) {
    return null;
  }

  return (
    <span aria-hidden="true" className={clsx('btn__icon', `btn__icon--${position}`)}>
      {icon}
    </span>
  );
}

export function Button({
  type = 'button',
  variant = 'solid',
  color = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  disabled,
  className,
  children,
  ref,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      ref={ref}
      className={clsx(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        `btn--color-${color}`,
        fullWidth && 'btn--full-width',
        loading && 'btn--loading',
        className,
      )}
      disabled={isDisabled}
      type={type}
    >
      {loading && (
        <span aria-hidden="true" className="btn__loader">
          <span className="btn__spinner" />
        </span>
      )}
      <span className={clsx('btn__content', loading && 'btn__content--hidden')}>
        {renderIcon(startIcon, 'start')}
        <span>{children}</span>
        {renderIcon(endIcon, 'end')}
      </span>
    </button>
  );
}
