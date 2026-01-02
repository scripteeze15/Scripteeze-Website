/**
 * IdealClient Section - Target audience showcase
 * Clean bullet points with animated check marks
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { prefersReducedMotion, easings } from '../../utils/animations';
import './IdealClient.css';

const clientPoints = [
    'Brands serious about growth',
    'Founders who value storytelling',
    'Teams who want consistency, not chaos',
    'Businesses ready to invest in quality',
];

const IdealClient: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { ref: triggerRef, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    useEffect(() => {
        if (!isInView || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

            // Headline animation
            tl.fromTo(
                '.ideal-client__headline',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8 }
            );

            // Points with stagger
            const points = sectionRef.current?.querySelectorAll('.ideal-client__point');
            if (points) {
                tl.fromTo(
                    points,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 },
                    0.4
                );
            }

            // Animate check marks
            const checks = sectionRef.current?.querySelectorAll('.ideal-client__check-path');
            if (checks) {
                gsap.fromTo(
                    checks,
                    { strokeDashoffset: 24 },
                    { strokeDashoffset: 0, duration: 0.5, stagger: 0.15, delay: 0.8, ease: 'power2.out' }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isInView]);

    return (
        <section id="ideal-client" ref={sectionRef} className="ideal-client section">
            <div className="container">
                <div ref={triggerRef} className="ideal-client__content">
                    {/* Decorative Line */}
                    <div className="ideal-client__line-accent" />

                    {/* Grid Layout */}
                    <div className="ideal-client__grid">
                        {/* Left - Headline */}
                        <div className="ideal-client__left">
                            <h2 className="ideal-client__headline">
                                We're the right fit if you want
                                <span className="text-gradient"> more than output.</span>
                            </h2>
                        </div>

                        {/* Right - Points */}
                        <div className="ideal-client__right">
                            <ul className="ideal-client__list">
                                {clientPoints.map((point, index) => (
                                    <li key={index} className="ideal-client__point">
                                        <div className="ideal-client__check">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path
                                                    className="ideal-client__check-path"
                                                    d="M20 6L9 17l-5-5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    style={{ strokeDasharray: 24 }}
                                                />
                                            </svg>
                                        </div>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IdealClient;
