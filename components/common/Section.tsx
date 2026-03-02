import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  className = '', 
  children, 
  fullWidth = false 
}) => {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {children}
        </div>
      )}
    </section>
  );
};
