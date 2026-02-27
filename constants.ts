import { NavItem, Testimonial, Product, Article, Stat } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Philosophy', href: '/#intro' },
  { label: 'Heal', href: '/#heal' },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Offerings', href: '/offerings' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
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
    category: 'Wellness',
    date: 'Feb 14, 2026',
    title: 'Why We Built Canada\'s First Floating Bath',
    excerpt: 'The story of how a decade of burnout, restlessness, and an obsessive curiosity about the nervous system led to the most profound and unconventional healing space in the country.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop',
    readTime: '7 min read',
    featured: true,
    content: `
In an age of constant noise, the loudest thing you can do is be still. We have been conditioned to equate motion with progress, and stillness with stagnation. But the opposite is true: real clarity only emerges when the dust of the day is allowed to settle.

## The Physics of Presence

We built Stillness Co. on the belief that the body is the primary technology of healing. Our nervous systems aren't designed for the 24/7 barrage of stimuli we subject them to. When we enter a state of deep rest, like the one found in Canada\'s first floating bath, we aren't just taking a break. We are allowing our cellular architecture to recalibrate.

> "Stillness is not the absence of energy, but the concentration of it."

Whether through modern sensory deprivation or ancient ritual, the goal remains the same: coming home. Our journaling efforts here aren't just articles; they are invitations. Invitations to breathe, to pause, and to remember what it feels like to be truly present in your own skin.

![Atmospheric stillness](https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600&auto=format&fit=crop)

## The Journey Continues

As you navigate these notes, we hope you find fragments of your own stillness. This is a sanctuary for the restless mind. Welcome home.
    `
  },
  {
    id: 2,
    category: 'Meditation',
    date: 'Jan 28, 2026',
    title: 'The Science of Stillness: What Happens to Your Brain During Deep Rest',
    excerpt: 'Exploring the measurable neurological shifts that occur when we move from a state of chronic activation into genuine physiological rest.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
    readTime: '5 min read',
    featured: false,
    content: `Exploring the measurable neurological shifts that occur when we move from a state of chronic activation into genuine physiological rest. 

Full article content coming soon.`
  },
  {
    id: 3,
    category: 'Ritual',
    date: 'Jan 10, 2026',
    title: 'How to Create a Morning Ritual That Actually Sticks',
    excerpt: 'The most effective morning rituals aren\'t the most elaborate ones. They are the ones that require the least willpower to begin.',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop',
    readTime: '4 min read',
    featured: false,
    content: `The most effective morning rituals aren't the most elaborate ones. They are the ones that require the least willpower to begin.

Full article content coming soon.`
  },
  {
    id: 4,
    category: 'Breathwork',
    date: 'Dec 22, 2025',
    title: 'Breathwork is Not a Trend. It\'s Your Most Underused Tool.',
    excerpt: 'A direct look at why the most powerful self-regulation tool available to you is completely free, always available, and almost universally ignored.',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop',
    readTime: '6 min read',
    featured: false,
    content: `A direct look at why the most powerful self-regulation tool available to you is completely free, always available, and almost universally ignored.

Full article content coming soon.`
  },
  {
    id: 5,
    category: 'Wellness',
    date: 'Dec 5, 2025',
    title: 'On Sensory Deprivation and the Art of Doing Nothing',
    excerpt: 'We are conditioned to believe that productivity is the highest virtue. Floating tanks represent a radical and profoundly healing act of refusal.',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop',
    readTime: '5 min read',
    featured: false,
    content: `We are conditioned to believe that productivity is the highest virtue. Floating tanks represent a radical and profoundly healing act of refusal.

Full article content coming soon.`
  },
  {
    id: 6,
    category: 'Corporate',
    date: 'Nov 19, 2025',
    title: '5 Signs Your Team Is Running on Stress, Not Motivation',
    excerpt: 'High performance is not the same as high stress. Learn to spot the signs that your team\'s output is being fueled by cortisol and what to do about it.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    readTime: '6 min read',
    featured: false,
    content: `High performance is not the same as high stress. Learn to spot the signs that your team's output is being fueled by cortisol and what to do about it.

Full article content coming soon.`
  },
  {
    id: 7,
    category: 'Ritual',
    date: 'Nov 05, 2025',
    title: 'The Power of Sound: Why We Use Singing Bowls',
    excerpt: 'Vibration is a direct path to the nervous system. Discover how frequency-based healing can bypass the analytical mind and induce deep rest.',
    image: 'https://images.unsplash.com/photo-1514820402329-de527fdd2e6d?q=80&w=800&auto=format&fit=crop',
    readTime: '5 min read',
    featured: false,
    content: `Vibration is a direct path to the nervous system. Discover how frequency-based healing can bypass the analytical mind and induce deep rest.

Full article content coming soon.`
  },
  {
    id: 8,
    category: 'Wellness',
    date: 'Oct 22, 2025',
    title: 'The Digital Detox: Practical Steps for a Quieter Mind',
    excerpt: 'We weren\'t built for 24/7 connectivity. Learn how to reclaim your attention and create boundaries that actually protect your peace.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    readTime: '4 min read',
    featured: false,
    content: `We weren't built for 24/7 connectivity. Learn how to reclaim your attention and create boundaries that actually protect your peace.

Full article content coming soon.`
  },
  {
    id: 9,
    category: 'Meditation',
    date: 'Oct 08, 2025',
    title: 'The Ritual of Rest: Beyond the 10-Minute App',
    excerpt: 'Meditation isn\'t just something you do; it\'s a way you are. Exploring deeper states of presence through intention and environment.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    readTime: '6 min read',
    featured: false,
    content: `Meditation isn't just something you do; it's a way you are. Exploring deeper states of presence through intention and environment.

Full article content coming soon.`
  },
];

export const CORPORATE_STATS: Stat[] = [
  { value: "40%", label: "Reduction in stress biomarkers after one float" },
  { value: "50%", label: "Improvement in creative problem solving" },
  { value: "2x", label: "Better sleep quality reported by teams" }
];
