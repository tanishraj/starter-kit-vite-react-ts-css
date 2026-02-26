import { useMemo, useState } from 'react';

import { ICON_NAMES, Icon } from './Icon';

import type { Meta, StoryObj } from '@storybook/react-vite';

const ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const ICON_COLORS = [
  'current',
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'brand',
  'success',
  'warning',
  'danger',
] as const;

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    name: 'alarm-clock',
    size: 'md',
    color: 'current',
    title: 'Alarm Clock',
    decorative: false,
  },
  argTypes: {
    name: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ICON_SIZES,
    },
    color: {
      control: 'select',
      options: ICON_COLORS,
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function AllIconsGrid(props: Story['args']) {
  const [query, setQuery] = useState('');
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const filteredNames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return ICON_NAMES;
    }
    return ICON_NAMES.filter((name) => name.includes(normalizedQuery));
  }, [query]);

  async function copyIconName(name: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(name);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = name;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.append(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedName(name);
      window.setTimeout(() => {
        setCopiedName((current) => (current === name ? null : current));
      }, 1200);
    } catch {
      setCopiedName(null);
    }
  }

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'grid',
        gap: 'var(--space-md)',
        minHeight: '100vh',
        padding: 'var(--space-xl)',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 'var(--space-sm)',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <strong style={{ color: 'var(--color-text-primary)' }}>
          {filteredNames.length} / {ICON_NAMES.length} icons
        </strong>
        <input
          aria-label="Filter icon names"
          onChange={(event) => setQuery(event.target.value.toLowerCase())}
          placeholder="Filter by name (e.g. alarm, arrow, user)"
          style={{
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-text-primary)',
            padding: 'var(--space-2xs) var(--space-xs)',
            width: 'min(360px, 100%)',
          }}
          value={query}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gap: 'var(--space-md)',
          gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
          width: '100%',
        }}
      >
        {filteredNames.map((name) => (
          <button
            aria-label={`Copy icon name ${name}`}
            key={name}
            onBlur={() => setHoveredName((current) => (current === name ? null : current))}
            onClick={() => {
              void copyIconName(name);
            }}
            onFocus={() => setHoveredName(name)}
            onMouseEnter={() => setHoveredName(name)}
            onMouseLeave={() => setHoveredName((current) => (current === name ? null : current))}
            type="button"
            title={`Click to copy "${name}"`}
            style={{
              alignItems: 'center',
              background: 'transparent',
              border: '1px solid var(--color-border-primary)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'grid',
              height: '72px',
              justifyItems: 'center',
              padding: 'var(--space-xs)',
              position: 'relative',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                opacity: hoveredName === name ? 1 : 0,
                pointerEvents: 'none',
                position: 'absolute',
                right: 'var(--space-2xs)',
                top: 'var(--space-2xs)',
                transition: 'opacity 120ms ease',
              }}
            >
              <Icon color="quaternary" decorative={true} name="copy" size="xs" title={undefined} />
            </span>
            <Icon {...props} decorative={true} name={name} title={undefined} />
            {(hoveredName === name || copiedName === name) && (
              <span
                style={{
                  background: 'var(--color-bg-primary-solid)',
                  borderRadius: 'var(--radius-xs)',
                  bottom: 'calc(100% + var(--space-2xs))',
                  color: 'var(--color-text-white)',
                  fontFamily: 'monospace',
                  fontSize: 'var(--font-size-xs)',
                  left: '50%',
                  maxWidth: '220px',
                  overflow: 'hidden',
                  padding: 'var(--space-2xs)',
                  position: 'absolute',
                  textOverflow: 'ellipsis',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  zIndex: '1',
                }}
              >
                {copiedName === name ? `Copied: ${name}` : name}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export const AllIcons: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => <AllIconsGrid {...args} />,
};

export const Sizes: Story = {
  args: {
    name: 'alarm-clock',
    color: 'brand',
    decorative: false,
    title: 'Alarm Clock',
  },
  render: (args) => (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: 'var(--space-sm)',
      }}
    >
      <Icon {...args} size="xs" />
      <Icon {...args} size="sm" />
      <Icon {...args} size="md" />
      <Icon {...args} size="lg" />
      <Icon {...args} size="xl" />
      <Icon {...args} size={36} />
    </div>
  ),
};
