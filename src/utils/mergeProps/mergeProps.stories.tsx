import { useState } from 'react';

import { mergeProps } from './mergeProps';

import type { Meta, StoryObj } from '@storybook/react-vite';

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

function buttonStyle() {
  return {
    background: 'var(--color-bg-brand-solid)',
    border: '1px solid var(--color-border-brand)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary_on-brand)',
    cursor: 'pointer',
    font: 'inherit',
    padding: '0.625rem 0.875rem',
  } as const;
}

function mergedButtonStyle() {
  return {
    alignItems: 'center',
    background: 'var(--color-bg-brand-solid)',
    border: '1px solid var(--color-border-brand)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary_on-brand)',
    cursor: 'pointer',
    display: 'inline-flex',
    font: 'inherit',
    justifyContent: 'center',
    minHeight: '40px',
    padding: '0.625rem 0.875rem',
  } as const;
}

function ActionButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const mergedProps = mergeProps(
    {
      className: 'action-button action-button--internal',
      onClick: () => {
        console.log('internal click handler');
      },
      style: {
        ...mergedButtonStyle(),
      },
      type: 'button' as const,
    },
    props,
  );

  return <button {...mergedProps} />;
}

function ProblemAndSolution() {
  const [events, setEvents] = useState<string[]>([]);

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
            Reusable components often have internal props, but consumers also want to pass their
            own props.
          </p>
          <pre style={codeStyle()}>
{`<button
  className="internal"
  onClick={internalHandler}
  {...props}
/>`}
          </pre>
          <p style={mutedTextStyle()}>
            With plain spreading, later props overwrite earlier ones. You can lose internal
            handlers, classes, or styles.
          </p>
        </div>

        <div style={cardStyle()}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Solution</strong>
          <p style={mutedTextStyle()}>
            `mergeProps` combines the useful cases instead of overwriting them.
          </p>
          <pre style={codeStyle()}>
{`const mergedProps = mergeProps(
  internalProps,
  consumerProps,
);`}
          </pre>
          <p style={mutedTextStyle()}>
            It merges `className`, merges `style`, and chains event handlers like `onClick`.
          </p>
        </div>
      </div>

      <div style={cardStyle()}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Live example</strong>
        <p style={mutedTextStyle()}>
          Clicking this button runs both the internal handler and the consumer handler.
        </p>
        <ActionButton
          className="action-button action-button--consumer"
          onClick={() =>
            setEvents((current) => [...current, `consumer handler ran at ${current.length + 1}`])
          }
          style={{ boxShadow: 'inset 0 0 0 2px color-mix(in srgb, white 30%, transparent)' }}
        >
          Merged button props
        </ActionButton>
        <p style={mutedTextStyle()}>
          Latest events: {events.length > 0 ? events.join(' | ') : 'none yet'}
        </p>
      </div>
    </div>
  );
}

function SearchTrigger({
  props,
}: {
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  const mergedProps = mergeProps(
    {
      'aria-label': 'Open search',
      className: 'search-trigger',
      onClick: () => {
        console.log('open internal search overlay');
      },
      style: {
        ...mergedButtonStyle(),
        background: 'var(--color-bg-primary_alt)',
        border: '1px solid var(--color-border-primary)',
        color: 'var(--color-text-primary)',
      },
      type: 'button' as const,
    },
    props,
  );

  return <button {...mergedProps}>Search</button>;
}

function RealAppExample() {
  const [openedCount, setOpenedCount] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <div style={cardStyle()}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Real application example</strong>
        <p style={mutedTextStyle()}>
          Low-level primitives often need internal accessibility and behavior props while still
          letting product teams add analytics or styling.
        </p>
        <pre style={codeStyle()}>
{`const mergedProps = mergeProps(
  internalButtonProps,
  externalButtonProps,
);`}
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
          <strong style={{ color: 'var(--color-text-primary)' }}>Search page toolbar</strong>
          <p style={mutedTextStyle()}>
            The button keeps its internal behavior, while the page attaches analytics through its
            own `onClick`.
          </p>
          <button
            onClick={() => setOpenedCount(0)}
            style={{ ...buttonStyle(), width: 'fit-content' }}
            type="button"
          >
            Reset counter
          </button>
          <p style={mutedTextStyle()}>External click count: {openedCount}</p>
        </div>

        <SearchTrigger
          props={{
            onClick: () => setOpenedCount((current) => current + 1),
            style: { width: '100%' },
          }}
        />
      </div>
    </div>
  );
}

const meta = {
  title: 'Utils/mergeProps',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A simple guide to the prop-overwrite problem, the mergeProps solution, and one realistic usage example.',
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
            mergeProps
          </h2>
          <p style={mutedTextStyle()}>
            Use mergeProps when both internal component props and consumer props need to apply to
            the same element.
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
            This pattern is useful in buttons, triggers, menu items, and primitive components.
          </p>
        </div>
        <RealAppExample />
      </section>
    </div>
  ),
};
