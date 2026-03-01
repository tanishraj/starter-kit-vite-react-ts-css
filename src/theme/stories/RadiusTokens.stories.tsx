import { TokenTable } from '../../components/TokenTable';
import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getTokens,
  getSortedTshirtSize,
} from '../../utils';

import { createTokenTableColumns } from './tokenTableColumns';

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
        <TokenTable
          columns={createTokenTableColumns({
            renderPreview: (token) => (
              <div
                style={{
                  background: 'var(--color-bg-brand-solid)',
                  border: '1px solid var(--color-border-primary)',
                  borderRadius: `var(${token.name})`,
                  height: '150px',
                  width: '150px',
                }}
              />
            ),
          })}
          description="Live values from border-radius tokens."
          emptyMessage="No matching tokens found."
          getRowKey={(token) => token.name}
          rows={tokens}
          title="Radius Scale"
        />
      </div>
    );
  },
};
