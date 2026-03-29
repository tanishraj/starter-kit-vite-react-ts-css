import { useState } from 'react';

import { Toast } from './Toast';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  args: {
    heading: 'Changes saved',
    description: 'Your workspace preferences were updated successfully.',
    variant: 'soft',
    color: 'success',
    dismissible: true,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['soft', 'solid'],
    },
    color: {
      control: 'radio',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
    onDismiss: {
      action: 'dismissed',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: '420px' }}>
      <Toast {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-md)', width: '460px' }}>
      <Toast {...args} heading="Soft variant" variant="soft" />
      <Toast {...args} color="info" heading="Solid variant" variant="solid" />
    </div>
  ),
};

export const Stack: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-sm)', width: '460px' }}>
      <Toast {...args} color="success" heading="Build succeeded" icon="✓" />
      <Toast
        {...args}
        action={{ label: 'Retry', onClick: () => {} }}
        color="warning"
        description="The request timed out. Try again."
        heading="Connection unstable"
        icon="!"
      />
      <Toast
        {...args}
        color="danger"
        description="We could not save your last changes."
        heading="Save failed"
        icon="×"
      />
    </div>
  ),
};

export const Dismissible: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);

    return (
      <div style={{ width: '420px' }}>
        {visible ? (
          <Toast
            {...args}
            color="info"
            heading="Profile updated"
            onDismiss={() => setVisible(false)}
          />
        ) : (
          <button onClick={() => setVisible(true)} type="button">
            Show toast
          </button>
        )}
      </div>
    );
  },
};
