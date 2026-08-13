/**
 * FinalCTA Section - Enhanced dramatic full-screen closing
 * Contact information with animated background and particles
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { prefersReducedMotion, easings } from '../../utils/animations';
import './FinalCTA.css';

const FinalCTA: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const logoWatermarkRef = useRef<HTMLDivElement>(null);
    const { ref: triggerRef, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    useEffect(() => {
        if (!isInView || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

            // Watermark fade in
            tl.fromTo(
                logoWatermarkRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 0.04, scale: 1, duration: 1.5 }
            );

            // Decorative rings
            tl.fromTo(
                '.final-cta__ring',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2, stagger: 0.2 },
                0.3
            );

            // Headline reveal
            const words = sectionRef.current?.querySelectorAll('.final-cta__headline .word');
            if (words) {
                tl.fromTo(
                    words,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
                    0.5
                );
            }

            // Contact info
            tl.fromTo(
                '.final-cta__contact-item',
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
                0.9
            );

            // CTA button
            tl.fromTo(
                '.final-cta__button',
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.6 },
                1.2
            );

            // Bottom text
            tl.fromTo(
                '.final-cta__tagline',
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                1.4
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isInView]);

    // Parallax effect on watermark
    useEffect(() => {
        if (prefersReducedMotion() || !logoWatermarkRef.current) return;

        const handleScroll = () => {
            const section = sectionRef.current;
            const watermark = logoWatermarkRef.current;
            if (!section || !watermark) return;

            const rect = section.getBoundingClientRect();
            const scrollProgress = -rect.top / window.innerHeight;
            const rotation = scrollProgress * 10;

            gsap.set(watermark, {
                rotation: rotation,
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headline = "Let's Create Something Amazing Together.";

    return (
        <section id="final-cta" ref={sectionRef} className="final-cta section">
            {/* Background Elements */}
            <div className="final-cta__background">
                <div className="final-cta__gradient-1" />
                <div className="final-cta__gradient-2" />
                <div ref={logoWatermarkRef} className="final-cta__watermark">
                    <img
                        src="/scripteeze-logo.png"
                        alt=""
                        className="final-cta__watermark-image"
                    />
                </div>

                {/* Decorative Rings */}
                <div className="final-cta__ring final-cta__ring--1" />
                <div className="final-cta__ring final-cta__ring--2" />
                <div className="final-cta__ring final-cta__ring--3" />
            </div>

            <div className="container">
                <div ref={triggerRef} className="final-cta__content">
                    {/* Label */}
                    <span className="final-cta__label">Ready to grow?</span>

                    {/* Headline */}
                    <h2 className="final-cta__headline">
                        {headline.split(' ').map((word, index) => (
                            <span key={index} className={`word ${word === 'Amazing' ? 'script-accent' : ''}`}>
                                {word}
                                {index < headline.split(' ').length - 1 && ' '}
                            </span>
                        ))}
                    </h2>

                    {/* Contact Information */}
                    <div className="final-cta__contact">
                        <a href="mailto:info@scripteeze.in" className="final-cta__contact-item final-cta__email">
                            <div className="final-cta__contact-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <span>info@scripteeze.in</span>
                        </a>
                        <a
                            href="https://instagram.com/scripteeze"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="final-cta__contact-item final-cta__instagram"
                        >
                            <div className="final-cta__contact-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </div>
                            <span>@scripteeze</span>
                        </a>
                    </div>

                    {/* CTA Button */}
                    <a href="mailto:info@scripteeze.in" className="btn btn-primary btn-glow final-cta__button">
                        <span>Start the Conversation</span>
                        <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>

                    {/* Tagline */}
                    <p className="final-cta__tagline">
                        Let's turn your content into a growth engine.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
