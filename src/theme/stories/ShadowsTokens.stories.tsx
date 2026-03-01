import { TokenTable } from '../../components/TokenTable';
import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getTokens,
  getSortedTshirtSize,
} from '../../utils';

import { createTokenTableColumns } from './tokenTableColumns';

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
        <TokenTable
          columns={createTokenTableColumns({
            renderPreview: (token) => (
              <div
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: `var(${token.name})`,
                  height: '150px',
                  width: '150px',
                }}
              />
            ),
          })}
          description="Live values from shadow tokens."
          emptyMessage="No matching tokens found."
          getRowKey={(token) => token.name}
          rows={tokens}
          title="Shadow Scale"
        />
      </div>
    );
  },
};
