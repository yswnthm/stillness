import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore
import { Hero } from './Hero';

describe('Design 4: Soft Glow Components', () => {
  describe('Hero', () => {
    it('renders with "Soft Glow" characteristics', () => {
      render(<Hero />);
      const heroElement = screen.getByRole('banner');
      expect(heroElement).toBeInTheDocument();
      expect(heroElement).toHaveClass('design4-hero');
    });

    it('contains the main headline', () => {
      render(<Hero />);
      expect(screen.getByText(/Stillness/i)).toBeInTheDocument();
    });
  });
});
