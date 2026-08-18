/**
 * Portfolio - The full portfolio deck as a page.
 *
 * Owns the two pieces of state the sections share: which video the player is
 * showing, and the reveal-on-scroll observer that fades sections in.
 */
'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../utils/animations';
import { workSections } from './portfolio-data';
import PortfolioNav from './PortfolioNav';
import PortfolioHero from './PortfolioHero';
import PortfolioMarquee from './PortfolioMarquee';
import PortfolioPhilosophy from './PortfolioPhilosophy';
import PortfolioServices from './PortfolioServices';
import PortfolioWork from './PortfolioWork';
import PortfolioDesign from './PortfolioDesign';
import PortfolioTeam from './PortfolioTeam';
import PortfolioFit from './PortfolioFit';
import PortfolioCTA from './PortfolioCTA';
import PortfolioFooter from './PortfolioFooter';
import VideoModal from './VideoModal';
import './Portfolio.css';

const Portfolio: React.FC = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    // One observer for every .pf-reveal element on the page — the sections are
    // static markup, so a single sweep after mount is enough.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const targets = Array.from(root.querySelectorAll<HTMLElement>('.pf-reveal'));

        if (prefersReducedMotion()) {
            targets.forEach((target) => target.classList.add('pf-reveal--visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('pf-reveal--visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        targets.forEach((target) => observer.observe(target));

        return () => observer.disconnect();
    }, []);

    // Hold the page still behind the player, and let Escape dismiss it.
    useEffect(() => {
        if (activeVideoId === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setActiveVideoId(null);
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeVideoId]);

    const closePlayer = useCallback(() => setActiveVideoId(null), []);

    return (
        <div className="portfolio" ref={rootRef}>
            <PortfolioNav />

            <main>
                <PortfolioHero />
                <PortfolioMarquee />
                <PortfolioPhilosophy />
                <PortfolioServices />

                {workSections.map((section) => (
                    <Fragment key={section.id}>
                        <PortfolioWork section={section} onPlay={setActiveVideoId} />
                        <div className="pf-divider" />
                    </Fragment>
                ))}

                <PortfolioDesign />
                <PortfolioTeam />
                <PortfolioFit />
                <PortfolioCTA />
            </main>

            <PortfolioFooter />

            <VideoModal videoId={activeVideoId} onClose={closePlayer} />
        </div>
    );
};

export default Portfolio;
