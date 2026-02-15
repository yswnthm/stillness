import React from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    name: "Elena Corves",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Dr. Julian Vance",
    role: "Director of Wellness Science",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Maya Sterling",
    role: "Lead Sound Practitioner",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
  }
];

export const TeamGrid: React.FC = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="text-2xl md:text-4xl font-serif text-stone mb-16 text-center">Leadership</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <h4 className="text-xl font-serif text-stone mb-1">{member.name}</h4>
              <p className="text-sm text-seafoam uppercase tracking-widest font-bold">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
