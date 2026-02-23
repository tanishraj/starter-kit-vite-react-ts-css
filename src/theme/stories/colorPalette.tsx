import { getSemanticColorGroups as getSemanticColorGroupsFromCSS } from '../../utils';

export const baseColorTokenNames = [
  '--color-base-white',
  '--color-base-black',
  '--color-base-transparent',
] as const;

export type SemanticColorGroupDefinition = {
  id: string;
  label: string;
  tokenNames: string[];
};

export function getSemanticColorGroups(): SemanticColorGroupDefinition[] {
  return getSemanticColorGroupsFromCSS().map((group) => ({
    id: group.id,
    label: group.label,
    tokenNames: [...group.tokenNames],
  }));
}

export function buildSemanticPaletteGroups(): PaletteGroup[] {
  return getSemanticColorGroupsFromCSS().map((group) => ({
    id: group.id,
    label: group.label,
    tokens: group.tokens.filter((token) => token.value !== ''),
  }));
}

export type PaletteToken = {
  name: string;
  value: string;
};

export type PaletteGroup = {
  id: string;
  label: string;
  tokens: PaletteToken[];
  useScaleLabel?: boolean;
};

export function toFamilyLabel(family: string) {
  return family
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function getTokenDisplayName(name: string) {
  return name.replace('--color-', '');
}

function getTokenScale(name: string) {
  const scale = name.match(/-(25|50|100|200|300|400|500|600|700|800|900|950)$/);
  return scale?.[1] ?? '';
}

export function ColorPaletteSection({
  title,
  description,
  groups,
  swatchKind = 'color',
  getLabel,
}: {
  title: string;
  description: string;
  groups: readonly PaletteGroup[];
  swatchKind?: 'color' | 'gradient';
  getLabel?: (tokenName: string, useScaleLabel: boolean | undefined) => string;
}) {
  return (
    <section className="token-section">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="color-palette-list">
        {groups.map((group) => (
          <article className="color-palette-row" key={group.id}>
            <h4>{group.label}</h4>
            <div className="color-palette-grid">
              {group.tokens.map((token) => (
                <div className="color-palette-item" key={token.name}>
                  <div
                    className="color-palette-swatch"
                    style={
                      swatchKind === 'gradient'
                        ? { backgroundImage: `var(${token.name})` }
                        : { backgroundColor: `var(${token.name})` }
                    }
                  />
                  <span className="color-palette-label">
                    {getLabel
                      ? getLabel(token.name, group.useScaleLabel)
                      : group.useScaleLabel
                        ? getTokenScale(token.name)
                        : getTokenDisplayName(token.name)}
                  </span>
                  <code className="token-value">{token.value}</code>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

