import { TokenTable } from '../../components/TokenTable';
import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getTokens,
  getSortedTshirtSize,
} from '../../utils';

import { createTokenTableColumns } from './tokenTableColumns';

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
        <TokenTable
          columns={createTokenTableColumns({
            renderPreview: (token) => (
              <div
                style={{
                  background: 'var(--color-bg-brand-solid)',
                  border: '1px solid var(--color-border-brand)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-text-primary_on-brand)',
                  fontSize: 'var(--font-size-xs)',
                  textAlign: 'center',
                  width: `var(${token.name})`,
                  height: '20px',
                }}
              />
            ),
          })}
          description="Live values from spacing tokens."
          emptyMessage="No matching tokens found."
          getRowKey={(token) => token.name}
          rows={tokens}
          title="Spacing Scale"
        />
      </div>
    );
  },
};
