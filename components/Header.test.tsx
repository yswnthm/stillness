import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header Navigation', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Corporate/i).length).toBeGreaterThan(0);
  });

  it('links point to correct routes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    const aboutLinks = screen.getAllByText(/About/i);
    aboutLinks.forEach(link => {
       expect(link.closest('a')).toHaveAttribute('href', '/about');
    });

    const corporateLinks = screen.getAllByText(/Corporate/i);
    corporateLinks.forEach(link => {
       expect(link.closest('a')).toHaveAttribute('href', '/corporate');
    });
  });
});
