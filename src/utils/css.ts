// VARNAME TYPE
export type VarName = `--${string}`;
export type Fallback = string;
export type SortOrder = 'asc' | 'desc';

// CHECK IF WINDOW AND DOCUMENT EXIST
const canReadComputedStyles = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

// GET THE CSS VARIABLE VALUE
export const getCSSVariable = (
  name: VarName,
  fallback: Fallback = '',
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
export const hasCSSVariable = (name: VarName, element?: Element): boolean => {
  if (!canReadComputedStyles()) {
    return false;
  }

  const targetElement = element ?? document.documentElement;
  const value = getComputedStyle(targetElement).getPropertyValue(name).trim();

  return value.length > 0;
};

// GET ALL CSS VARIABLES
export const getAllCSSVariablesWithPrefix = <T extends VarName>(
  prefix: T,
  element?: Element,
): VarName[] => {
  if (!canReadComputedStyles()) {
    return [];
  }

  const targetElement = element ?? document.documentElement;
  const styles = window.getComputedStyle(targetElement);

  return Array.from(styles).filter((name) =>
    name.startsWith(prefix),
  ) as VarName[];
};

// SORT A LIST BY TSHIRT SIZE
export const getSortedTshirtSize = (
  list: string[],
  order: SortOrder = 'asc',
): string[] => {
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
export type ITshirtScale = VarName | VarName[];
type TshirtScaleResult<T> = T extends VarName[] ? string[] : string;

export const getCSSVarTshirtScale = <T extends VarName | VarName[]>(
  input: T,
): TshirtScaleResult<T> => {
  const extract = (cssVar: VarName) => {
    const normalized = cssVar.toLowerCase().trim();
    const lastPart = normalized.split('-').at(-1) ?? '';

    const match = lastPart.match(/^(\d+)?(xs|sm|md|lg|xl|none)$/);

    return match ? lastPart : '';
  };

  if (Array.isArray(input)) {
    return input.map(extract).filter(Boolean) as TshirtScaleResult<T>;
  }

  return extract(input) as TshirtScaleResult<T>;
};
