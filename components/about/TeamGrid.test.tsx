import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TeamGrid } from './TeamGrid';

describe('TeamGrid Component', () => {
  it('renders the team section title', () => {
    render(<TeamGrid />);
    expect(screen.getByText(/Leadership/i)).toBeInTheDocument();
  });

  it('renders team member names', () => {
    render(<TeamGrid />);
    expect(screen.getByText(/Elena Corves/i)).toBeInTheDocument();
  });
});
