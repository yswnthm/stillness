import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MissionStatement } from './MissionStatement';

describe('MissionStatement Component', () => {
  it('renders the mission title', () => {
    render(<MissionStatement />);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
  });

  it('contains the core mission text', () => {
    render(<MissionStatement />);
    expect(screen.getByText(/to curate space/i)).toBeInTheDocument();
  });
});
