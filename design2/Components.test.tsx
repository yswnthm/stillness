import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore
import { Hero } from './Hero';
// @ts-ignore
import { Intro } from './Intro';

describe('Design 2: Earth Tone Components', () => {
  describe('Hero', () => {
    it('renders with "Earth Tone" characteristics', () => {
      render(<Hero />);
      const heroElement = screen.getByRole('banner');
      expect(heroElement).toBeInTheDocument();
      expect(heroElement).toHaveClass('design2-hero');
    });

    it('contains the main headline', () => {
      render(<Hero />);
      expect(screen.getByText(/Stillness/i)).toBeInTheDocument();
    });
  });

  describe('Intro', () => {
    it('renders the intro section', () => {
      render(<Intro />);
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByRole('region')).toHaveClass('design2-intro');
    });
  });
});
