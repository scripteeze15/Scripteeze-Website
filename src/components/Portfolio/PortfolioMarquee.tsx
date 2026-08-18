/**
 * PortfolioMarquee - Scrolling capability strip.
 * The track is rendered twice because the keyframes translate it by -50%;
 * one copy would leave a gap halfway through the loop.
 */

import { marqueeItems } from './portfolio-data';

const PortfolioMarquee: React.FC = () => (
    <div className="pf-marquee">
        <div className="pf-marquee__track">
            {[0, 1].map((copy) =>
                marqueeItems.map((item) => (
                    <span
                        key={`${copy}-${item.label}`}
                        className={`pf-marquee__item ${item.accent ? 'pf-marquee__item--accent' : ''}`}
                        aria-hidden={copy === 1}
                    >
                        {item.accent ? `✦ ${item.label}` : item.label}
                    </span>
                ))
            )}
        </div>
    </div>
);

export default PortfolioMarquee;
