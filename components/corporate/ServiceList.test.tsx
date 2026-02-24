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

  it('renders all three program cards', () => {
    render(<ServiceList />);
    expect(screen.getByText(/Team Float Rituals/i)).toBeInTheDocument();
    expect(screen.getByText(/Executive Retreats/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance Workshops/i)).toBeInTheDocument();
  });

  it('applies background image container to each card', () => {
    const { container } = render(<ServiceList />);
    const cards = container.querySelectorAll('.card-bg-container');
    expect(cards).toHaveLength(3);
  });

  it('applies zoom effect class on card hover', () => {
    const { container } = render(<ServiceList />);
    const bgImages = container.querySelectorAll('.card-bg-image');
    expect(bgImages).toHaveLength(3);
    bgImages.forEach((img) => {
      expect(img).toHaveClass('card-bg-image');
    });
  });
});
