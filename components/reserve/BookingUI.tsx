import React from 'react';
import { motion } from 'framer-motion';

export const BookingUI: React.FC = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone/5 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Calendar Side */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-serif text-stone">Select a Date</h3>
            <span className="text-sm font-bold uppercase tracking-widest text-stone/40">March 2026</span>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-[10px] uppercase font-bold text-stone/30 text-center py-2">{day}</div>
            ))}
            {/* Empty cells for padding if month doesn't start on Sunday */}
            <div className="aspect-square"></div>
            {days.map(day => (
              <button 
                key={day} 
                className="aspect-square flex items-center justify-center rounded-full text-sm text-stone hover:bg-seafoam hover:text-white transition-colors border border-transparent hover:border-seafoam"
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots Side */}
        <div className="md:w-64 flex-shrink-0">
          <h3 className="text-xl font-serif text-stone mb-8">Available Times</h3>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {['09:00', '11:00', '13:00', '15:00', '17:00'].map(time => (
              <button 
                key={time}
                className="py-3 px-4 border border-stone/10 rounded-full text-xs font-bold text-stone hover:border-seafoam hover:text-seafoam transition-all text-center"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
