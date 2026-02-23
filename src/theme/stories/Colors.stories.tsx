import {
  type ColorVar,
  getAllCSSVariablesWithPrefix,
  getCSSVariable,
  getGroupedColorTokenScales,
  splitSemanticColors,
  type VarName,
} from '../../utils';

import { ColorPaletteSection, type PaletteGroup, toFamilyLabel } from './colorPalette';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseColors: Story = {
  render: () => {
    const allColors = getAllCSSVariablesWithPrefix('--color');
    const { base } = splitSemanticColors(allColors as ColorVar[]);
    const groupedColors = getGroupedColorTokenScales(base);
    const baseColorGroups: PaletteGroup[] = Object.entries(groupedColors)
      .sort(([a], [b]) => {
        if (a === 'base') return -1;
        if (b === 'base') return 1;
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      })
      .map(([family, scaleMap]) => ({
        id: family,
        label: toFamilyLabel(family),
        useScaleLabel: family !== 'base',
        tokens: Object.values(scaleMap).map((tokenName) => ({
          name: tokenName,
          value: getCSSVariable(tokenName as VarName),
        })),
      }));

    return (
      <div className="token-page">
        <ColorPaletteSection
          title="Color Tokens"
          description="Base colors and primitive token families."
          groups={baseColorGroups}
          getLabel={(tokenName, useScaleLabel) => {
            if (!useScaleLabel) {
              return tokenName.replace('--color-', '');
            }

            return tokenName.split('-').at(-1) ?? tokenName.replace('--color-', '');
          }}
        />
      </div>
    );
  },
};
