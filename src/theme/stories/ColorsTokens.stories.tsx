import { getSemanticColorGroups } from '../../utils';

import { ColorPaletteSection } from './colorPalette';
import { getTokensByPrefix } from './tokenUtils';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const SemanticColors: Story = {
  render: () => {
    const semanticByGroup = getSemanticColorGroups().map((group) => ({
      id: group.id,
      label: group.label,
      tokens: group.tokens.filter((token) => token.value !== ''),
    }));

    return (
      <div className="token-page">
        <ColorPaletteSection
          title="Semantic"
          description="Theme-mapped semantic tokens extracted from live CSS variables."
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
    const gradientGroups = [
      {
        id: 'gradients',
        label: 'Gradient Tokens',
        tokens: gradientTokens,
      },
      {
        id: 'background-image-aliases',
        label: 'Background Image Aliases',
        tokens: backgroundImageTokens,
      },
    ];

    return (
      <div className="token-page">
        <ColorPaletteSection
          title="Gradient"
          description="Live gradient tokens and background-image aliases."
          groups={gradientGroups}
          swatchKind="gradient"
          getLabel={(tokenName) => tokenName.replace(/^--(gradient|background-image)-/, '')}
        />
      </div>
    );
  },
};
