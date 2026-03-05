import clsx from 'clsx';
import { useId } from 'react';

import { useControllableState } from '../../hooks';

import { toSafeId } from './utils';

import type { TabsProps } from './types';
import './Tabs.styles.css';

export function Tabs({
  id,
  items,
  label,
  hint,
  error,
  variant = 'underline',
  color = 'primary',
  orientation = 'horizontal',
  size = 'md',
  fullWidth = false,
  disabled = false,
  destroyInactivePanel = true,
  value,
  defaultValue,
  onValueChange,
  className,
  ...rest
}: TabsProps) {
  const reactId = useId().replaceAll(':', '');
  const tabsId = id ?? `tabs-${reactId}`;
  const labelId = label ? `${tabsId}-label` : undefined;
  const hintId = hint ? `${tabsId}-hint` : undefined;
  const errorId = error ? `${tabsId}-error` : undefined;
  const describedBy = error ? errorId : hintId;
  const fallbackValue = items.find((item) => !item.disabled)?.value;

  const [selectedValue, setSelectedValue] = useControllableState<string>({
    prop: value,
    defaultProp: defaultValue ?? fallbackValue,
    onChange: onValueChange,
  });

  const resolvedValue = selectedValue ?? fallbackValue;
  const activeItem = items.find((item) => item.value === resolvedValue) ?? null;
  const groupName = `${tabsId}-group`;

  return (
    <div
      {...rest}
      className={clsx(
        'tabs',
        `tabs--${orientation}`,
        `tabs--variant-${variant}`,
        `tabs--tone-${color}`,
        `tabs--${size}`,
        fullWidth && 'tabs--full-width',
        disabled && 'tabs--disabled',
        Boolean(error) && 'tabs--invalid',
        className,
      )}
    >
      {label ? (
        <div className="tabs__label" id={labelId}>
          {label}
        </div>
      ) : null}

      <div className={clsx('tabs__layout', `tabs__layout--${orientation}`)}>
        <div
          aria-describedby={describedBy}
          aria-labelledby={labelId}
          className={clsx('tabs__list', `tabs__list--${orientation}`)}
          role="radiogroup"
        >
          {items.map((item) => {
            const tabId = `${tabsId}-tab-${toSafeId(item.value)}`;
            const panelId = `${tabsId}-panel-${toSafeId(item.value)}`;
            const checked = item.value === resolvedValue;
            const itemDisabled = disabled || item.disabled;

            return (
              <label
                className={clsx('tabs__item', itemDisabled && 'tabs__item--disabled')}
                data-selected={checked || undefined}
                htmlFor={tabId}
                key={item.value}
              >
                <input
                  aria-controls={panelId}
                  checked={checked}
                  className="tabs__input"
                  disabled={itemDisabled}
                  id={tabId}
                  name={groupName}
                  onChange={(event) => {
                    if (event.currentTarget.checked) {
                      setSelectedValue(item.value);
                    }
                  }}
                  type="radio"
                  value={item.value}
                />
                <span className="tabs__trigger">
                  <span className="tabs__trigger-label">{item.label}</span>
                  {item.description ? (
                    <span className="tabs__trigger-description">{item.description}</span>
                  ) : null}
                </span>
              </label>
            );
          })}
        </div>

        {destroyInactivePanel ? (
          activeItem ? (
            <div
              className="tabs__panel"
              id={`${tabsId}-panel-${toSafeId(activeItem.value)}`}
              role="tabpanel"
            >
              {activeItem.content}
            </div>
          ) : null
        ) : (
          <div className="tabs__panel-stack">
            {items.map((item) => {
              const isActive = item.value === resolvedValue;

              return (
                <div
                  aria-hidden={!isActive}
                  className={clsx('tabs__panel', !isActive && 'tabs__panel--hidden')}
                  id={`${tabsId}-panel-${toSafeId(item.value)}`}
                  key={item.value}
                  role="tabpanel"
                >
                  {item.content}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error ? (
        <p className="tabs__message tabs__message--error" id={errorId}>
          {error}
        </p>
      ) : (
        hint && (
          <p className="tabs__message" id={hintId}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}
