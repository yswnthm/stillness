import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookingUI } from './BookingUI';

describe('BookingUI Component', () => {
  it('renders high-fidelity booking interface', () => {
    render(<BookingUI />);
    expect(screen.getByText(/Select a Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Available Times/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm Reservation/i)).toBeInTheDocument();
  });
});
