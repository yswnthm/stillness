import React, { useEffect } from 'react';
import { BrandStory } from '../components/about/BrandStory';
import { Timeline } from '../components/about/Timeline';
import { MissionStatement } from '../components/about/MissionStatement';
import { TeamGrid } from '../components/about/TeamGrid';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream">
      {/* Hero spacing handled by BrandStory padding or a small spacer if needed */}
      <div className="pt-20">
        <BrandStory />
        <MissionStatement />
        <Timeline />
        <TeamGrid />
      </div>
    </div>
  );
};
