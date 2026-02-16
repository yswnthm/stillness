import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore
import { Hero } from './Hero';

describe('Design 3: Modern Editorial Components', () => {
  describe('Hero', () => {
    it('renders with "Modern Editorial" characteristics', () => {
      render(<Hero />);
      const heroElement = screen.getByRole('banner');
      expect(heroElement).toBeInTheDocument();
      expect(heroElement).toHaveClass('design3-hero');
    });

    it('contains the main headline with high-fashion typography', () => {
      render(<Hero />);
      expect(screen.getByText(/Stillness/i)).toBeInTheDocument();
    });
  });
});
