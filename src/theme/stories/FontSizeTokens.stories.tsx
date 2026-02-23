import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getSortedTshirtSize,
} from '../../utils';

import { getTokens, TokenSection } from './tokenUtils';

import type { Meta, StoryObj } from '@storybook/react-vite';

const fontSizeCSSVars = getAllCSSVariablesWithPrefix('--font-size');
const fontSizeScaleFromCSS = getCSSVarTshirtScale(fontSizeCSSVars);
const sortedFontSizeScale = getSortedTshirtSize(fontSizeScaleFromCSS);

const fontSizeTokenNames = sortedFontSizeScale.map((size) => `--font-size-${size}`);

const meta = {
  title: 'Tokens/Font Size',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(fontSizeTokenNames);

    return (
      <div className="token-page">
        <TokenSection
          title="Font Size Scale"
          description="Live values from font-size tokens."
          tokens={tokens}
          renderPreview={(token) => (
            <span
              style={{
                color: 'var(--color-foreground)',
                fontFamily: 'var(--font-family-sans)',
                fontSize: `var(${token.name})`,
                lineHeight: '1.2',
              }}
            >
              Ag
            </span>
          )}
        />
      </div>
    );
  },
};
