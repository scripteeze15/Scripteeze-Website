/**
 * Hero Section - Full viewport with enhanced animated background
 * Word-by-word text animation, floating shapes, and CTAs
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion, easings } from '../../utils/animations';
import './Hero.css';

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const noiseRef = useRef<HTMLDivElement>(null);

    const headline = "We Build Stories That Sell.";

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            // Create master timeline
            const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

            // Noise animation
            if (noiseRef.current) {
                gsap.to(noiseRef.current, {
                    backgroundPosition: '0% 0%, 100% 100%',
                    duration: 20,
                    repeat: -1,
                    ease: 'none',
                });
            }

            // Animate floating shapes
            gsap.utils.toArray('.hero__shape').forEach((shape) => {
                gsap.to(shape as HTMLElement, {
                    y: 'random(-30, 30)',
                    x: 'random(-20, 20)',
                    rotation: 'random(-15, 15)',
                    duration: 'random(4, 8)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            });

            // Logo reveal
            tl.fromTo(
                logoRef.current,
                { opacity: 0, scale: 0.8, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 1 },
                0.3
            );

            // Headline word-by-word animation
            const words = headlineRef.current?.querySelectorAll('.word');
            if (words) {
                tl.fromTo(
                    words,
                    { opacity: 0, y: 60, rotateX: -15 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 0.8,
                        stagger: 0.12,
                    },
                    0.6
                );
            }

            // Subtext fade in
            tl.fromTo(
                subtextRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                1.4
            );

            // CTA buttons
            const buttons = ctaRef.current?.querySelectorAll('.btn');
            if (buttons) {
                tl.fromTo(
                    buttons,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
                    1.7
                );
            }

            // Animate decorative lines
            tl.fromTo(
                '.hero__decorative-line',
                { scaleX: 0 },
                { scaleX: 1, duration: 1.2, stagger: 0.2 },
                1.5
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToWork = () => {
        const servicesSection = document.getElementById('services');
        servicesSection?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" ref={heroRef} className="hero">
            {/* Animated Background */}
            <div className="hero__background">
                <div className="hero__gradient-orb hero__gradient-orb--1" />
                <div className="hero__gradient-orb hero__gradient-orb--2" />
                <div className="hero__gradient-orb hero__gradient-orb--3" />
                <div ref={noiseRef} className="hero__noise" />
                <div className="hero__lines" />

                {/* Floating Shapes */}
                <div className="hero__shape hero__shape--1" />
                <div className="hero__shape hero__shape--2" />
                <div className="hero__shape hero__shape--3" />
                <div className="hero__shape hero__shape--4" />
                <div className="hero__shape hero__shape--5" />
            </div>

            {/* Decorative Lines */}
            <div className="hero__decorative-line hero__decorative-line--top-left" />
            <div className="hero__decorative-line hero__decorative-line--top-right" />
            <div className="hero__decorative-line hero__decorative-line--bottom" />

            <div className="container hero__container">
                {/* Logo */}
                <div ref={logoRef} className="hero__logo">
                    <img
                        src="/scripteeze-logo.png"
                        alt="SCRIPTEEZE Logo"
                        className="hero__logo-image"
                    />
                </div>

                {/* Headline */}
                <h1 ref={headlineRef} className="hero__headline">
                    {headline.split(' ').map((word, index) => (
                        <span key={index} className={`word ${word.replace('.', '') === 'Stories' ? 'script-accent' : ''}`}>
                            {word}
                            {index < headline.split(' ').length - 1 && ' '}
                        </span>
                    ))}
                </h1>

                {/* Subtext */}
                <p ref={subtextRef} className="hero__subtext">
                    A creator-first social media agency built to win on today's platforms.
                </p>

                {/* CTAs */}
                <div ref={ctaRef} className="hero__cta">
                    <button className="btn btn-primary btn-glow" onClick={scrollToContact}>
                        <span>Let's Create</span>
                        <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                    <button className="btn btn-secondary" onClick={scrollToWork}>
                        What We Offer
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
