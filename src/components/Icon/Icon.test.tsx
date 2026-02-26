import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from './Icon';

describe('Icon', () => {
  it('renders as decorative by default', () => {
    const { container } = render(<Icon name="plus" />);

    const icon = container.querySelector('.icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('icon', 'icon--md');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('role');
    expect(container.querySelector('.icon svg')).toBeInTheDocument();
  });

  it('renders an accessible icon when title is provided', () => {
    render(<Icon name="search" title="Search" />);

    expect(screen.getByRole('img', { name: 'Search' })).toBeInTheDocument();
  });

  it('applies semantic color class and numeric size', () => {
    const { container } = render(<Icon color="brand" name="check" size={32} title="Check" />);

    const icon = container.querySelector('.icon');

    expect(icon).toHaveClass('icon', 'icon--color-brand');
    expect(icon).toHaveStyle({ width: '32px', height: '32px' });
  });
});
