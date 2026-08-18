/**
 * PortfolioCTA - Closing pitch with the concentric-arc corner motif.
 */

const arcRadii = [40, 65, 90, 115, 140, 165];

const PortfolioCTA: React.FC = () => (
    <div className="pf-cta">
        <div className="pf-arcs pf-arcs--tl" aria-hidden="true">
            <svg viewBox="0 0 200 200">
                <g fill="none" stroke="#fff" strokeWidth="1">
                    {arcRadii.map((radius) => (
                        <circle key={radius} cx="0" cy="0" r={radius} />
                    ))}
                </g>
            </svg>
        </div>

        <h2 className="pf-reveal">
            Let&apos;s create
            <span>Something</span>
            Amazing
        </h2>

        <p className="pf-reveal">
            Every brand has a story. Most just don&apos;t know how to tell it. Let&apos;s build
            content people can&apos;t ignore — content that earns attention.
        </p>

        <div className="pf-cta__btns pf-reveal">
            <a href="mailto:info@scripteeze.in" className="pf-btn-primary">
                Email Us
            </a>
            <a
                href="https://www.instagram.com/scripteeze"
                target="_blank"
                rel="noopener noreferrer"
                className="pf-btn-secondary"
            >
                @scripteeze
            </a>
            <a
                href="https://www.scripteeze.in"
                target="_blank"
                rel="noopener noreferrer"
                className="pf-btn-secondary"
            >
                Visit Website
            </a>
        </div>
    </div>
);

export default PortfolioCTA;
