import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { OfferingsHero } from '../components/offerings/OfferingsHero';
import { SacredPhilosophy } from '../components/offerings/SacredPhilosophy';
import { CuratedCalmOffering } from '../components/offerings/CuratedCalmOffering';
import { StillnessHabitOffering } from '../components/offerings/StillnessHabitOffering';
import { SensoryPath } from '../components/offerings/SensoryPath';
import { DayInStillness } from '../components/offerings/DayInStillness';
import { OfferingsCTA } from '../components/offerings/OfferingsCTA';

export const SacredOfferingsPage: React.FC = () => {
    const { hash } = useLocation();
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Initialize Intersection Observer for reveals
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observerRef.current?.observe(el));

        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }

        return () => observerRef.current?.disconnect();
    }, [hash]);

    return (
        <div className="min-h-screen bg-white text-stone overflow-hidden">
            <style>
                {`
                    .reveal {
                        opacity: 0;
                        transform: translateY(30px);
                        transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                    }
                    .reveal.is-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    .reveal-delay-1 { transition-delay: 0.2s; }
                    .reveal-delay-2 { transition-delay: 0.4s; }
                    .reveal-delay-3 { transition-delay: 0.6s; }
                    
                    .parallax-bg {
                        transition: transform 0.5s cubic-bezier(0.1, 0, 0.3, 1);
                    }
                    
                    .curtain-reveal {
                        position: relative;
                        overflow: hidden;
                    }
                    .curtain-reveal::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: #1D3152;
                        transform: translateX(0);
                        transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1);
                        z-index: 2;
                    }
                    .curtain-reveal.is-visible::after {
                        transform: translateX(101%);
                    }

                    @keyframes breathe {
                        0%, 100% { transform: scale(1); opacity: 0.3; }
                        50% { transform: scale(1.1); opacity: 0.5; }
                    }
                    .animate-breathe {
                        animation: breathe 8s ease-in-out infinite;
                    }

                    .custom-grid-bg {
                        background-image: radial-gradient(#688F9D 0.5px, transparent 0.5px);
                        background-size: 40px 40px;
                        opacity: 0.1;
                    }
                `}
            </style>

            <OfferingsHero />
            <SacredPhilosophy />

            <section id="memberships" className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <CuratedCalmOffering />
                    <SensoryPath />
                    <StillnessHabitOffering />
                </div>
            </section>

            <DayInStillness />
            <OfferingsCTA />
        </div>
    );
};

export default SacredOfferingsPage;
