import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getSortedTshirtSize,
} from '../../utils';

import { getTokens, TokenSection } from './tokenUtils';

import type { Meta, StoryObj } from '@storybook/react-vite';

const breakpointsCSSVars = getAllCSSVariablesWithPrefix('--breakpoint');
const breakpointScaleFromCSS = getCSSVarTshirtScale(breakpointsCSSVars);
const sortedBreakpointsScale = getSortedTshirtSize(breakpointScaleFromCSS);

const breakpointTokenNames = sortedBreakpointsScale.map((size) => `--breakpoint-${size}`);

const meta = {
  title: 'Tokens/Breakpoints',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function getBreakpointRatios(values: readonly string[]) {
  const numericValues = values.map((value) => Number.parseFloat(value));
  const maxValue = Math.max(...numericValues, 1);

  return numericValues.map((value) => value / maxValue);
}

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(breakpointTokenNames);
    const ratios = getBreakpointRatios(tokens.map((token) => token.value));

    return (
      <div className="token-page">
        <TokenSection
          title="Breakpoint Scale"
          description="Live values from breakpoint tokens. Preview bars are proportional to the largest breakpoint."
          tokens={tokens}
          renderPreview={(token) => {
            const ratio = ratios[tokens.findIndex((item) => item.name === token.name)];

            return (
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    background: 'var(--color-primary-500)',
                    borderRadius: 'var(--radius-2xs)',
                    height: 'var(--space-md)',
                    width: `${Math.max(ratio * 100, 4)}%`,
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    );
  },
};
