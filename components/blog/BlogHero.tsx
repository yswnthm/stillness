import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const BlogHero: React.FC = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2000&auto=format&fit=crop"
                    alt="The Journal"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-stone/40 via-transparent to-stone/80" />
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="block text-seafoam text-sm tracking-widest uppercase mb-4">The Journal</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-6 tracking-tight leading-tight">
                        Notes on <span className="italic">Stillness</span>
                    </h1>
                    <p className="text-cream/80 mt-4 font-light max-w-lg mx-auto text-lg md:text-xl leading-relaxed">
                        Thoughts on healing, ritual, and the profound art of coming home to yourself.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
                <ChevronDown className="text-cream/50 animate-bounce w-8 h-8 font-light" />
            </motion.div>
        </section>
    );
};
