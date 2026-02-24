import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Zap } from 'lucide-react';

const services = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Float Rituals",
    description: "Structured decompression sessions for small teams to reset together.",
    bgImage: "https://picsum.photos/seed/corporate1/800/600"
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Executive Retreats",
    description: "Multi-day deep rest intensives for leadership teams in high-stress environments.",
    bgImage: "https://picsum.photos/seed/corporate2/800/600"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance Workshops",
    description: "Breathwork and sound healing optimized for focus and creative flow.",
    bgImage: "https://picsum.photos/seed/corporate3/800/600"
  }
];

export const ServiceList: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-midnightsea mb-6">Our Programs</h2>
          <p className="text-midnightsea/60 text-lg font-light">
            Modular wellness solutions that integrate seamlessly into the modern work day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-cream border border-stone/5 hover:border-seafoam/30 hover:shadow-xl hover:shadow-seafoam/5 transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              {/* Background Image Container with Zoom Effect */}
              <div className="card-bg-container absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <img
                  src={service.bgImage}
                  alt=""
                  className="card-bg-image w-full h-full object-cover opacity-40 transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Content with proper z-index for readability */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full border border-seafoam text-seafoam group-hover:bg-seafoam group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif text-midnightsea mb-4">{service.title}</h3>
                <p className="text-midnightsea/60 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
