import React from 'react';
import { BookOpen } from 'lucide-react';

export const NewsletterCTA: React.FC = () => {
    return (
        <div className="md:col-span-2 lg:col-span-3 my-4 bg-seafoam rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-seafoam/10">
            <div>
                <BookOpen className="text-white w-10 h-10 mb-4 opacity-80" />
                <h3 className="text-2xl font-serif text-white mb-2">Stillness, delivered.</h3>
                <p className="text-white/80 font-light max-w-md">New essays on healing, ritual, and presence, written for the quiet hours. Join the readers who begin their week with a little more ease.</p>
            </div>
            <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-white/40"
                />
                <button type="submit" className="bg-white text-seafoam rounded-full px-6 py-3 text-xs uppercase tracking-widest flex-shrink-0 hover:bg-stone hover:text-white transition-all duration-300">
                    Subscribe
                </button>
            </form>
        </div>
    );
};
