import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore
import { Testimonials } from './Testimonials';

describe('Design 1: Testimonials Component', () => {
  it('renders the Testimonials section', () => {
    render(<Testimonials />);
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveClass('design1-testimonials');
  });

  it('shows a testimonial quote', () => {
    render(<Testimonials />);
    expect(screen.getByText(/mind was until I stepped into the silence/i)).toBeInTheDocument();
  });
});
