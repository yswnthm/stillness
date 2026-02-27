import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Wind, Waves, Eye, Activity, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', label: 'All Sessions' },
  { id: 'sound', label: 'Sound' },
  { id: 'breathwork', label: 'Breathwork' },
  { id: 'movement', label: 'Movement' },
  { id: 'float', label: 'Floating' },
  { id: 'mindfulness', label: 'Mindfulness' },
];

const services = [
  {
    id: '01',
    category: 'sound',
    title: 'Sound Healing &',
    titleEm: 'Vocal Yoga',
    subtitle: 'Sound · Voice · Vibration',
    description: [
      "Lie back and let sound move through you. This session combines therapeutic sound healing — using bowls, chimes, and instruments chosen for their effect on the nervous system — with the power of your own voice. Vocal yoga invites you to hum, tone, and breathe sound outward. No singing ability required. This isn't performance. It's release.",
      "Most people leave quieter than they arrived. Some feel things they've been sitting with for months finally loosen."
    ],
    tags: ['Beginners welcome', 'Burnt-out professionals', 'Spiritual seekers'],
    specialTags: ['No experience needed'],
    icon: <Music className="w-6 h-6" />,
  },
  {
    id: '02',
    category: 'breathwork',
    title: 'Breathwork',
    titleEm: '',
    subtitle: 'Breath · Nervous System · Release',
    description: [
      "Your breath is one of the most direct ways to change how you feel — and most of us have never been taught to use it. In these guided sessions, you'll move through intentional breathing patterns designed to regulate your nervous system, clear what's stuck, and create a felt shift in your body and mind.",
      "Led by our certified breathwork facilitator, these sessions are held with care and without pressure. You already know how to breathe. We'll just help you do it differently."
    ],
    tags: ['Moms & parents', 'Burnt-out professionals', 'Beginners welcome'],
    combos: ['Pairs with Sound Journey', 'Pairs with Floating'],
    icon: <Wind className="w-6 h-6" />,
  },
  {
    id: '03',
    category: 'float',
    title: 'Floating',
    titleEm: 'Sound Sessions',
    subtitle: 'Water · Sound · Stillness',
    description: [
      "Where Stillness began. Our floating sound sessions take place outdoors on the water — the same experience that started it all in summer 2024. You float while sound moves through the air and the water around you. It's difficult to put into words. The combination of buoyancy, nature, and intentional sound creates something that a studio simply cannot replicate.",
      "Seasonal availability. When these sessions run, they fill quickly."
    ],
    tags: ['Couples', 'Spiritual seekers', 'Beginners welcome'],
    combos: ['Pairs with Breathwork', 'Pairs with Meditation'],
    icon: <Waves className="w-6 h-6" />,
  },
  {
    id: '04',
    category: 'mindfulness',
    title: 'Mindfulness &',
    titleEm: 'Meditation',
    subtitle: 'Mind · Presence · Grounding',
    description: [
      "Not the kind where you try not to think — and feel like you're failing the whole time. These are guided sessions, walked through step by step, that help you settle into the present moment without fighting it. Think of it as learning to sit with yourself, with someone beside you who knows the way.",
      "We offer standalone meditation sessions and mindfulness experiences that can be combined with movement or sound for a fuller session."
    ],
    tags: ['Moms & parents', 'Beginners welcome', 'Burnt-out professionals'],
    combos: ['Pairs with Sound Journey', 'Pairs with Floating'],
    icon: <Eye className="w-6 h-6" />,
  },
  {
    id: '05',
    category: 'movement',
    title: 'Mindful',
    titleEm: 'Movement & Yoga',
    subtitle: 'Body · Breath · Awareness',
    description: [
      "Movement as medicine. Our yoga sessions are slow, accessible, and led with the same intention as every other Stillness offering — to help you come back into your body, not push it to its limits. You don't need to be flexible. You don't need to have practiced before. You just need to show up.",
      "Sessions focus on breath-body connection, nervous system regulation, and the kind of presence that stays with you after you leave the mat."
    ],
    tags: ['Beginners welcome', 'Moms & parents', 'Couples'],
    combos: ['Pairs with Breathwork', 'Pairs with Meditation'],
    icon: <Activity className="w-6 h-6" />,
  },
];

export const ServiceList: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredServices = activeFilter === 'all'
    ? services
    : services.filter(s => s.category === activeFilter);

  return (
    <section className="bg-cream">
      {/* Sticky Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-cream/95 backdrop-blur-md border-b border-stone/10 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-sans transition-all whitespace-nowrap border-b-2 ${activeFilter === cat.id
                ? 'text-seafoam border-seafoam'
                : 'text-stone/40 border-transparent hover:text-stone/60'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Intro Text Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <h2 className="text-3xl md:text-5xl font-serif text-midnightsea leading-[1.15]">
          One modality is powerful.<br />
          <span className="italic text-seafoam">Two together</span> is transformative.
        </h2>
        <p className="text-midnightsea/70 text-lg leading-relaxed font-sans md:pt-2">
          Each offering below stands on its own — but many of our sessions weave modalities together intentionally.
          Sound and breathwork. Floating and meditation. Movement and stillness.
          We'll always let you know when a session combines approaches, so you can choose what feels right for where you are.
        </p>
      </div>

      {/* Offerings Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col gap-0.5 bg-stone/10 border border-stone/10">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group grid grid-cols-1 md:grid-cols-[1fr_250px] bg-cream relative overflow-hidden"
              >
                {/* Accent Line on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-sand scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

                {/* Main Content Area */}
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-stone/10">
                  <div className="flex items-start gap-8 mb-6">
                    <span className="font-serif text-stone/30 text-sm tracking-widest pt-1.5">{service.id}</span>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-serif text-midnightsea leading-tight mb-2">
                        {service.title} {service.titleEm && <span className="italic text-seafoam">{service.titleEm}</span>}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-sand font-bold">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="md:pl-16 space-y-6 max-w-3xl">
                    {service.description.map((p, i) => (
                      <p key={i} className="text-midnightsea/70 leading-relaxed font-sans">
                        {p}
                      </p>
                    ))}

                    <div className="flex flex-wrap gap-2 pt-4">
                      {service.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 text-[9px] uppercase tracking-wider bg-seafoam/5 border border-seafoam/20 text-seafoam">
                          {tag}
                        </span>
                      ))}
                      {service.specialTags?.map(tag => (
                        <span key={tag} className="px-3 py-1.5 text-[9px] uppercase tracking-wider border border-stone/10 text-stone/60">
                          {tag}
                        </span>
                      ))}
                      {service.combos?.map(combo => (
                        <span key={combo} className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] uppercase tracking-wider bg-sand/10 border border-sand/30 text-sand font-bold">
                          <span className="text-[8px]">◈</span> {combo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar / CTA Area */}
                <div className="p-8 md:p-0 flex flex-col items-center justify-center gap-8 text-center bg-stone/[0.02]">
                  <div className="w-16 h-16 rounded-full bg-seafoam/10 flex items-center justify-center text-seafoam">
                    {service.icon}
                  </div>
                  <Link
                    to="/reserve"
                    className="w-full md:w-auto px-6 py-4 bg-seafoam text-cream text-[10px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-seafoam border border-seafoam transition-all duration-300"
                  >
                    See Upcoming Dates
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
