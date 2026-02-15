import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookingUI } from './BookingUI';

describe('BookingUI Component', () => {
  it('renders booking interface placeholder', () => {
    render(<BookingUI />);
    expect(screen.getByText(/Select a Date/i)).toBeInTheDocument();
  });
});
