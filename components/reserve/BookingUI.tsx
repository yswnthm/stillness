import React from 'react';
import { motion } from 'framer-motion';

export const BookingUI: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <motion.div 
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Placeholder for actual Calendly Embed */}
        <div className="w-full min-h-[600px] flex flex-col items-center justify-center bg-stone/5 p-12 text-center">
          <div className="w-16 h-16 bg-seafoam/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-seafoam" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-stone mb-4">Calendly Integration</h3>
          <p className="text-stone/60 max-w-md mx-auto mb-8">
            In the production environment, your Calendly scheduling widget will be embedded here, 
            providing a seamless real-time booking experience.
          </p>
          <div className="inline-block px-8 py-3 bg-stone text-cream rounded-full text-sm font-bold uppercase tracking-widest opacity-50 cursor-not-allowed">
            Widget Placeholder
          </div>
          
          <div className="mt-12 p-4 bg-seafoam/10 rounded-xl border border-seafoam/20 text-xs text-stone/70">
            <strong>Migration Tip:</strong> For WordPress/Elementor, we will simply use an HTML widget 
            to paste your Calendly embed code. No complex custom coding required.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
