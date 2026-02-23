import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getSortedTshirtSize,
} from '../../utils';

import { getTokens, TokenSection } from './tokenUtils';

import type { Meta, StoryObj } from '@storybook/react-vite';

const lineHeightCSSVars = getAllCSSVariablesWithPrefix('--line-height');
const lineHeightScaleFromCSS = getCSSVarTshirtScale(lineHeightCSSVars);
const sortedLineHeightScale = getSortedTshirtSize(lineHeightScaleFromCSS);

const lineHeightTokenNames = sortedLineHeightScale.map((size) => `--line-height-${size}`);

const meta = {
  title: 'Tokens/Line Height',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(lineHeightTokenNames);

    return (
      <div className="token-page">
        <TokenSection
          title="Line Height Scale"
          description="Live values from line-height tokens."
          tokens={tokens}
          renderPreview={(token) => (
            <span
              style={{
                color: 'var(--color-foreground)',
                fontFamily: 'var(--font-family-sans)',
                fontSize: 'var(--font-size-xs)',
                lineHeight: `var(${token.name})`,
                maxWidth: '14ch',
              }}
            >
              Design systems scale with clear rhythm.
            </span>
          )}
        />
      </div>
    );
  },
};
