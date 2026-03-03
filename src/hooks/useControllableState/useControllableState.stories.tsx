import { useState, type ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { useControllableState } from './useControllableState';

type PanelProps = {
  title: string;
  description?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (next: boolean) => void;
  children: ReactNode;
};

function cardStyle() {
  return {
    background: 'var(--color-bg-primary_alt)',
    border: '1px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-md)',
    display: 'grid',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
  } as const;
}

function mutedTextStyle() {
  return {
    color: 'var(--color-text-tertiary)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-md)',
    margin: 0,
  } as const;
}

function codeStyle() {
  return {
    background: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-family-mono)',
    fontSize: 'var(--font-size-xs)',
    lineHeight: 'var(--line-height-md)',
    margin: 0,
    overflowX: 'auto',
    padding: 'var(--space-sm)',
    whiteSpace: 'pre-wrap',
  } as const;
}

function buttonStyle(primary = false) {
  return {
    background: primary ? 'var(--color-bg-brand-solid)' : 'var(--color-bg-primary_alt)',
    border: `1px solid ${
      primary ? 'var(--color-border-brand)' : 'var(--color-border-primary)'
    }`,
    borderRadius: 'var(--radius-sm)',
    color: primary ? 'var(--color-text-primary_on-brand)' : 'var(--color-text-primary)',
    cursor: 'pointer',
    font: 'inherit',
    padding: '0.625rem 0.875rem',
  } as const;
}

function DemoPanel({
  title,
  description,
  open,
  defaultOpen,
  onOpenChange,
  children,
}: PanelProps) {
  const [isOpen = false, setIsOpen] = useControllableState<boolean>({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <div style={cardStyle()}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 'var(--space-sm)',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'grid', gap: 'var(--space-3xs)' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>{title}</strong>
          {description ? <p style={mutedTextStyle()}>{description}</p> : null}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} style={buttonStyle()} type="button">
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      {isOpen ? children : null}
    </div>
  );
}

function ProblemAndSolution() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <div
        style={{
          display: 'grid',
          gap: 'var(--space-md)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <div style={cardStyle()}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Problem</strong>
          <p style={mutedTextStyle()}>
            A reusable component often needs to work in both uncontrolled and controlled mode.
          </p>
          <pre style={codeStyle()}>
{`<Drawer defaultOpen />

const [open, setOpen] = useState(false);
<Drawer open={open} onOpenChange={setOpen} />`}
          </pre>
          <p style={mutedTextStyle()}>
            Without a hook, every component repeats the same state-branching logic.
          </p>
        </div>

        <div style={cardStyle()}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Solution</strong>
          <p style={mutedTextStyle()}>
            `useControllableState` centralizes that logic into one small API.
          </p>
          <pre style={codeStyle()}>
{`const [value, setValue] = useControllableState({
  prop,
  defaultProp,
  onChange,
});`}
          </pre>
          <pre style={codeStyle()}>
{`function Drawer({ open, defaultOpen, onOpenChange }) {
  const [isOpen = false, setIsOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
}`}
          </pre>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 'var(--space-md)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <DemoPanel
          defaultOpen={true}
          description="No parent state. The component manages itself."
          title="Uncontrolled Example"
        >
          <p style={mutedTextStyle()}>This panel opens and closes using its own internal state.</p>
        </DemoPanel>

        <div style={cardStyle()}>
          <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
            <button onClick={() => setControlledOpen(true)} style={buttonStyle(true)} type="button">
              Open from parent
            </button>
            <button onClick={() => setControlledOpen(false)} style={buttonStyle()} type="button">
              Close from parent
            </button>
          </div>
          <DemoPanel
            description="Parent owns the state. The component only requests updates."
            onOpenChange={setControlledOpen}
            open={controlledOpen}
            title="Controlled Example"
          >
            <p style={mutedTextStyle()}>
              This panel is driven from outside, but still uses the same component API.
            </p>
          </DemoPanel>
        </div>
      </div>
    </div>
  );
}

function FiltersPanel({
  open,
  defaultOpen,
  onOpenChange,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (next: boolean) => void;
}) {
  const [isOpen = false, setIsOpen] = useControllableState<boolean>({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <div style={cardStyle()}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <strong style={{ color: 'var(--color-text-primary)' }}>Filters</strong>
          <p style={mutedTextStyle()}>A realistic controlled feature panel.</p>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} style={buttonStyle()} type="button">
          {isOpen ? 'Hide filters' : 'Show filters'}
        </button>
      </div>

      {isOpen ? (
        <div style={{ display: 'grid', gap: 'var(--space-xs)' }}>
          {['Design Systems', 'Accessibility', 'Performance'].map((item) => (
            <label
              key={item}
              style={{
                alignItems: 'center',
                color: 'var(--color-text-primary)',
                display: 'flex',
                gap: 'var(--space-xs)',
              }}
            >
              <input type="checkbox" />
              {item}
            </label>
          ))}
          <button onClick={() => setIsOpen(false)} style={buttonStyle()} type="button">
            Close from inside
          </button>
        </div>
      ) : null}
    </div>
  );
}

function RealAppExample() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <div style={cardStyle()}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Real application example</strong>
        <p style={mutedTextStyle()}>
          A page toolbar controls a filter panel, while the panel can still close itself from
          inside.
        </p>
        <pre style={codeStyle()}>
{`const [filtersOpen, setFiltersOpen] = useState(false);

<FiltersPanel
  open={filtersOpen}
  onOpenChange={setFiltersOpen}
/>`}
        </pre>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 'var(--space-md)',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 360px)',
        }}
      >
        <div style={cardStyle()}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <strong style={{ color: 'var(--color-text-primary)' }}>Search Page</strong>
            <button
              onClick={() => setFiltersOpen((current) => !current)}
              style={buttonStyle(true)}
              type="button"
            >
              {filtersOpen ? 'Hide filters' : 'Open filters'}
            </button>
          </div>
          <p style={mutedTextStyle()}>
            The page owns visibility state. The panel remains reusable.
          </p>
        </div>

        <FiltersPanel onOpenChange={setFiltersOpen} open={filtersOpen} />
      </div>
    </div>
  );
}

const meta = {
  title: 'Hooks/useControllableState',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A simple guide to the controlled vs uncontrolled state problem, the hook-based solution, and one realistic usage example.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div className="token-page">
      <section style={{ display: 'grid', gap: 'var(--space-md)' }}>
        <div style={{ display: 'grid', gap: 'var(--space-2xs)' }}>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-xl)',
              lineHeight: 'var(--line-height-sm)',
              margin: 0,
            }}
          >
            useControllableState
          </h2>
          <p style={mutedTextStyle()}>
            Use this hook when a component should support both uncontrolled and controlled usage
            without duplicating state logic.
          </p>
        </div>
        <ProblemAndSolution />
      </section>

      <section style={{ display: 'grid', gap: 'var(--space-md)' }}>
        <div style={{ display: 'grid', gap: 'var(--space-2xs)' }}>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-xl)',
              lineHeight: 'var(--line-height-sm)',
              margin: 0,
            }}
          >
            Real App Usage
          </h2>
          <p style={mutedTextStyle()}>
            The same pattern works well for drawers, dialogs, popovers, accordions, and filter
            panels.
          </p>
        </div>
        <RealAppExample />
      </section>
    </div>
  ),
};
