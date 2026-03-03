type AnyFn = (...args: unknown[]) => void;

const isEventHandler = (key: string, value: unknown) => {
  return key.startsWith('on') && typeof value === 'function';
};

const mergeHandlers = (base: AnyFn, override: AnyFn): AnyFn => {
  return (...args) => {
    base(...args);
    override(...args);
  };
};

export const mergeProps = <T extends object>(...propsList: Array<T | null | undefined>): T => {
  const result: Record<string, unknown> = {};

  for (const props of propsList) {
    if (!props) {
      continue;
    }

    for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
      if (value === undefined) {
        continue;
      }

      if (key === 'className') {
        const current = typeof result.className === 'string' ? result.className : '';
        result.className = [current, value].filter(Boolean).join(' ');
        continue;
      }

      if (key === 'style' && typeof value === 'object' && value !== null) {
        const current =
          typeof result.style === 'object' && result.style !== null
            ? (result.style as Record<string, unknown>)
            : {};

        result.style = { ...current, ...value };
        continue;
      }

      if (isEventHandler(key, value) && typeof result[key] === 'function') {
        result[key] = mergeHandlers(result[key] as AnyFn, value as AnyFn);
        continue;
      }

      result[key] = value;
    }
  }

  return result as T;
};
