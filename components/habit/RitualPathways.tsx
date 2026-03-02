import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const RitualPathways: React.FC = () => {
    return (
        <div className="bg-cream/20 p-12 md:p-16 rounded-[4.5rem] border border-stone/5 flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-sm">
            <span className="text-seafoam tracking-[0.3em] uppercase text-[10px] mb-8 block font-bold">The Commitment</span>
            <h3 className="text-4xl font-serif mb-12">Ritual Pathways</h3>

            <div className="grid md:grid-cols-2 gap-8 flex-grow">
                <div className="p-12 rounded-[2.5rem] bg-white border border-stone/5 hover:border-seafoam/30 transition-all group shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                    <div className="text-xs uppercase tracking-widest text-stone/40 mb-6 group-hover:text-seafoam transition-colors font-bold">Founders Circle</div>
                    <div className="text-6xl font-serif text-stone mb-3 leading-none">$333</div>
                    <div className="text-[10px] text-stone/30 mb-8 uppercase tracking-[0.2em] font-bold">Early Intake / CAD</div>
                    <ul className="space-y-5">
                        {['Priority Intake Window', 'Lifetime Alumnus Hub', 'The Founders Bonus Workshop'].map((li, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-stone/60 text-sm">
                                <CheckCircle2 size={16} className="text-seafoam flex-shrink-0" /> {li}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-12 rounded-[2.5rem] bg-stone/5 border border-transparent hover:border-stone/10 transition-all group">
                    <div className="text-xs uppercase tracking-widest text-stone/40 mb-6 font-bold">Standard Enrollment</div>
                    <div className="text-6xl font-serif text-stone mb-3 leading-none">$444</div>
                    <div className="text-[10px] text-stone/30 mb-8 uppercase tracking-[0.2em] font-bold">Regular Rate / CAD</div>
                    <ul className="space-y-5">
                        {['Full 30-Day Guided Journey', 'Digital Integration Library', 'Live Closing Fire Ritual'].map((li, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-stone/60 text-sm">
                                <CheckCircle2 size={16} className="text-seafoam flex-shrink-0" /> {li}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row gap-6 pt-12 border-t border-stone/5">
                <Link to="/reserve" className="flex-1 bg-midnightsea text-cream text-center py-6 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-stone transition-all shadow-xl font-bold">
                    Apply for Intake
                </Link>
                <Link to="/contact" className="flex-1 border border-stone/20 text-stone text-center py-6 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-stone/5 transition-all font-bold">
                    Discovery Session
                </Link>
            </div>
        </div>
    );
};
