import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ServiceList } from './ServiceList';

describe('ServiceList Component', () => {
  it('renders corporate services title', () => {
    render(<ServiceList />);
    expect(screen.getByText(/Our Programs/i)).toBeInTheDocument();
  });

  it('renders specific corporate services', () => {
    render(<ServiceList />);
    expect(screen.getByText(/Team Float/i)).toBeInTheDocument();
  });
});
