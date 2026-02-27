import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal decorative divider by default', () => {
    const { container } = render(<Divider data-testid="divider" />);
    const divider = container.querySelector('.divider');

    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass(
      'divider',
      'divider--horizontal',
      'divider--solid',
      'divider--inset-none',
      'divider--color-primary',
    );
    expect(divider).toHaveAttribute('aria-hidden', 'true');
    expect(divider).not.toHaveAttribute('role');
  });

  it('renders semantic separator when decorative is false', () => {
    render(<Divider decorative={false} orientation="vertical" />);
    const divider = screen.getByRole('separator');

    expect(divider).toHaveClass('divider--vertical');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies variant, color, inset and thickness styles', () => {
    const { container } = render(
      <Divider color="brand" inset="md" orientation="horizontal" thickness={3} variant="dashed" />,
    );
    const divider = container.querySelector('.divider');

    expect(divider).toHaveClass(
      'divider--horizontal',
      'divider--dashed',
      'divider--color-brand',
      'divider--inset-md',
    );
    expect(divider).toHaveStyle({ '--divider-thickness': '3px' });
  });
});
