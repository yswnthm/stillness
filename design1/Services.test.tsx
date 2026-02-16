import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore
import { Services } from './Services';

describe('Design 1: Services Component', () => {
  it('renders the Services section', () => {
    render(<Services />);
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveClass('design1-services');
  });

  it('lists at least one service', () => {
    render(<Services />);
    // Assuming there will be headings for services
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThan(0);
  });
});
