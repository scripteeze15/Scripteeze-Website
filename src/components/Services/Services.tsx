/**
 * Services Section - Enhanced interactive service cards with numbers
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { prefersReducedMotion, easings } from '../../utils/animations';
import './Services.css';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const services: Service[] = [
    {
        id: 'social-media',
        title: 'Social Media Management',
        description: 'Strategic content calendars that keep your audience engaged and growing.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        ),
    },
    {
        id: 'video-editing',
        title: 'Video Editing',
        description: 'Reels, Shorts, and long-form content that stops the scroll.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
        ),
    },
    {
        id: 'scriptwriting',
        title: 'Scriptwriting',
        description: 'Words that hook in the first second and convert by the last.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
        ),
    },
    {
        id: 'voice-acting',
        title: 'Voice Acting',
        description: 'Professional voiceovers that bring your scripts to life.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
        ),
    },
    {
        id: 'thumbnails',
        title: 'Thumbnails & Coverpages',
        description: 'Scroll-stopping visuals that demand attention.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        ),
    },
    {
        id: 'branding',
        title: 'Branding & Creative Strategy',
        description: 'Build a visual identity that resonates across every platform.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    },
];

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const { ref: triggerRef, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

    useEffect(() => {
        if (!isInView || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

            // Animate header
            tl.fromTo(
                '.services__header',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8 }
            );

            // Animate decorative elements
            tl.fromTo(
                '.services__decoration',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6 },
                0.3
            );

            // Animate cards with stagger
            const cards = cardsRef.current?.querySelectorAll('.service-card');
            if (cards) {
                tl.fromTo(
                    cards,
                    { opacity: 0, y: 60, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1 },
                    0.4
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isInView]);

    // Card hover animation
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion()) return;

        const card = e.currentTarget;
        const icon = card.querySelector('.service-card__icon');
        const number = card.querySelector('.service-card__number');

        gsap.to(card, {
            y: -12,
            duration: 0.4,
            ease: 'power2.out',
        });

        gsap.to(icon, {
            scale: 1.15,
            rotate: 8,
            duration: 0.4,
            ease: 'power2.out',
        });

        gsap.to(number, {
            scale: 1.1,
            opacity: 0.15,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion()) return;

        const card = e.currentTarget;
        const icon = card.querySelector('.service-card__icon');
        const number = card.querySelector('.service-card__number');

        gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
        });

        gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: 'power2.out',
        });

        gsap.to(number, {
            scale: 1,
            opacity: 0.08,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    return (
        <section id="services" ref={sectionRef} className="services section">
            {/* Decorative Elements */}
            <div className="services__decoration services__decoration--1" />
            <div className="services__decoration services__decoration--2" />

            <div className="container">
                <div ref={triggerRef}>
                    {/* Header */}
                    <div className="services__header">
                        <span className="services__label">What We Offer</span>
                        <h2 className="services__title">
                            Services built for <span className="script-accent text-gradient">creators</span>
                        </h2>
                        <p className="services__subtitle">
                            Everything you need to dominate social media, all under one roof.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div ref={cardsRef} className="services__grid">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="service-card"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Background Number */}
                                <span className="service-card__number">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div className="service-card__glow" />
                                <div className="service-card__icon">{service.icon}</div>
                                <h3 className="service-card__title">{service.title}</h3>
                                <p className="service-card__description">{service.description}</p>

                                <div className="service-card__line" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
