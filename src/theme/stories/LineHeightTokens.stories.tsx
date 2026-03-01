import { TokenTable } from '../../components/TokenTable';
import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getTokens,
  getSortedTshirtSize,
} from '../../utils';

import { createTokenTableColumns } from './tokenTableColumns';

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
        <TokenTable
          columns={createTokenTableColumns({
            renderPreview: (token) => (
              <span
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'var(--font-size-xs)',
                  lineHeight: `var(${token.name})`,
                  maxWidth: '14ch',
                }}
              >
                Design systems scale with clear rhythm.
              </span>
            ),
          })}
          description="Live values from line-height tokens."
          emptyMessage="No matching tokens found."
          getRowKey={(token) => token.name}
          rows={tokens}
          title="Line Height Scale"
        />
      </div>
    );
  },
};
