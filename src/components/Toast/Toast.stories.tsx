import {
  Toast,
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  showPromiseToast,
  showSuccessToast,
  showWarningToast,
} from './Toast';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  args: {
    autoClose: 3500,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: false,
    newestOnTop: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    position: 'top-right',
    theme: 'light',
  },
  argTypes: {
    position: {
      control: 'radio',
      options: [
        'top-right',
        'top-center',
        'top-left',
        'bottom-right',
        'bottom-center',
        'bottom-left',
      ],
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark', 'colored'],
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

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

function actionsWrapStyle() {
  return {
    display: 'grid',
    gap: 'var(--space-sm)',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    maxWidth: '900px',
  } as const;
}

export const Playground: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <Toast {...args} />
      <div style={actionsWrapStyle()}>
        <button
          onClick={() => showSuccessToast('Preferences were saved successfully.')}
          style={buttonStyle(true)}
          type="button"
        >
          Success
        </button>
        <button
          onClick={() => showInfoToast('A new deployment is available.')}
          style={buttonStyle()}
          type="button"
        >
          Info
        </button>
        <button
          onClick={() => showWarningToast('Your session will expire soon.')}
          style={buttonStyle()}
          type="button"
        >
          Warning
        </button>
        <button
          onClick={() => showErrorToast('Failed to save the latest changes.')}
          style={buttonStyle()}
          type="button"
        >
          Error
        </button>
        <button
          onClick={() => showLoadingToast('Syncing workspace data...')}
          style={buttonStyle()}
          type="button"
        >
          Loading
        </button>
      </div>
    </div>
  ),
};

export const PromiseFlow: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <Toast {...args} />
      <button
        onClick={() =>
          showPromiseToast(
            new Promise<string>((resolve) => {
              setTimeout(() => resolve('All files synced.'), 1500);
            }),
            {
              error: 'Sync failed',
              pending: 'Syncing files...',
              success: 'Sync completed',
            },
          )
        }
        style={buttonStyle(true)}
        type="button"
      >
        Trigger Promise Toast
      </button>
    </div>
  ),
};
