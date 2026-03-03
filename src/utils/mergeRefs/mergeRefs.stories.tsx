import { useRef, useState, type ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { mergeRefs } from './mergeRefs';

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

function inputStyle() {
  return {
    background: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    font: 'inherit',
    padding: '0.625rem 0.875rem',
    width: '100%',
  } as const;
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
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
          {title}
        </h2>
        <p style={mutedTextStyle()}>{description}</p>
      </div>
      {children}
    </section>
  );
}

function ProblemAndSolution() {
  const objectRef = useRef<HTMLInputElement | null>(null);
  const [callbackAttached, setCallbackAttached] = useState(false);
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);

  const callbackRef = (node: HTMLInputElement | null) => {
    setCallbackAttached(Boolean(node));
    setMeasuredWidth(node?.offsetWidth ?? null);
  };

  const combinedRef = mergeRefs<HTMLInputElement>(objectRef, callbackRef);

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
            A component sometimes needs more than one ref for the same element.
          </p>
          <pre style={codeStyle()}>
{`const internalRef = useRef(null);

return <input ref={internalRef} />;`}
          </pre>
          <p style={mutedTextStyle()}>
            That works until a parent also needs a ref. A React element only accepts one `ref`
            prop, so one ref wins and the other is lost.
          </p>
        </div>

        <div style={cardStyle()}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Solution</strong>
          <p style={mutedTextStyle()}>
            `mergeRefs` combines multiple refs into a single callback ref.
          </p>
          <pre style={codeStyle()}>
{`const combinedRef = mergeRefs(internalRef, forwardedRef);

return <input ref={combinedRef} />;`}
          </pre>
          <p style={mutedTextStyle()}>
            Now both the internal logic and the parent receive the same DOM node.
          </p>
        </div>
      </div>

      <div style={cardStyle()}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Live example</strong>
        <p style={mutedTextStyle()}>
          This input uses an object ref and a callback ref at the same time.
        </p>
        <input defaultValue="Merged refs in action" ref={combinedRef} style={inputStyle()} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
          <button
            onClick={() => objectRef.current?.focus()}
            style={buttonStyle(true)}
            type="button"
          >
            Focus with object ref
          </button>
          <button
            onClick={() => objectRef.current?.select()}
            style={buttonStyle()}
            type="button"
          >
            Select text
          </button>
        </div>
        <p style={mutedTextStyle()}>
          Callback ref attached: {callbackAttached ? 'yes' : 'no'} | measured width:{' '}
          {measuredWidth ?? 'n/a'}px
        </p>
      </div>
    </div>
  );
}

function SearchInput({
  inputRef,
}: {
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const localRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={cardStyle()}>
      <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
        <button
          onClick={() => localRef.current?.focus()}
          style={buttonStyle()}
          type="button"
        >
          Focus from inside
        </button>
      </div>
      <input
        placeholder="Search candidates"
        ref={mergeRefs(localRef, inputRef)}
        style={inputStyle()}
      />
    </div>
  );
}

function RealAppExample() {
  const pageRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <div style={cardStyle()}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Real application example</strong>
        <p style={mutedTextStyle()}>
          A reusable search input may need an internal ref for focus logic and an external ref for
          page-level actions.
        </p>
        <pre style={codeStyle()}>
{`const localRef = useRef(null);

<input ref={mergeRefs(localRef, forwardedRef)} />`}
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
              onClick={() => pageRef.current?.focus()}
              style={buttonStyle(true)}
              type="button"
            >
              Focus from page toolbar
            </button>
          </div>
          <p style={mutedTextStyle()}>
            The page can focus the input from outside, while the input component still keeps its
            own internal ref behavior.
          </p>
        </div>

        <SearchInput inputRef={pageRef} />
      </div>
    </div>
  );
}

const meta = {
  title: 'Utils/mergeRefs',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A simple guide to the multiple-ref problem, the mergeRefs solution, and one realistic usage example.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div className="token-page">
      <Section
        description="Use mergeRefs when both local logic and external consumers need a ref to the same DOM element."
        title="mergeRefs"
      >
        <ProblemAndSolution />
      </Section>

      <Section
        description="This pattern is common in reusable inputs, dialogs, popovers, and other low-level UI primitives."
        title="Real App Usage"
      >
        <RealAppExample />
      </Section>
    </div>
  ),
};
