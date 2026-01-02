/**
 * Footer - Minimal footer with back-to-top functionality
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../../utils/animations';
import './Footer.css';

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const backToTopRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        // Animate footer on scroll
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.footer__content',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 90%',
                    },
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        if (prefersReducedMotion()) {
            window.scrollTo({ top: 0 });
            return;
        }

        gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: 0 },
            ease: 'power3.inOut',
        });
    };

    // Show/hide back to top button based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const button = backToTopRef.current;
            if (!button) return;

            if (window.scrollY > window.innerHeight * 0.5) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer ref={footerRef} className="footer">
            <div className="container">
                <div className="footer__content">
                    {/* Logo */}
                    <div className="footer__logo">
                        <span className="footer__logo-text">SCRIPTEEZE</span>
                    </div>

                    {/* Divider */}
                    <div className="footer__divider" />

                    {/* Copyright & Back to Top */}
                    <div className="footer__bottom">
                        <p className="footer__copyright">
                            © {currentYear} Scripteeze. All rights reserved.
                        </p>

                        <button
                            ref={backToTopRef}
                            className="footer__back-to-top"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                        >
                            <span>Back to Top</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <line x1="12" y1="19" x2="12" y2="5" />
                                <polyline points="5 12 12 5 19 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
