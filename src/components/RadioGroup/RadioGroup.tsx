import clsx from 'clsx';
import { useId } from 'react';

import { useControllableState } from '../../hooks';

import { RadioGroupContext } from './context';

import type { RadioGroupProps } from './types';
import './RadioGroup.css';

export function RadioGroup({
  id,
  label,
  hint,
  error,
  size = 'md',
  orientation = 'vertical',
  name,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  required = false,
  className,
  children,
  ...rest
}: RadioGroupProps) {
  const reactId = useId();
  const groupId = id ?? `radio-group-${reactId.replaceAll(':', '')}`;
  const labelId = label ? `${groupId}-label` : undefined;
  const hintId = hint ? `${groupId}-hint` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const describedBy = error ? errorId : hintId;
  const groupName = name ?? `${groupId}-name`;
  const invalid = Boolean(error || rest['aria-invalid'] === true);
  const [selectedValue, setSelectedValue] = useControllableState<string>({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <div
      {...rest}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      aria-labelledby={labelId}
      className={clsx(
        'radio-group',
        orientation === 'horizontal' && 'radio-group--horizontal',
        disabled && 'radio-group--disabled',
        className,
      )}
      id={groupId}
      role="radiogroup"
    >
      {label && (
        <div className="radio-group__label" id={labelId}>
          {label}
          {required && (
            <span aria-hidden="true" className="radio-group__required">
              *
            </span>
          )}
        </div>
      )}

      <RadioGroupContext.Provider
        value={{
          disabled,
          invalid,
          name: groupName,
          onValueChange: setSelectedValue,
          required,
          size,
          value: selectedValue,
        }}
      >
        <div className={clsx('radio-group__items', `radio-group__items--${orientation}`)}>
          {children}
        </div>
      </RadioGroupContext.Provider>

      {error ? (
        <p className="radio-group__message radio-group__message--error" id={errorId}>
          {error}
        </p>
      ) : (
        hint && (
          <p className="radio-group__message" id={hintId}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}
