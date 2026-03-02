import React from 'react';
import { CuratedCalmHero } from '../components/curated-calm/CuratedCalmHero';
import { ArchitectureOfHealing } from '../components/curated-calm/ArchitectureOfHealing';
import { InHomeFeatures } from '../components/curated-calm/InHomeFeatures';
import { ShareTheStillness } from '../components/curated-calm/ShareTheStillness';
import { MembershipTiers } from '../components/curated-calm/MembershipTiers';
import { AvailabilityScarcity } from '../components/curated-calm/AvailabilityScarcity';
import { CuratedCalmCTA } from '../components/curated-calm/CuratedCalmCTA';

export const CuratedCalmPage: React.FC = () => {
    return (
        <div className="bg-cream selection:bg-seafoam/20 selection:text-stone">
            <CuratedCalmHero />
            <ArchitectureOfHealing />
            <InHomeFeatures />
            <ShareTheStillness />

            {/* Pricing & Scarcity */}
            <section className="py-20 md:py-40 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
                        <div className="lg:col-span-2">
                            <MembershipTiers />
                        </div>
                        <div>
                            <AvailabilityScarcity />
                        </div>
                    </div>
                </div>
            </section>

            <CuratedCalmCTA />
        </div>
    );
};

export default CuratedCalmPage;
