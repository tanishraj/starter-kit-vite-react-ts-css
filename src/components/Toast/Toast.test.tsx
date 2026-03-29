import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Toast } from './Toast';

describe('Toast', () => {
  it('renders heading and description', () => {
    render(<Toast description="Profile changes were saved." heading="Saved" />);

    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Profile changes were saved.')).toBeInTheDocument();
  });

  it('uses alert role for danger color', () => {
    render(<Toast color="danger" description="Something failed." heading="Error" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();

    render(<Toast heading="Saved" onDismiss={onDismiss} />);

    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('calls action callback when action button is clicked', async () => {
    const onAction = vi.fn();
    const user = userEvent.setup();

    render(
      <Toast
        action={{ label: 'Undo', onClick: onAction }}
        description="Your changes can be reverted."
        heading="Item deleted"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Undo' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
