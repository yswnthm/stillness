import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore
import { Intro } from './Intro';

describe('Design 1: Intro Component', () => {
  it('renders the Intro section', () => {
    render(<Intro />);
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveClass('design1-intro');
  });

  it('contains the mission statement', () => {
    render(<Intro />);
    expect(screen.getByText(/Mission/i)).toBeInTheDocument();
  });
});
