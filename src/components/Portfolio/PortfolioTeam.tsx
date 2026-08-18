/**
 * PortfolioTeam - Section 06: the three creators, their reach, and the brands
 * they have shipped work for.
 */

import { teamMembers } from './portfolio-data';

const instagramIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const PortfolioTeam: React.FC = () => (
    <section id="team" className="pf-section">
        <div className="pf-reveal">
            <p className="pf-section-tag">06 — The Team</p>
            <h2 className="pf-section-title">
                Real creators.
                <em>Real results.</em>
            </h2>
            <p className="pf-section-desc">
                Scripteeze isn&apos;t run by marketers who studied social media — it&apos;s built by
                creators who grew on it. Experience beats theory. Always.
            </p>
        </div>

        <div className="pf-team-grid">
            {teamMembers.map((member) => (
                <div key={member.name} className="pf-team-card pf-reveal">
                    <div className="pf-team-card__name">{member.name}</div>
                    <div className="pf-team-card__role">{member.role}</div>

                    <a
                        href={member.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pf-team-card__ig"
                    >
                        {instagramIcon}
                        {member.instagram.followers
                            ? `${member.instagram.handle} · ${member.instagram.followers}`
                            : member.instagram.handle}
                    </a>

                    <div className="pf-brands-label">Worked With</div>
                    <div className="pf-brand-pills">
                        {member.brands.map((brand) => (
                            <span key={brand} className="pf-brand-pill">
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default PortfolioTeam;
