/**
 * PortfolioFit - Qualifier panel: who this studio is a good match for.
 */

import { fitItems } from './portfolio-data';

const PortfolioFit: React.FC = () => (
    <section className="pf-fit">
        <div className="pf-fit__inner">
            <h2 className="pf-fit__heading pf-reveal">
                We&apos;re the right fit if you want
                <em>more than output.</em>
            </h2>

            <div className="pf-fit__list pf-reveal">
                {fitItems.map((item) => (
                    <div key={item} className="pf-fit__item">
                        <span className="pf-fit__check" aria-hidden="true">
                            ✓
                        </span>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default PortfolioFit;
