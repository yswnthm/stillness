import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore - Component doesn't exist yet
import { Hero } from './Hero';

describe('Design 1: Hero Component', () => {
  it('renders the Hero section with "Light & Airy" theme characteristics', () => {
    render(<Hero />);
    const heroElement = screen.getByRole('banner');
    expect(heroElement).toBeInTheDocument();
    expect(heroElement).toHaveClass('design1-hero');
  });

  it('contains the main headline', () => {
    render(<Hero />);
    expect(screen.getByText(/Stillness/i)).toBeInTheDocument();
  });
});
