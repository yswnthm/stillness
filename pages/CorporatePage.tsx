import React, { useEffect } from 'react';
import { ServiceList } from '../components/corporate/ServiceList';
import { ClientLogos } from '../components/corporate/ClientLogos';
import { InquiryForm } from '../components/corporate/InquiryForm';
import { CorporateTestimonials } from '../components/corporate/CorporateTestimonials';

export const CorporatePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <div className="pt-32 pb-20 text-center bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-seafoam text-sm uppercase tracking-[0.3em] font-bold mb-6 block">Stillness for Business</span>
          <h1 className="text-4xl md:text-7xl font-serif text-stone mb-8">Nervous System Regulation for High-Performing Teams.</h1>
          <p className="text-stone/60 text-xl font-light max-w-2xl mx-auto">
            Shift from burnout to brilliance. Our scientifically-backed protocols help teams recover faster and create deeper.
          </p>
        </div>
      </div>
      
      <ClientLogos />
      <ServiceList />
      <CorporateTestimonials />
      
      <section className="py-24 bg-white" id="inquire">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-stone mb-6">Start a Conversation</h2>
          <p className="text-stone/60 text-lg font-light">Custom programs tailored to your organization's unique rhythm.</p>
        </div>
        <InquiryForm />
      </section>
    </div>
  );
};
