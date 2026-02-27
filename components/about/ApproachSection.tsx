import React from 'react';
import { motion } from 'framer-motion';

const approachPoints = [
    {
        num: "01",
        title: "Experiential, not educational",
        desc: "You don't leave knowing more. You leave feeling different. Every session is designed to create a real, physical shift — not just a mental one."
    },
    {
        num: "02",
        title: "Led by someone in it",
        desc: "Our founder isn't teaching from a textbook. She's facilitating from lived experience. That's not a marketing line. You'll feel it in the room."
    },
    {
        num: "03",
        title: "Honest, not mystical",
        desc: "We skip the jargon. No toxic positivity. No pressure to \"transform.\" Just a real space where you can slow down and feel what's actually there."
    },
    {
        num: "04",
        title: "Rooted in community",
        desc: "We're a Vancouver company. Our sessions are intimate. Our community is real. We're not a platform — we're a place."
    },
    {
        num: "05",
        title: "A safe container",
        desc: "Everything we create is designed to help you feel held. You don't need to be ready. You just need to show up."
    },
    {
        num: "06",
        title: "Generational thinking",
        desc: "We work with adults. And we build tools for children. Because healing is more powerful when it starts early."
    }
];

export const ApproachSection: React.FC = () => {
    return (
        <section className="py-24 bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-seafoam text-sm uppercase tracking-[0.3em] font-bold mb-6 block">Our Approach</span>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight text-midnightsea">
                            What makes<br /><span className="italic">Stillness different</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-midnightsea/70 text-lg font-light leading-relaxed">
                            We don't offer classes. We offer experiences. There's a difference — and you'll feel it the moment you walk in.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5px] bg-seafoam/20 border-[1.5px] border-seafoam/20">
                    {approachPoints.map((point, index) => (
                        <motion.div
                            key={point.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 md:p-12 hover:bg-breeze transition-colors duration-500 flex flex-col justify-start"
                        >
                            <div className="font-serif text-5xl font-light text-seafoam/40 mb-6 leading-none">{point.num}</div>
                            <h3 className="text-sm font-bold tracking-widest uppercase text-midnightsea mb-4">{point.title}</h3>
                            <p className="text-midnightsea/70 font-light leading-relaxed text-[0.95rem]">
                                {point.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
