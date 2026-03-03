import clsx from 'clsx';
import { useId } from 'react';

import { mergeRefs } from '../../utils';
import { useRadioGroupContext } from '../RadioGroup/context';

import type { RadioProps } from './types';
import type { ChangeEvent } from 'react';
import './Radio.css';

export function Radio({
  id,
  label,
  hint,
  error,
  size,
  fullWidth = false,
  disabled,
  required,
  checked,
  defaultChecked,
  className,
  onChange,
  value,
  ref,
  ...rest
}: RadioProps) {
  const reactId = useId();
  const group = useRadioGroupContext();

  const inputId = id ?? `radio-${reactId.replaceAll(':', '')}`;
  const labelId = label ? `${inputId}-label` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = error ? errorId : hintId;

  const resolvedSize = size ?? group?.size ?? 'md';
  const resolvedDisabled = disabled ?? group?.disabled ?? false;
  const resolvedRequired = required ?? group?.required ?? false;
  const resolvedName = rest.name ?? group?.name;
  const isInvalid = Boolean(error || group?.invalid || rest['aria-invalid'] === true);
  const isGrouped = group != null && typeof value === 'string';
  const isChecked = isGrouped ? group.value === value : checked;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);

    if (event.defaultPrevented || !event.currentTarget.checked || !group) {
      return;
    }

    group.onValueChange(event.currentTarget.value);
  }

  return (
    <div
      className={clsx(
        'radio',
        `radio--${resolvedSize}`,
        fullWidth && 'radio--full-width',
        resolvedDisabled && 'radio--disabled',
        isInvalid && 'radio--invalid',
        className,
      )}
    >
      <label className="radio__field" htmlFor={inputId}>
        <span className="radio__control">
          <input
            {...rest}
            ref={mergeRefs(ref)}
            aria-describedby={describedBy}
            aria-labelledby={labelId}
            checked={isChecked}
            className="radio__input"
            defaultChecked={isGrouped ? undefined : defaultChecked}
            disabled={resolvedDisabled}
            id={inputId}
            name={resolvedName}
            onChange={handleChange}
            required={resolvedRequired}
            type="radio"
            value={value}
          />
          <span aria-hidden="true" className="radio__indicator" />
        </span>

        {(label || hint || error) && (
          <span className="radio__content">
            {label && (
              <span className="radio__label" id={labelId}>
                {label}
                {resolvedRequired && (
                  <span aria-hidden="true" className="radio__required">
                    *
                  </span>
                )}
              </span>
            )}

            {error ? (
              <span className="radio__message radio__message--error" id={errorId}>
                {error}
              </span>
            ) : (
              hint && (
                <span className="radio__message" id={hintId}>
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
