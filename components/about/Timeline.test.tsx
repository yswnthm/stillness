import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from './Timeline';

describe('Timeline Component', () => {
  it('renders timeline milestones', () => {
    render(<Timeline />);
    // Expecting at least some years or milestone markers
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });
});
