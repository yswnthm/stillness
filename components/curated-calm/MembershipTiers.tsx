import React from 'react';
import { Link } from 'react-router-dom';

export const MembershipTiers: React.FC = () => {
    return (
        <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-xl border border-stone/5 flex flex-col h-full">
            <span className="text-seafoam tracking-[0.3em] uppercase text-[10px] mb-8 block">The Investment</span>
            <h3 className="text-4xl font-serif mb-12">Membership Tiers</h3>

            <div className="grid md:grid-cols-2 gap-12 flex-grow">
                <div className="p-8 rounded-3xl bg-stone/5 border border-stone/5 hover:border-seafoam/30 transition-colors group">
                    <div className="text-xs uppercase tracking-widest text-stone/40 mb-4 group-hover:text-seafoam transition-colors">Annual Sanctuary</div>
                    <div className="text-5xl font-serif text-stone mb-2">$3,333</div>
                    <div className="text-xs text-stone/40 mb-8 uppercase tracking-widest">CAD / Billed Yearly</div>
                    <p className="text-stone/60 text-sm italic">"Save 10% and commit to a full cycle of presence."</p>
                </div>
                <div className="p-8 rounded-3xl bg-white border border-stone/5 shadow-sm hover:border-seafoam/30 transition-colors group">
                    <div className="text-xs uppercase tracking-widest text-stone/40 mb-4 group-hover:text-seafoam transition-colors">Monthly Rhythm</div>
                    <div className="text-5xl font-serif text-stone mb-2">$297</div>
                    <div className="text-xs text-stone/40 mb-8 uppercase tracking-widest">CAD / Billed Monthly</div>
                    <p className="text-stone/60 text-sm italic">"Flexible integration for the evolving seeker."</p>
                </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row gap-6 pt-12 border-t border-stone/5">
                <Link to="/reserve" className="flex-1 bg-seafoam text-white text-center py-5 rounded-full text-xs uppercase tracking-widest hover:bg-stone transition-all shadow-lg shadow-seafoam/20">
                    Enroll Now
                </Link>
                <Link to="/contact" className="flex-1 border border-stone/20 text-stone text-center py-5 rounded-full text-xs uppercase tracking-widest hover:bg-stone/5 transition-all">
                    Book Discovery Call
                </Link>
            </div>
        </div>
    );
};
