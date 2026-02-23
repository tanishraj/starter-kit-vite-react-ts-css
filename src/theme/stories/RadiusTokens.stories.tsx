import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getSortedTshirtSize,
} from '../../utils';

import { getTokens, TokenSection } from './tokenUtils';

import type { Meta, StoryObj } from '@storybook/react-vite';

const radiusCSSVars = getAllCSSVariablesWithPrefix('--radius');
const radiusScaleFromCSS = getCSSVarTshirtScale(radiusCSSVars);
const sortedRadiusScale = getSortedTshirtSize(radiusScaleFromCSS);

const radiusTokenNames = sortedRadiusScale.map((size) => `--radius-${size}`);

const meta = {
  title: 'Tokens/Radius',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(radiusTokenNames);

    return (
      <div className="token-page">
        <TokenSection
          title="Radius Scale"
          description="Live values from border-radius tokens."
          tokens={tokens}
          renderPreview={(token) => (
            <div
              style={{
                background: 'var(--color-primary-500)',
                borderRadius: `var(${token.name})`,
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
