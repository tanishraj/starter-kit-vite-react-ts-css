import type { Meta, StoryObj } from '@storybook/react-vite';
import { getTokens, TokenSection } from './tokenUtils';
import './tokens.css';

const fontSizeScale = [
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

const fontSizeTokenNames = fontSizeScale.map((size) => `--font-size-${size}`);

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
        <TokenSection
          title="Font Size Scale"
          description="Live values from font-size tokens."
          tokens={tokens}
          renderPreview={(token) => (
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
          )}
        />
      </div>
    );
  },
};
