import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getSortedTshirtSize,
} from '../../utils';

import { getTokens, TokenSection } from './tokenUtils';

import type { Meta, StoryObj } from '@storybook/react-vite';

const spaceCSSVars = getAllCSSVariablesWithPrefix('--space');
const spaceScaleFromCSS = getCSSVarTshirtScale(spaceCSSVars);
const sortedSpaceScale = getSortedTshirtSize(spaceScaleFromCSS);

const spacingTokenNames = sortedSpaceScale.map((size) => `--space-${size}`);

const meta = {
  title: 'Tokens/Spacing',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(spacingTokenNames);

    return (
      <div className="token-page">
        <TokenSection
          title="Spacing Scale"
          description="Live values from spacing tokens."
          tokens={tokens}
          renderPreview={(token) => (
            <div
              style={{
                background: 'var(--color-primary-500)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-xs)',
                textAlign: 'center',
                width: `var(${token.name})`,
                height: '20px',
              }}
            ></div>
          )}
        />
      </div>
    );
  },
};
