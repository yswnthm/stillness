export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
}

export interface Stat {
  value: string;
  label: string;
}
