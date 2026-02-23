import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getSortedTshirtSize,
} from '../../utils';

import { getTokens, TokenSection } from './tokenUtils';

import type { Meta, StoryObj } from '@storybook/react-vite';

const shadowCSSVars = getAllCSSVariablesWithPrefix('--shadow');
const shadowScaleFromCSS = getCSSVarTshirtScale(shadowCSSVars);
const sortedShadowScale = getSortedTshirtSize(shadowScaleFromCSS);

const shadowTokenNames = sortedShadowScale.map((size) => `--shadow-${size}`);

const meta = {
  title: 'Tokens/Shadows',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(shadowTokenNames);

    return (
      <div className="token-page">
        <TokenSection
          title="Shadow Scale"
          description="Live values from shadow tokens."
          tokens={tokens}
          renderPreview={(token) => (
            <div
              style={{
                background: 'var(--color-surface-elevated)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: `var(${token.name})`,
                height: '150px',
                width: '150px',
              }}
            />
          )}
        />
      </div>
    );
  },
};
