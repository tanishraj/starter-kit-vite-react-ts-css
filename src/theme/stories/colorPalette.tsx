import { getTokens } from './tokenUtils';

export const colorScale = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export const colorFamilies = [
  'brick-ember',
  'amber-flame',
  'steel-blue',
  'deep-space-blue',
  'blue-spruce',
  'blackberry-cream',
  'deep-twilight',
  'navy',
  'navy-electric',
  'jasmine',
  'platinum',
  'royal-azure',
  'turquoise',
  'medium-jungle',
  'forest-green',
  'turf-green',
  'dark-emerald',
  'black-forest',
  'black',
  'magenta-bloom',
] as const;

export const baseColorTokenNames = [
  '--color-base-white',
  '--color-base-black',
  '--color-base-transparent',
] as const;

export const semanticColorGroups = [
  {
    id: 'surface',
    label: 'Surface',
    tokenNames: [
      '--color-background',
      '--color-surface',
      '--color-surface-muted',
      '--color-surface-elevated',
      '--color-disabled',
    ],
  },
  {
    id: 'text',
    label: 'Text',
    tokenNames: [
      '--color-foreground',
      '--color-foreground-muted',
      '--color-foreground-subtle',
      '--color-foreground-inverse',
      '--color-link',
      '--color-link-hover',
      '--color-disabled-foreground',
    ],
  },
  {
    id: 'border',
    label: 'Border',
    tokenNames: ['--color-border-muted', '--color-border', '--color-border-strong', '--color-ring'],
  },
  {
    id: 'primary',
    label: 'Primary',
    tokenNames: [
      '--color-primary-soft',
      '--color-primary-subtle',
      '--color-primary',
      '--color-primary-hover',
      '--color-primary-strong',
      '--color-primary-foreground',
    ],
  },
  {
    id: 'accent',
    label: 'Accent',
    tokenNames: [
      '--color-accent-soft',
      '--color-accent-subtle',
      '--color-accent',
      '--color-accent-hover',
      '--color-accent-strong',
      '--color-accent-foreground',
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    tokenNames: [
      '--color-success',
      '--color-warning',
      '--color-danger',
      '--color-info',
      '--color-success-foreground',
      '--color-warning-foreground',
      '--color-danger-foreground',
      '--color-info-foreground',
      '--color-success-soft',
      '--color-warning-soft',
      '--color-danger-soft',
      '--color-info-soft',
    ],
  },
] as const;

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

export function buildPrimitivePaletteGroups(): PaletteGroup[] {
  return colorFamilies.map((family) => {
    const familyTokenNames = colorScale.map((scale) => `--color-${family}-${scale}`);

    return {
      id: family,
      label: toFamilyLabel(family),
      tokens: getTokens(familyTokenNames),
      useScaleLabel: true,
    };
  });
}
