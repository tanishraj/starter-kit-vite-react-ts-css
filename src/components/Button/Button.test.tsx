import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders with default classes and children', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn', 'btn--solid', 'btn--md', 'btn--color-primary');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('disables and blocks clicks when loading', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <Button loading onClick={onClick}>
        Submit
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn--loading');
    expect(container.querySelector('.btn__loader')).toBeInTheDocument();

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders start and end icons', () => {
    render(
      <Button
        startIcon={<span data-testid="start-icon">S</span>}
        endIcon={<span data-testid="end-icon">E</span>}
      >
        Continue
      </Button>,
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });
});
