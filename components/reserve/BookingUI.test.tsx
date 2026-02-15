import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookingUI } from './BookingUI';

describe('BookingUI Component', () => {
  it('renders calendly integration placeholder', () => {
    render(<BookingUI />);
    expect(screen.getByText(/Calendly Integration/i)).toBeInTheDocument();
  });
});
