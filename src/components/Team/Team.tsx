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
