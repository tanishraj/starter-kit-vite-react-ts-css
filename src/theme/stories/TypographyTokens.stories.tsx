import { getAllCSSVariablesWithPrefix } from '../../utils';

import { getTokens, TokenSection } from './tokenUtils';

import type { Meta, StoryObj } from '@storybook/react-vite';

const typographyTokenNames = getAllCSSVariablesWithPrefix('--font-family');

const sampleByToken: Record<(typeof typographyTokenNames)[number], string> = {
  '--font-family-sans': 'Sphinx of black quartz, judge my vow.',
  '--font-family-mono': 'const answer = 42;',
};

const meta = {
  title: 'Tokens/Typography',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Families: Story = {
  render: () => {
    const tokens = getTokens(typographyTokenNames);

    return (
      <div className="token-page">
        <TokenSection
          title="Font Families"
          description="Live values from typography tokens."
          tokens={tokens}
          renderPreview={(token) => (
            <span
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: `var(${token.name})`,
                fontSize: 'var(--font-size-sm)',
                lineHeight: 'var(--line-height-md)',
              }}
            >
              {sampleByToken[token.name as keyof typeof sampleByToken]}
            </span>
          )}
        />
      </div>
    );
  },
};
