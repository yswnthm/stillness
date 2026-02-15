import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrandStory } from './BrandStory';

describe('BrandStory Component', () => {
  it('renders the brand story title', () => {
    render(<BrandStory />);
    expect(screen.getByText(/Our Story/i)).toBeInTheDocument();
  });

  it('contains story content', () => {
    render(<BrandStory />);
    // Checking for some expected text from the specification or mission
    expect(screen.getByText(/Stillness was born/i)).toBeInTheDocument();
  });
});
