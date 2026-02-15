import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export const BookingUI: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [selectedTime, setSelectedTime] = useState<string | null>('11:00');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM'];

  return (
    <div className="max-w-5xl mx-auto px-6">
      <motion.div 
        className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-stone/5 flex flex-col lg:flex-row"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Calendar Section */}
        <div className="lg:w-2/3 p-8 md:p-12 bg-white">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-serif text-stone mb-1">Select a Date</h3>
              <p className="text-stone/40 text-sm font-sans uppercase tracking-widest font-medium">March 2026</p>
            </div>
            <div className="flex gap-4">
              <button className="p-2 rounded-full border border-stone/10 hover:bg-stone hover:text-white transition-all">
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 rounded-full border border-stone/10 hover:bg-stone hover:text-white transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-[10px] md:text-xs uppercase font-bold text-stone/30 text-center py-4 tracking-widest">{day}</div>
            ))}
            {/* Padding for month start */}
            <div className="aspect-square"></div>
            {days.map(day => (
              <button 
                key={day} 
                onClick={() => setSelectedDate(day)}
                className={`aspect-square flex items-center justify-center rounded-2xl text-sm transition-all duration-500 font-sans ${
                  selectedDate === day 
                  ? 'bg-seafoam text-white shadow-lg shadow-seafoam/20 scale-110' 
                  : 'text-stone hover:bg-cream border border-transparent hover:border-stone/5'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection Section */}
        <div className="lg:w-1/3 p-8 md:p-12 bg-cream/50 border-l border-stone/5">
          <div className="flex items-center gap-2 mb-10 text-stone">
            <Clock size={20} className="text-seafoam" />
            <h3 className="text-xl font-serif">Available Times</h3>
          </div>
          
          <div className="space-y-3">
            {timeSlots.map(time => (
              <button 
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`w-full py-4 px-6 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all duration-500 border ${
                  selectedTime === time
                  ? 'bg-stone text-cream border-stone shadow-xl'
                  : 'bg-white text-stone border-stone/5 hover:border-seafoam hover:text-seafoam'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-stone/10">
            <button className="w-full py-5 bg-seafoam text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-seafoam/20 hover:scale-[1.02] active:scale-95 transition-all duration-500">
              Confirm Reservation
            </button>
            <p className="text-[10px] text-center text-stone/40 mt-6 uppercase tracking-widest">No credit card required today</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};