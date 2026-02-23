import {
  type ColorVar,
  getAllCSSVariablesWithPrefix,
  getCSSVariable,
  getGroupedColorTokenScales,
  splitSemanticColors,
  type VarName,
} from '../../utils';

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
    console.log({ groupedColors });

    return (
      <div className="token-page">
        <section className="token-section">
          <h3>Color Tokens</h3>
          <p>Base colors and primitive token families.</p>
          <div className="color-palette-list">
            {Object.keys(groupedColors)
              .sort((a, b) => (a === 'base' ? -1 : b.length))
              .map((color) => {
                const formattedColor = color.split('-').join(' ').toUpperCase();
                return (
                  <article key={color} className="color-palette-row">
                    <h4>{formattedColor}</h4>
                    <div className="color-palette-grid">
                      {Object.keys(groupedColors[color]).map((scale) => {
                        return (
                          <div key={scale} className="color-palette-item">
                            <div
                              className="color-palette-swatch"
                              style={{
                                backgroundColor: `var(${groupedColors[color][scale]})`,
                              }}
                            ></div>
                            <div className="color-palette-label">
                              {scale} [{getCSSVariable(groupedColors[color][scale] as VarName)}]
                            </div>

                            <div className="token-value">{groupedColors[color][scale]}</div>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      </div>
    );
  },
};
