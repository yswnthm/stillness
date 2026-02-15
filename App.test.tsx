import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Routing', () => {
  it('renders landing page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Hero section usually has "STILLNESS" or something similar
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders about page when navigating to /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/About Page/i)).toBeInTheDocument();
  });

  it('renders corporate page when navigating to /corporate', () => {
    render(
      <MemoryRouter initialEntries={['/corporate']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Corporate Page/i)).toBeInTheDocument();
  });

  it('renders reserve page when navigating to /reserve', () => {
    render(
      <MemoryRouter initialEntries={['/reserve']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Reserve Page/i)).toBeInTheDocument();
  });
});
