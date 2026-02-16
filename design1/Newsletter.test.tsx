import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// @ts-ignore
import { Newsletter } from './Newsletter';

describe('Design 1: Newsletter Component', () => {
  it('renders the Newsletter section', () => {
    render(<Newsletter />);
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveClass('design1-newsletter');
  });

  it('has an email input field', () => {
    render(<Newsletter />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });
});
