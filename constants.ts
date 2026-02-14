import { NavItem, Testimonial, Product, Article, Stat } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Philosophy', href: '#intro' },
  { label: 'Heal', href: '#heal' },
  { label: 'Corporate', href: '#corporate' },
  { label: 'Journal', href: '#stories' },
  { label: 'Waitlist', href: '#waitlist' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "I didn't realize how loud my mind was until I stepped into the silence. It was a returning to myself I didn't know I needed.",
    author: "Elena R.",
    location: "Architect"
  },
  {
    id: 2,
    quote: "The weightlessness is profound. For an hour, I wasn't a CEO, a mother, or a planner. I was just... being.",
    author: "Sarah J.",
    location: "Founder"
  },
  {
    id: 3,
    quote: "Stillness taught me that rest isn't a luxury. It's the foundation of everything I do.",
    author: "Marcus T.",
    location: "Creative Director"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Deep Rest Bath Oil",
    description: "Lavender & Vetiver blend for evening rituals.",
    price: "$45",
    image: "https://picsum.photos/400/500?random=101"
  },
  {
    id: 2,
    name: "Ceramic Incense Holder",
    description: "Hand-thrown stoneware from Japan.",
    price: "$32",
    image: "https://picsum.photos/400/500?random=102"
  },
  {
    id: 3,
    name: "Grounding Weighted Eye Mask",
    description: "Organic silk with flaxseed filling.",
    price: "$58",
    image: "https://picsum.photos/400/500?random=103"
  }
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Science of Doing Nothing",
    excerpt: "Why your nervous system craves absence of input in a hyper-connected world.",
    category: "Wellness Science",
    image: "https://picsum.photos/800/600?random=201",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Water Memory & Healing",
    excerpt: "Exploring the therapeutic benefits of buoyancy and sensory deprivation.",
    category: "Floating",
    image: "https://picsum.photos/800/600?random=202",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Rituals for Morning Calm",
    excerpt: "Three simple practices to ground yourself before the screen lights up.",
    category: "Daily Practice",
    image: "https://picsum.photos/800/600?random=203",
    readTime: "3 min read"
  }
];

export const CORPORATE_STATS: Stat[] = [
  { value: "40%", label: "Reduction in stress biomarkers after one float" },
  { value: "50%", label: "Improvement in creative problem solving" },
  { value: "2x", label: "Better sleep quality reported by teams" }
];
