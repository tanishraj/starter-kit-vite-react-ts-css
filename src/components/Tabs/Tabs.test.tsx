import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from './Tabs';

const items = [
  {
    value: 'overview',
    label: 'Overview',
    content: <p>Overview content</p>,
  },
  {
    value: 'details',
    label: 'Details',
    content: <p>Details content</p>,
  },
  {
    value: 'settings',
    label: 'Settings',
    content: <p>Settings content</p>,
    disabled: true,
  },
];

describe('Tabs', () => {
  it('renders the first enabled tab by default', () => {
    render(<Tabs items={items} label="Sections" />);

    expect(screen.getByRole('radiogroup', { name: 'Sections' })).toBeInTheDocument();
    expect(screen.getByText('Overview content')).toBeInTheDocument();
  });

  it('switches panel on tab selection', async () => {
    const user = userEvent.setup();

    render(<Tabs items={items} label="Sections" />);

    await user.click(screen.getByLabelText('Details'));

    expect(screen.getByText('Details content')).toBeInTheDocument();
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();

    function ControlledTabs() {
      const [value, setValue] = useState('overview');

      return <Tabs items={items} label="Sections" onValueChange={setValue} value={value} />;
    }

    render(<ControlledTabs />);

    await user.click(screen.getByLabelText('Details'));

    expect(screen.getByText('Details content')).toBeInTheDocument();
  });

  it('fires onValueChange with selected tab value', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(<Tabs items={items} label="Sections" onValueChange={onValueChange} />);

    await user.click(screen.getByLabelText('Details'));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('details');
  });

  it('applies vertical class in vertical mode', () => {
    render(<Tabs items={items} label="Sections" orientation="vertical" />);

    expect(screen.getByRole('radiogroup', { name: 'Sections' })).toHaveClass('tabs__list--vertical');
  });

  it('supports disabled tabs', () => {
    render(<Tabs disabled items={items} label="Sections" />);

    expect(screen.getByLabelText('Overview')).toBeDisabled();
    expect(screen.getByLabelText('Details')).toBeDisabled();
  });
});
