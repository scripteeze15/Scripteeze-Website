/**
 * Experience Section - Authority and expertise showcase
 * Animated bullet points with cinematic reveal
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { prefersReducedMotion, easings } from '../../utils/animations';
import './Experience.css';

const experiencePoints = [
    {
        id: 'studied',
        title: 'Studied platform behavior',
        description: 'Deep understanding of how algorithms prioritize content',
    },
    {
        id: 'tested',
        title: 'Tested what holds attention',
        description: 'Hundreds of hours learning what makes viewers stay',
    },
    {
        id: 'learned',
        title: 'Learned why content spreads',
        description: 'The psychology behind shares, saves, and viral moments',
    },
];

const Experience: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { ref: triggerRef, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    useEffect(() => {
        if (!isInView || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

            // Headline animation
            tl.fromTo(
                '.experience__headline',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.9 }
            );

            // Experience points with stagger
            const points = sectionRef.current?.querySelectorAll('.experience__point');
            if (points) {
                tl.fromTo(
                    points,
                    { opacity: 0, x: -40 },
                    { opacity: 1, x: 0, duration: 0.7, stagger: 0.2 },
                    0.4
                );
            }

            // Animate the lines
            const lines = sectionRef.current?.querySelectorAll('.experience__point-line');
            if (lines) {
                tl.fromTo(
                    lines,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.8, stagger: 0.2 },
                    0.6
                );
            }

            // Closing line
            tl.fromTo(
                '.experience__closing',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                1.2
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isInView]);

    return (
        <section id="experience" ref={sectionRef} className="experience section">
            <div className="container">
                <div ref={triggerRef} className="experience__content">
                    {/* Background Accent */}
                    <div className="experience__accent" />

                    {/* Headline */}
                    <h2 className="experience__headline">
                        Experience beats<br />
                        <span className="script-accent text-gradient">experimentation.</span>
                    </h2>

                    {/* Points */}
                    <div className="experience__points">
                        {experiencePoints.map((point, index) => (
                            <div key={point.id} className="experience__point">
                                <div className="experience__point-number">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div className="experience__point-content">
                                    <h3 className="experience__point-title">{point.title}</h3>
                                    <p className="experience__point-description">{point.description}</p>
                                </div>
                                <div className="experience__point-line" />
                            </div>
                        ))}
                    </div>

                    {/* Closing Statement */}
                    <div className="experience__closing">
                        <p>You get <strong>execution</strong> — not trial and error.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
