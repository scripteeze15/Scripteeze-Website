/**
 * PortfolioHero - Full-height opener with the studio's headline stats.
 * The staggered entrance is pure CSS (pf-fade-up), so nothing waits on JS.
 */

import { heroStats } from './portfolio-data';

const PortfolioHero: React.FC = () => (
    <div className="pf-hero">
        <div className="pf-hero__bg" />
        <div className="pf-hero__grid" />

        <div className="pf-hero__content">
            <p className="pf-hero__eyebrow">✦ Content Studio · Bangalore ✦</p>

            <h1>
                We don&apos;t chase
                <span className="pf-hero__script">Attention</span>
                We earn it
            </h1>

            <p className="pf-hero__tagline">
                Shoots, edits, design, strategy — built by creators who believe content should earn
                attention, not chase it.
            </p>

            <div className="pf-hero__stats">
                {heroStats.map((stat) => (
                    <div key={stat.label}>
                        <div className="pf-stat__num">{stat.value}</div>
                        <div className="pf-stat__label">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default PortfolioHero;
