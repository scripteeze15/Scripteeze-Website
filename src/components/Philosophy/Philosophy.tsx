/**
 * Philosophy Section - Enhanced with decorative elements
 * Split layout with animated dividers and quote marks
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { prefersReducedMotion, easings } from '../../utils/animations';
import './Philosophy.css';

const Philosophy: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const { ref: contentRef, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    useEffect(() => {
        if (!isInView || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

            // Animate quote mark
            tl.fromTo(
                '.philosophy__quote-mark',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.08, scale: 1, duration: 1 }
            );

            // Animate divider lines
            const dividers = dividerRef.current?.querySelectorAll('.philosophy__divider-line');
            if (dividers) {
                tl.fromTo(
                    dividers,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 1, stagger: 0.2 },
                    0.2
                );
            }

            // Animate headline
            tl.fromTo(
                '.philosophy__headline',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8 },
                0.3
            );

            // Animate copy paragraphs
            const paragraphs = sectionRef.current?.querySelectorAll('.philosophy__copy p');
            if (paragraphs) {
                tl.fromTo(
                    paragraphs,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
                    0.6
                );
            }

            // Animate accent shapes
            tl.fromTo(
                '.philosophy__accent-shape',
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2 },
                0.8
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isInView]);

    return (
        <section id="philosophy" ref={sectionRef} className="philosophy section">
            {/* Decorative Elements */}
            <div className="philosophy__quote-mark">"</div>
            <div className="philosophy__accent-shape philosophy__accent-shape--1" />
            <div className="philosophy__accent-shape philosophy__accent-shape--2" />

            <div className="container">
                <div ref={contentRef} className="philosophy__content">
                    {/* Decorative Dividers */}
                    <div ref={dividerRef} className="philosophy__dividers">
                        <div className="philosophy__divider-line philosophy__divider-line--1" />
                        <div className="philosophy__divider-line philosophy__divider-line--2" />
                    </div>

                    {/* Split Layout */}
                    <div className="philosophy__grid">
                        {/* Left Side - Headline */}
                        <div className="philosophy__left">
                            <span className="philosophy__label">Our Philosophy</span>
                            <h2 className="philosophy__headline">
                                Real creators.<br />
                                Real <span className="script-accent text-gradient">results.</span>
                            </h2>
                        </div>

                        {/* Right Side - Copy */}
                        <div className="philosophy__right">
                            <div className="philosophy__copy">
                                <p>
                                    Scripteeze isn't run by marketers who studied social media.
                                </p>
                                <p>
                                    It's built by people who <strong>grew on it</strong>.
                                </p>
                                <p className="philosophy__emphasis">
                                    We don't follow trends — we understand why they work.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Divider */}
                    <div className="philosophy__divider-line philosophy__divider-line--bottom" />
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
