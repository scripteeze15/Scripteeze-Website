/**
 * Header - Fixed navigation with portfolio button
 */

import { useEffect, useState } from 'react';
import './Header.css';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="header__container">
                {/* Logo */}
                <a href="#hero" className="header__logo">
                    <img
                        src="/scripteeze-logo.png"
                        alt="SCRIPTEEZE"
                        className="header__logo-image"
                    />
                    <span className="header__logo-text">SCRIPTEEZE</span>
                </a>

                {/* Navigation */}
                <nav className="header__nav">
                    <a
                        href="/portfolio.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header__nav-link header__portfolio"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        <span>Portfolio</span>
                    </a>
                    <button onClick={scrollToContact} className="header__cta btn btn-primary">
                        Get in Touch
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
