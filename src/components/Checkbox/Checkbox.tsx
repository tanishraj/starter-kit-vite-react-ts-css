import clsx from 'clsx';
import { useEffect, useId, useRef } from 'react';

import { mergeRefs } from '../../utils';

import type { CheckboxProps } from './types';
import './Checkbox.css';

export function Checkbox({
  id,
  label,
  hint,
  error,
  size = 'md',
  indeterminate = false,
  fullWidth = false,
  disabled,
  required,
  className,
  ref,
  ...rest
}: CheckboxProps) {
  const reactId = useId();
  const inputId = id ?? `checkbox-${reactId.replaceAll(':', '')}`;
  const labelId = label ? `${inputId}-label` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = error ? errorId : hintId;
  const localRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!localRef.current) {
      return;
    }

    localRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div
      className={clsx(
        'chk',
        `chk--${size}`,
        fullWidth && 'chk--full-width',
        disabled && 'chk--disabled',
        Boolean(error) && 'chk--invalid',
        className,
      )}
    >
      <label className="chk__field" htmlFor={inputId}>
        <span className="chk__control">
          <input
            {...rest}
            ref={mergeRefs(localRef, ref)}
            aria-describedby={describedBy}
            aria-invalid={Boolean(error) || rest['aria-invalid'] === true}
            aria-labelledby={labelId}
            className="chk__input"
            disabled={disabled}
            id={inputId}
            required={required}
            type="checkbox"
          />
          <span aria-hidden="true" className="chk__indicator" />
        </span>

        {(label || hint || error) && (
          <span className="chk__content">
            {label && (
              <span className="chk__label" id={labelId}>
                {label}
                {required && (
                  <span aria-hidden="true" className="chk__required">
                    *
                  </span>
                )}
              </span>
            )}

            {error ? (
              <span className="chk__message chk__message--error" id={errorId}>
                {error}
              </span>
            ) : (
              hint && (
                <span className="chk__message" id={hintId}>
                  {hint}
                </span>
              )
            )}
          </span>
        )}
      </label>
    </div>
  );
}
