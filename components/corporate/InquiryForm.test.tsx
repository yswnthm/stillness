import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InquiryForm } from './InquiryForm';

describe('InquiryForm Component', () => {
  it('renders form fields', () => {
    render(<InquiryForm />);
    expect(screen.getByPlaceholderText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Work Email/i)).toBeInTheDocument();
  });

  it('shows success message on submit', async () => {
    render(<InquiryForm />);
    
    fireEvent.change(screen.getByPlaceholderText(/Company Name/i), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByPlaceholderText(/Work Email/i), { target: { value: 'test@acme.com' } });
    
    fireEvent.click(screen.getByText(/Send Inquiry/i));
    
    expect(await screen.findByText(/Thank you for your interest/i)).toBeInTheDocument();
  });
});
