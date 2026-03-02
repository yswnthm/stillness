import React from 'react';
import { Award } from 'lucide-react';

export const ShareTheStillness: React.FC = () => {
    return (
        <section className="py-32 bg-white flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-6 text-center reveal">
                <div className="w-24 h-32 border border-stone/10 rounded-full mx-auto flex items-center justify-center mb-12 bg-breeze">
                    <Award size={40} className="text-seafoam" />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif mb-8">Share The Stillness</h2>
                <p className="text-stone/60 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
                    Healing is profoundly powerful when shared. Invite a partner, friend, or family member to join any of your in-home sessions for a nominal addition of <span className="text-stone font-medium">$99 per guest</span>.
                </p>
            </div>
        </section>
    );
};
