import { useEffect, useRef, useState } from 'react';

import {
  getScrollOffset,
  getScrollPosition,
  lockBodyScroll,
  restoreScroll,
  scrollIntoView,
} from './scroll';

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

function sectionTitleStyle() {
  return {
    color: 'var(--color-text-primary)',
    fontSize: 'var(--font-size-xl)',
    lineHeight: 'var(--line-height-sm)',
    margin: 0,
  } as const;
}

function ScrollDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const captureMetrics = (index = 18) => {
    if (!containerRef.current || !itemRefs.current[index]) {
      return;
    }

    setPosition(getScrollPosition(containerRef.current));
    setOffset(getScrollOffset(itemRefs.current[index], { container: containerRef.current }));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <div style={cardStyle()}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Problem</strong>
        <p style={mutedTextStyle()}>
          Scrolling logic tends to get repeated across menus, lists, drawers, and dialogs. Teams
          usually need the same four primitives: read the current position, measure an item inside
          a container, scroll to it, and temporarily lock page scroll.
        </p>
        <pre style={codeStyle()}>
{`const offset = getScrollOffset(item, { container });
const position = getScrollPosition(container);
scrollIntoView(item, { container, block: 'nearest' });`}
        </pre>
      </div>

      <div style={cardStyle()}>
        <strong style={{ color: 'var(--color-text-primary)' }}>Live example</strong>
        <p style={mutedTextStyle()}>
          This simulates a scrollable results panel. Jump to an item, then inspect the current
          container position and the item offset.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
          <button
            onClick={() => {
              const target = itemRefs.current[18];

              if (target && containerRef.current) {
                scrollIntoView(target, {
                  behavior: 'smooth',
                  block: 'nearest',
                  container: containerRef.current,
                  offset: { y: 12 },
                });
              }
            }}
            style={buttonStyle(true)}
            type="button"
          >
            Scroll to item 19
          </button>
          <button onClick={() => captureMetrics()} style={buttonStyle()} type="button">
            Read scroll metrics
          </button>
        </div>
        <div
          ref={containerRef}
          style={{
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-md)',
            display: 'grid',
            gap: 'var(--space-xs)',
            maxHeight: '280px',
            overflow: 'auto',
            padding: 'var(--space-sm)',
          }}
        >
          {Array.from({ length: 28 }, (_, index) => (
            <div
              key={index}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              style={{
                background:
                  index === 18
                    ? 'var(--color-bg-warning-subtle)'
                    : 'var(--color-bg-primary_alt)',
                border: '1px solid var(--color-border-primary)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                minHeight: '56px',
                padding: 'var(--space-sm)',
              }}
            >
              Item {index + 1}
            </div>
          ))}
        </div>
        <p style={mutedTextStyle()}>
          Scroll position: x={position.x}, y={position.y} | Item 19 offset: x={offset.x}, y=
          {offset.y}
        </p>
      </div>
    </div>
  );
}

function BodyScrollLockDemo() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    return () => restoreScroll();
  }, []);

  return (
    <div style={cardStyle()}>
      <strong style={{ color: 'var(--color-text-primary)' }}>Modal / dialog example</strong>
      <p style={mutedTextStyle()}>
        `lockBodyScroll` is useful when a dialog or drawer should stop the page behind it from
        moving. `restoreScroll` brings the page back to its previous state when the overlay closes.
      </p>
      <pre style={codeStyle()}>
{`useEffect(() => {
  const state = lockBodyScroll();
  return () => restoreScroll(state);
}, []);`}
      </pre>
      <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
        <button
          onClick={() => {
            if (locked) {
              restoreScroll();
              setLocked(false);
              return;
            }

            lockBodyScroll();
            setLocked(true);
          }}
          style={buttonStyle(true)}
          type="button"
        >
          {locked ? 'Unlock body scroll' : 'Lock body scroll'}
        </button>
      </div>
      <p style={mutedTextStyle()}>Body scroll is currently {locked ? 'locked' : 'unlocked'}.</p>
    </div>
  );
}

const meta = {
  title: 'Utils/scroll',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Small scroll helpers for measuring offsets, reading positions, scrolling items into view, and locking body scroll for overlays.',
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
          <h2 style={sectionTitleStyle()}>Scroll helpers</h2>
          <p style={mutedTextStyle()}>
            A compact overview of `getScrollPosition`, `getScrollOffset`, `scrollIntoView`,
            `lockBodyScroll`, and `restoreScroll`.
          </p>
        </div>
        <ScrollDemo />
        <BodyScrollLockDemo />
      </section>
    </div>
  ),
};
