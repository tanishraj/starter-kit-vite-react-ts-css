import {
  type InputEvent,
  type Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type { InputProps } from './types';
import './Input.css';

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function callRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

export function Input({
  id,
  label,
  hint,
  error,
  variant = 'outline',
  size = 'md',
  tone = 'default',
  startAdornment,
  endAdornment,
  fullWidth = false,
  clearable = false,
  onClear,
  disabled,
  required,
  className,
  onInput,
  value,
  defaultValue,
  readOnly,
  ref,
  ...rest
}: InputProps) {
  const reactId = useId();
  const inputId = id ?? `input-${reactId.replaceAll(':', '')}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  const resolvedTone = error ? 'danger' : tone;
  const localRef = useRef<HTMLInputElement>(null);

  const [hasValue, setHasValue] = useState(() => {
    if (typeof value === 'string') {
      return value.length > 0;
    }

    if (typeof defaultValue === 'string') {
      return defaultValue.length > 0;
    }

    return false;
  });

  useEffect(() => {
    if (typeof value === 'string') {
      setHasValue(value.length > 0);
    }
  }, [value]);

  function handleInput(event: InputEvent<HTMLInputElement>) {
    setHasValue(event.currentTarget.value.length > 0);
    onInput?.(event);
  }

  function handleClear() {
    const input = localRef.current;

    if (!input) {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value',
    );

    descriptor?.set?.call(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.focus();
    setHasValue(false);
    onClear?.();
  }

  return (
    <div
      className={cx(
        'inp',
        `inp--${variant}`,
        `inp--${size}`,
        `inp--tone-${resolvedTone}`,
        fullWidth && 'inp--full-width',
        disabled && 'inp--disabled',
        className,
      )}
    >
      {label && (
        <label className="inp__label" htmlFor={inputId}>
          {label}
          {required && (
            <span aria-hidden="true" className="inp__required">
              *
            </span>
          )}
        </label>
      )}

      <div className="inp__control-wrap">
        {startAdornment && (
          <span
            aria-hidden="true"
            className="inp__adornment inp__adornment--start"
          >
            {startAdornment}
          </span>
        )}

        <input
          {...rest}
          ref={(node) => {
            localRef.current = node;
            callRef(ref, node);
          }}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error) || rest['aria-invalid'] === true}
          className="inp__control"
          defaultValue={defaultValue}
          disabled={disabled}
          id={inputId}
          onInput={handleInput}
          readOnly={readOnly}
          required={required}
          value={value}
        />

        {clearable && hasValue && !disabled && !readOnly && (
          <button
            aria-label="Clear input"
            className="inp__clear"
            onClick={handleClear}
            type="button"
          >
            ×
          </button>
        )}

        {endAdornment && (
          <span
            aria-hidden="true"
            className="inp__adornment inp__adornment--end"
          >
            {endAdornment}
          </span>
        )}
      </div>

      {error ? (
        <p className="inp__message inp__message--error" id={errorId}>
          {error}
        </p>
      ) : (
        hint && (
          <p className="inp__message" id={hintId}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}
