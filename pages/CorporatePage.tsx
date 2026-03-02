import React, { useEffect } from 'react';
import { CorporateHero } from '../components/corporate/CorporateHero';
import { ClientLogos } from '../components/corporate/ClientLogos';
import { ServiceList } from '../components/corporate/ServiceList';
import { CorporateTestimonials } from '../components/corporate/CorporateTestimonials';
import { CorporateCTA } from '../components/corporate/CorporateCTA';
import { InquiryForm } from '../components/corporate/InquiryForm';

export const CorporatePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <main>
        <CorporateHero />
        <ClientLogos />
        <ServiceList />
        <CorporateTestimonials />

        <section className="py-24 bg-white" id="inquire">
          <CorporateCTA />
          <InquiryForm />
        </section>
      </main>
    </div>
  );
};

export default CorporatePage;
