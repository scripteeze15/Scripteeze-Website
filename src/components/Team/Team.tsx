/**
 * Team Section - Creator showcase with premium card design
 * Images as background in top half with gradient fade
 * Grayscale by default, colored on hover
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { prefersReducedMotion, easings } from '../../utils/animations';
import './Team.css';

interface Creator {
    id: string;
    name: string;
    role: string;
    expertise: string[];
    image: string;
    instagram: {
        handle: string;
        followers?: string; // Optional - won't show if not provided
    };
}

const creators: Creator[] = [
    {
        id: 'varun',
        name: 'Varun B Raj',
        role: 'Creative Storyteller',
        expertise: [
            'Social Media Management',
            'Storytelling',
            'Scriptwriting',
            'Video Editing',
            'Voice Acting',
            'Videography',
            'Thumbnail/Coverpage Design',
        ],
        image: '/team/varun.jpg',
        instagram: {
            handle: '@varunraj.mp4',
            followers: '24K',
        },
    },
    {
        id: 'vikshitha',
        name: 'Vikshitha V',
        role: 'Content Creator',
        expertise: [
            'Social Media Management',
            'Video Editing',
            'Scriptwriting',
            'Content Creation',
            'Voice Acting',
        ],
        image: '/team/vikshitha.jpg',
        instagram: {
            handle: '@vikshitha_v',
            followers: '116K',
        },
    },
    {
        id: 'sindhur',
        name: 'Sindhur Sai Anne',
        role: 'Creative Editor',
        expertise: [
            'Social Media Management',
            'Video Editing',
            'Videography',
            'Photography',
            'Thumbnail/Coverpage Design',
        ],
        image: '/team/sindhur.jpg',
        instagram: {
            handle: '@sindhur_7812',
        },
    },
];

const Team: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const { ref: triggerRef, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

    useEffect(() => {
        if (!isInView || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

            // Header animation
            tl.fromTo(
                '.team__header',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8 }
            );

            // Cards stagger
            const cards = cardsContainerRef.current?.querySelectorAll('.creator-card');
            if (cards) {
                tl.fromTo(
                    cards,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
                    0.3
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isInView]);

    // Card hover animation
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion()) return;

        const card = e.currentTarget;
        gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion()) return;

        const card = e.currentTarget;
        gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
        });
    };

    return (
        <section id="team" ref={sectionRef} className="team section">
            <div ref={triggerRef}>
                <div className="container">
                    {/* Header */}
                    <div className="team__header">
                        <span className="team__label">The Team</span>
                        <h2 className="team__title">
                            Meet the <span className="text-gradient">creators</span>
                        </h2>
                        <p className="team__subtitle">
                            People who understand content because they've built audiences themselves.
                        </p>
                    </div>

                    {/* Cards Container - Centered Grid */}
                    <div ref={cardsContainerRef} className="team__cards-container">
                        {creators.map((creator) => (
                            <div
                                key={creator.id}
                                className="creator-card"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Image Background - Top Half */}
                                <div className="creator-card__image-container">
                                    <img
                                        src={creator.image}
                                        alt={creator.name}
                                        className="creator-card__image"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="creator-card__gradient" />
                                </div>

                                {/* Card Content - Bottom Half */}
                                <div className="creator-card__content">
                                    <div className="creator-card__info">
                                        <h3 className="creator-card__name">{creator.name}</h3>
                                        <span className="creator-card__role">{creator.role}</span>
                                    </div>

                                    {/* Instagram Badge */}
                                    <a
                                        href={`https://instagram.com/${creator.instagram.handle.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="creator-card__instagram"
                                    >
                                        <div className="creator-card__instagram-left">
                                            <div className="creator-card__instagram-icon">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                            <span className="creator-card__instagram-handle">{creator.instagram.handle}</span>
                                        </div>
                                        {creator.instagram.followers && (
                                            <div className="creator-card__instagram-followers">
                                                <span>{creator.instagram.followers}</span>
                                            </div>
                                        )}
                                    </a>

                                    {/* Expertise */}
                                    <ul className="creator-card__expertise">
                                        {creator.expertise.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Hover Glow */}
                                <div className="creator-card__glow" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
