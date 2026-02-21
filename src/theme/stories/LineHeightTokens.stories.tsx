import type { Meta, StoryObj } from '@storybook/react-vite';
import { getTokens, TokenSection } from './tokenUtils';
import './tokens.css';

const lineHeightScale = [
  '4xs',
  '3xs',
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
] as const;

const lineHeightTokenNames = lineHeightScale.map(
  (size) => `--line-height-${size}`,
);

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
        <TokenSection
          title="Line Height Scale"
          description="Live values from line-height tokens."
          tokens={tokens}
          renderPreview={(token) => (
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
          )}
        />
      </div>
    );
  },
};
