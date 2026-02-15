import React, { useState } from 'react';
import { Button } from '../Button';

export const InquiryForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-seafoam/10 p-12 rounded-3xl text-center">
        <h3 className="text-2xl font-serif text-stone mb-4">Thank you for your interest.</h3>
        <p className="text-stone/70">A member of our corporate wellness team will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto bg-cream p-8 md:p-12 rounded-3xl shadow-sm border border-stone/5">
      <div className="grid grid-cols-1 gap-6">
        <input 
          type="text" 
          placeholder="Company Name" 
          required 
          className="w-full px-6 py-4 bg-white rounded-full border border-stone/10 focus:outline-none focus:border-seafoam transition-colors"
        />
        <input 
          type="email" 
          placeholder="Work Email" 
          required 
          className="w-full px-6 py-4 bg-white rounded-full border border-stone/10 focus:outline-none focus:border-seafoam transition-colors"
        />
        <textarea 
          placeholder="Tell us about your team's needs..." 
          rows={4}
          className="w-full px-6 py-4 bg-white rounded-2xl border border-stone/10 focus:outline-none focus:border-seafoam transition-colors"
        ></textarea>
      </div>
      <Button type="submit" fullWidth>Send Inquiry</Button>
    </form>
  );
};
