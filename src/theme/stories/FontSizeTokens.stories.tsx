import { TokenTable } from '../../components/TokenTable';
import {
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getTokens,
  getSortedTshirtSize,
} from '../../utils';

import { createTokenTableColumns } from './tokenTableColumns';

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
        <TokenTable
          columns={createTokenTableColumns({
            renderPreview: (token) => (
              <span
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: `var(${token.name})`,
                  lineHeight: '1.2',
                }}
              >
                Ag
              </span>
            ),
          })}
          description="Live values from font-size tokens."
          emptyMessage="No matching tokens found."
          getRowKey={(token) => token.name}
          rows={tokens}
          title="Font Size Scale"
        />
      </div>
    );
  },
};
