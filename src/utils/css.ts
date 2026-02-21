// CHECK IF WINDOW AND DOCUMENT EXIST
const canReadComputedStyles = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

// GET THE CSS VARIABLE VALUE
export const getCSSVariable = (
  name: `--${string}`,
  fallback: string = '',
  element?: Element,
): string => {
  if (!canReadComputedStyles()) {
    return fallback;
  }

  const targetElement = element ?? document.documentElement;
  const value = window
    .getComputedStyle(targetElement)
    .getPropertyValue(name)
    .trim();

  return value || fallback;
};

// CHECK IF CSS VARIABLE EXISTS
export const hasCSSVariable = (name: `--${string}`, element?: Element) => {
  if (!canReadComputedStyles()) {
    return false;
  }

  const targetElement = element ?? document.documentElement;
  const value = getComputedStyle(targetElement).getPropertyValue(name).trim();

  return value.length > 0;
};

// GET ALL CSS VARIABLES
export const getAllCSSVariablesWithPrefix = (
  prefix: `--${string}`,
  element?: Element,
) => {
  if (!canReadComputedStyles()) {
    return [];
  }

  const targetElement = element ?? document.documentElement;
  const styles = window.getComputedStyle(targetElement);

  return Array.from(styles).filter((name) => name.startsWith(prefix));
};

// SORT A LIST BY TSHIRT SIZE
export const getSortedTshirtSize = (
  list: string[],
  order: 'asc' | 'desc' = 'asc',
) => {
  const BASE_SIZE_RANK: Record<string, number> = {
    none: 0,
    xs: 100,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
  };

  const getRank = (size: string) => {
    const normalized = String(size).toLowerCase().trim();

    if (normalized === 'none') return BASE_SIZE_RANK.none;

    const match = normalized.match(/^(\d+)?(xs|sm|md|lg|xl)$/);
    if (!match) return Number.MAX_SAFE_INTEGER;

    const numStr = match[1];
    const base = match[2];
    const n = numStr ? Number(numStr) : 1;

    if (base === 'xs') return BASE_SIZE_RANK.xs - n;
    if (base === 'xl') return BASE_SIZE_RANK.xl + n;

    return BASE_SIZE_RANK[base];
  };

  const sorted = [...list].sort((a, b) => getRank(a) - getRank(b));
  return order === 'desc' ? [...sorted].reverse() : sorted;
};

// GET TSHIRT SCALE LIST
type VarName = `--${string}`;
type ITshirtScaleList = VarName | VarName[];
export const getCSSVarTshirtScale = (input: ITshirtScaleList) => {
  const extract = (cssVar: VarName) => {
    const normalized = cssVar.toLowerCase().trim();
    const lastPart = normalized.split('-').at(-1) ?? '';

    const match = lastPart.match(/^(\d+)?(xs|sm|md|lg|xl|none)$/);

    return match ? lastPart : '';
  };

  if (Array.isArray(input)) {
    return input.map(extract).filter(Boolean);
  }

  return extract(input);
};
