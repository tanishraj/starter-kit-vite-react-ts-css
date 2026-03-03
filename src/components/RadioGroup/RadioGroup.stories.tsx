import { useState } from 'react';

import { Radio } from '../Radio';

import { RadioGroup } from './RadioGroup';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Preferred contact method',
    hint: 'Choose exactly one option.',
    size: 'md',
    orientation: 'vertical',
    disabled: false,
    required: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    onValueChange: {
      action: 'value changed',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: '420px' }}>
      <RadioGroup {...args} defaultValue="email">
        <Radio hint="Best for longer updates." label="Email" value="email" />
        <Radio hint="Best for short urgent alerts." label="SMS" value="sms" />
        <Radio hint="Best for direct conversations." label="Phone" value="phone" />
      </RadioGroup>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-lg)',
        width: '480px',
      }}
    >
      <RadioGroup {...args} defaultValue="email" label="Default selection">
        <Radio label="Email" value="email" />
        <Radio label="SMS" value="sms" />
      </RadioGroup>

      <RadioGroup {...args} error="Please choose one option." label="Error state">
        <Radio label="Email" value="email" />
        <Radio label="SMS" value="sms" />
      </RadioGroup>

      <RadioGroup {...args} disabled hint="All options are currently unavailable." label="Disabled">
        <Radio label="Email" value="email" />
        <Radio label="SMS" value="sms" />
      </RadioGroup>
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('sms');

    return (
      <div style={{ display: 'grid', gap: 'var(--space-md)', width: '420px' }}>
        <RadioGroup {...args} onValueChange={setSelected} value={selected}>
          <Radio label="Email" value="email" />
          <Radio label="SMS" value="sms" />
          <Radio label="Phone" value="phone" />
        </RadioGroup>
        <p style={{ margin: 0 }}>Current value: {selected}</p>
      </div>
    );
  },
};
