import { render, screen } from '@testing-library/react';
import { CorporatePage } from '../pages/CorporatePage';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock scrollTo
window.scrollTo = vi.fn();

describe('CorporatePage', () => {
  it('should have bg-breeze background in the Hero section', () => {
    render(<CorporatePage />);
    // The hero section currently has bg-cream, we want bg-breeze
    const heroTitle = screen.getByText(/Nervous System Regulation for High-Performing Teams/i);
    const heroContainer = heroTitle.parentElement?.parentElement;
    expect(heroContainer).toHaveClass('bg-breeze');
  });
});
