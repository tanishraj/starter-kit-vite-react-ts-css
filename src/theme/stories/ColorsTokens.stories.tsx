import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  baseColorTokenNames,
  buildPrimitivePaletteGroups,
  ColorPaletteSection,
  semanticColorGroups,
} from './colorPalette';
import { getTokens, getTokensByPrefix, TokenSection } from './tokenUtils';
import './tokens.css';

const meta = {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseTokens: Story = {
  render: () => {
    const basePaletteGroup = [
      {
        id: 'base',
        label: 'Base',
        tokens: getTokens(baseColorTokenNames).filter(
          (token) => token.value !== '',
        ),
      },
    ] as const;

    const baseAndTokenGroups = [
      ...basePaletteGroup,
      ...buildPrimitivePaletteGroups(),
    ];

    return (
      <div className="token-page">
        <ColorPaletteSection
          title="Color Tokens"
          description="Base colors and primitive token families."
          groups={baseAndTokenGroups}
        />
      </div>
    );
  },
};

export const SemanticColors: Story = {
  render: () => {
    const semanticByGroup = semanticColorGroups.map((group) => ({
      id: group.id,
      label: group.label,
      tokens: getTokens(group.tokenNames).filter((token) => token.value !== ''),
    }));

    return (
      <div className="token-page">
        <ColorPaletteSection
          title="Semantic"
          description="Theme-mapped tokens grouped by usage."
          groups={semanticByGroup}
        />
      </div>
    );
  },
};

export const GradientColors: Story = {
  render: () => {
    const gradientTokens = getTokensByPrefix(['--gradient-']);
    const backgroundImageTokens = getTokensByPrefix(['--background-image-']);

    return (
      <div className="token-page">
        <TokenSection
          title="Gradient Tokens"
          description="Live values from gradient tokens."
          tokens={gradientTokens}
          renderPreview={(token) => (
            <div
              style={{
                backgroundImage: `var(${token.name})`,
                borderRadius: 'var(--radius-xs)',
                height: '44px',
                width: '100%',
              }}
            />
          )}
        />

        <TokenSection
          title="Background Image Aliases"
          description="Aliases intended for component surfaces and hero areas."
          tokens={backgroundImageTokens}
          renderPreview={(token) => (
            <div
              style={{
                backgroundImage: `var(${token.name})`,
                borderRadius: 'var(--radius-xs)',
                height: '44px',
                width: '100%',
              }}
            />
          )}
        />
      </div>
    );
  },
};
