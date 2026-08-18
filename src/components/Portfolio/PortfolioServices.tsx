/**
 * PortfolioServices - Black panel listing what the studio sells.
 */

import { services } from './portfolio-data';

const PortfolioServices: React.FC = () => (
    <section className="pf-services">
        <div className="pf-services__header pf-reveal">
            <span className="pf-pill">What We Offer</span>
            <h2 className="pf-section-title">
                Services built for
                <em>creators</em>
            </h2>
            <p className="pf-section-desc">
                Everything you need to dominate social media, all under one roof.
            </p>
        </div>

        <div className="pf-services__grid">
            {services.map((service) => (
                <div key={service.title} className="pf-service-card pf-reveal">
                    <div className="pf-service-card__icon" aria-hidden="true">
                        {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
            ))}
        </div>

        <div className="pf-execution pf-reveal">
            You get <strong>execution</strong> — not trial and error.
        </div>
    </section>
);

export default PortfolioServices;
