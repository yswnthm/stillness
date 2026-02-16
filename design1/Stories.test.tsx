import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore
import { Stories } from './Stories';

describe('Design 1: Stories Component', () => {
  it('renders the Stories section', () => {
    render(<Stories />);
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveClass('design1-stories');
  });

  it('displays article titles', () => {
    render(<Stories />);
    expect(screen.getAllByText(/Science/i).length).toBeGreaterThan(0);
  });
});
