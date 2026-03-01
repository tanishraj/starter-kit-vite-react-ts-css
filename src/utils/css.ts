import baseColorsCss from '../theme/tokens/colors.css?raw';

// VARNAME TYPE
export type VarName = `--${string}`;
export type ColorVar = `--color-${string}`;
export type ColorScaleVar = `--color-${string}-${number}`;
export type ColorGroup = Record<string, Record<string, string>>;
export type Fallback = string;
export type SortOrder = 'asc' | 'desc';
export type ThemeMode = 'light' | 'dark';
export type SemanticColorToken = {
  groupId: string;
  groupLabel: string;
  name: ColorVar;
  value: string;
};
export type SemanticColorGroup = {
  id: string;
  label: string;
  tokenNames: ColorVar[];
  tokens: SemanticColorToken[];
};
export type TokenEntry = {
  name: string;
  value: string;
};
export type TshirtScale =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full'
  | `${number}xs`
  | `${number}xl`;

const COLOR_SCALE_STEPS = new Set([
  '25',
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
]);
const MIN_SCALE_STEPS_FOR_PRIMITIVE_FAMILY = 8;
const BASE_COLOR_TOKEN_REGEX = /^--color-base-[a-z0-9-]+$/i;
const NUMERIC_COLOR_TOKEN_REGEX = /^--color-([a-z0-9-]+)-(\d+)$/i;
const BASE_COLOR_ALIAS_REGEX = /^--color-([a-z0-9-]+)$/i;
const SINGLE_WORD_COLOR_ALIAS_REGEX = /^--color-[a-z0-9]+$/i;
const PRIMITIVE_BASE_COLOR_ALIASES = new Set<ColorVar>(
  Array.from(baseColorsCss.matchAll(/(--color-[a-z0-9-]+)\s*:/gi))
    .map((match) => match[1] as ColorVar)
    .filter((token) => SINGLE_WORD_COLOR_ALIAS_REGEX.test(token)),
);
const BASE_COLOR_ALIAS_PRIORITY = new Map(
  ['black', 'white', 'transparent'].map((token, index) => [token, index]),
);

const SEMANTIC_GROUPS = [
  {
    id: 'text',
    label: 'Text',
    matcher: /^--color-text-/,
  },
  {
    id: 'border',
    label: 'Border',
    matcher: /^--color-border-/,
  },
  {
    id: 'foreground',
    label: 'Foreground',
    matcher: /^--color-fg-/,
  },
  {
    id: 'background',
    label: 'Background',
    matcher: /^--color-bg-/,
  },
] as const;

const SEMANTIC_GROUP_ORDER = new Map<string, number>(
  SEMANTIC_GROUPS.map((group, index) => [group.id, index]),
);

const nameSortOptions = {
  numeric: true,
  sensitivity: 'base',
} as const;

// CHECK IF WINDOW AND DOCUMENT EXIST
const canReadComputedStyles = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

const sortTokenNames = (names: readonly string[]) => {
  return [...names].sort((a, b) => a.localeCompare(b, undefined, nameSortOptions));
};

const getScaleParts = (tokenName: ColorVar) => {
  const match = tokenName.match(NUMERIC_COLOR_TOKEN_REGEX);
  if (!match) {
    return null;
  }

  const [, family, scale] = match;
  if (!COLOR_SCALE_STEPS.has(scale)) {
    return null;
  }

  return { family, scale };
};

const getPrimitiveColorFamilies = (tokens: readonly ColorVar[]) => {
  const families = new Map<string, Set<string>>();

  for (const token of tokens) {
    const parts = getScaleParts(token);
    if (!parts) {
      continue;
    }

    const familyScales = families.get(parts.family) ?? new Set<string>();
    familyScales.add(parts.scale);
    families.set(parts.family, familyScales);
  }

  return new Set(
    [...families.entries()]
      .filter(([, scales]) => scales.size >= MIN_SCALE_STEPS_FOR_PRIMITIVE_FAMILY)
      .map(([family]) => family),
  );
};

const resolveSemanticGroup = (tokenName: ColorVar) => {
  return (
    SEMANTIC_GROUPS.find((group) => group.matcher.test(tokenName)) ?? {
      id: 'other',
      label: 'Other',
    }
  );
};

const withThemeMode = <T>(mode: ThemeMode, run: () => T): T => {
  if (!canReadComputedStyles()) {
    return run();
  }

  const root = document.documentElement;
  const previousTheme = root.getAttribute('data-theme');

  root.setAttribute('data-theme', mode);

  try {
    return run();
  } finally {
    if (previousTheme === null) {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', previousTheme);
    }
  }
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
  const value = window.getComputedStyle(targetElement).getPropertyValue(name).trim();

  return value || fallback;
};

export const getTokens = (names: readonly VarName[], element?: Element): TokenEntry[] => {
  return names.map((name) => ({
    name,
    value: getCSSVariable(name, '', element),
  }));
};

// CHECK IF CSS VARIABLE EXISTS
export const hasCSSVariable = (name: VarName, element?: Element): boolean => {
  if (!canReadComputedStyles()) {
    return false;
  }

  const targetElement = element ?? document.documentElement;
  const value = window.getComputedStyle(targetElement).getPropertyValue(name).trim();

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

  return sortTokenNames(Array.from(styles).filter((name) => name.startsWith(prefix))) as VarName[];
};

export const getTokensByPrefix = (
  prefixes: readonly VarName[],
  element?: Element,
): TokenEntry[] => {
  if (!canReadComputedStyles()) {
    return [];
  }

  const targetElement = element ?? document.documentElement;
  const styles = window.getComputedStyle(targetElement);
  const names = new Set<string>();

  for (let index = 0; index < styles.length; index += 1) {
    const propertyName = styles.item(index);

    if (prefixes.some((prefix) => propertyName.startsWith(prefix))) {
      names.add(propertyName);
    }
  }

  return sortTokenNames([...names]).map((name) => ({
    name,
    value: styles.getPropertyValue(name).trim(),
  }));
};

// SORT A LIST BY TSHIRT SIZE
export const getSortedTshirtSize = (list: TshirtScale[], order: SortOrder = 'asc'): string[] => {
  const BASE_SIZE_RANK: Record<string, number> = {
    none: 0,
    xs: 100,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
  };

  const getRank = (size: TshirtScale) => {
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
type TshirtScaleResult<T> = T extends VarName[] ? TshirtScale[] : TshirtScale;

export const getCSSVarTshirtScale = <T extends ITshirtScale>(input: T): TshirtScaleResult<T> => {
  const extract = (cssVar: VarName) => {
    const normalized = cssVar.toLowerCase().trim();
    const lastPart = normalized.split('-').at(-1) ?? '';

    const match = lastPart.match(/^(\d+)?(xs|sm|md|lg|xl|none|full)$/);

    return match ? lastPart : '';
  };

  if (Array.isArray(input)) {
    return input.map(extract).filter(Boolean) as TshirtScaleResult<T>;
  }

  return extract(input) as TshirtScaleResult<T>;
};

// GET COLOR TOKEN SCALES
export const getGroupedColorTokenScales = (colorScales: string[]): ColorGroup => {
  const colorGroup: ColorGroup = {};

  for (const color of colorScales) {
    const parts = getScaleParts(color as ColorVar);
    if (parts) {
      if (!colorGroup[parts.family]) {
        colorGroup[parts.family] = {};
      }

      colorGroup[parts.family][parts.scale] = color;
      continue;
    }

    const baseAliasMatch = color.match(BASE_COLOR_ALIAS_REGEX);
    if (!baseAliasMatch) {
      continue;
    }

    const [, alias] = baseAliasMatch;
    if (!alias || COLOR_SCALE_STEPS.has(alias)) {
      continue;
    }

    if (!colorGroup.base) {
      colorGroup.base = {};
    }

    colorGroup.base[alias] = color;
  }

  if (colorGroup.base) {
    colorGroup.base = Object.fromEntries(
      Object.entries(colorGroup.base).sort(([a], [b]) => {
        const priorityA = BASE_COLOR_ALIAS_PRIORITY.get(a) ?? Number.MAX_SAFE_INTEGER;
        const priorityB = BASE_COLOR_ALIAS_PRIORITY.get(b) ?? Number.MAX_SAFE_INTEGER;

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        return a.localeCompare(b, undefined, nameSortOptions);
      }),
    );
  }

  return colorGroup;
};

// GET ALL SEMANTIC COLORS OR COLOR TOKENS
export const SEMANTIC_TOKENS = [
  'background',
  'surface',
  'foreground',
  'muted',
  'primary',
  'secondary',
  'accent',
  'border',
  'input',
  'ring',
  'link',
  'disabled',
  'success',
  'warning',
  'danger',
  'info',
];

export const isPrimitiveColorToken = (
  tokenName: ColorVar,
  primitiveFamilies?: ReadonlySet<string>,
): boolean => {
  if (PRIMITIVE_BASE_COLOR_ALIASES.has(tokenName)) {
    return true;
  }

  if (BASE_COLOR_TOKEN_REGEX.test(tokenName)) {
    return true;
  }

  const parts = getScaleParts(tokenName);
  if (!parts) {
    return false;
  }

  if (!primitiveFamilies) {
    return false;
  }

  return primitiveFamilies.has(parts.family);
};

export const getColorVariables = (element?: Element): ColorVar[] => {
  return getAllCSSVariablesWithPrefix('--color-', element) as ColorVar[];
};

export const splitSemanticColors = (colorsList: ColorVar[]) => {
  const primitiveFamilies = getPrimitiveColorFamilies(colorsList);
  const semantic: ColorVar[] = [];
  const base: ColorVar[] = [];

  for (const color of colorsList) {
    if (isPrimitiveColorToken(color, primitiveFamilies)) {
      base.push(color);
      continue;
    }

    semantic.push(color);
  }

  return {
    semantic: sortTokenNames(semantic) as ColorVar[],
    base: sortTokenNames(base) as ColorVar[],
  };
};

export const getSemanticColorTokenNames = (element?: Element): ColorVar[] => {
  const allColors = getColorVariables(element);
  return splitSemanticColors(allColors).semantic;
};

export const getSemanticColorTokens = (
  mode?: ThemeMode,
  element?: Element,
): SemanticColorToken[] => {
  const readTokens = () => {
    const semanticTokens = getSemanticColorTokenNames(element);

    return semanticTokens.map((name) => {
      const group = resolveSemanticGroup(name);
      return {
        name,
        value: getCSSVariable(name, '', element),
        groupId: group.id,
        groupLabel: group.label,
      };
    });
  };

  if (mode) {
    return withThemeMode(mode, readTokens);
  }

  return readTokens();
};

export const getSemanticColorGroups = (
  mode?: ThemeMode,
  element?: Element,
): SemanticColorGroup[] => {
  const grouped = new Map<string, SemanticColorGroup>();

  for (const token of getSemanticColorTokens(mode, element)) {
    const existingGroup = grouped.get(token.groupId) ?? {
      id: token.groupId,
      label: token.groupLabel,
      tokenNames: [],
      tokens: [],
    };

    existingGroup.tokenNames.push(token.name);
    existingGroup.tokens.push(token);
    grouped.set(existingGroup.id, existingGroup);
  }

  return [...grouped.values()]
    .map((group) => ({
      ...group,
      tokenNames: sortTokenNames(group.tokenNames) as ColorVar[],
      tokens: [...group.tokens].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, nameSortOptions),
      ),
    }))
    .sort((a, b) => {
      const groupOrderA = SEMANTIC_GROUP_ORDER.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const groupOrderB = SEMANTIC_GROUP_ORDER.get(b.id) ?? Number.MAX_SAFE_INTEGER;
      return groupOrderA - groupOrderB;
    });
};
