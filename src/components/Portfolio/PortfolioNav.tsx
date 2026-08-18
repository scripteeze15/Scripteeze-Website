/**
 * PortfolioNav - The deck's own compact bar: logo home, one call to action.
 */

import Link from 'next/link';

const PortfolioNav: React.FC = () => (
    <nav className="pf-nav">
        <Link href="/" className="pf-logo" aria-label="SCRIPTEEZE home">
            <img src="/scripteeze-logo.png" alt="SCRIPTEEZE" className="pf-logo-img" />
        </Link>
        <a href="mailto:info@scripteeze.in" className="pf-nav-cta">
            Work With Us
        </a>
    </nav>
);

export default PortfolioNav;
