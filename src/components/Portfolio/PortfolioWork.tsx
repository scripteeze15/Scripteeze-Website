/**
 * PortfolioWork - One numbered work section: header, badges, and a grid of
 * 9:16 stills that open the Drive player. Rendered once per entry in
 * workSections, so all four reel sections share this markup.
 */

import { driveThumbnail, type WorkSection } from './portfolio-data';

interface PortfolioWorkProps {
    section: WorkSection;
    /** Hands the clicked Drive file id up to the page's player. */
    onPlay: (driveId: string) => void;
}

const PortfolioWork: React.FC<PortfolioWorkProps> = ({ section, onPlay }) => (
    <section id={section.id} className="pf-section">
        <div className="pf-reveal">
            <p className="pf-section-tag">{section.tag}</p>
            <h2 className="pf-section-title">
                {section.title}
                <em>{section.titleAccent}</em>
            </h2>
            <p className="pf-section-desc">{section.description}</p>

            {section.badges.length > 0 && (
                <div className="pf-badges">
                    {section.badges.map((badge) => (
                        <span key={badge} className="pf-badge">
                            ✓ {badge}
                        </span>
                    ))}
                </div>
            )}
        </div>

        <div className={`pf-video-grid pf-video-grid--${section.columns}`}>
            {section.videos.map((video, index) => (
                <button
                    key={video.driveId}
                    type="button"
                    className="pf-video-card pf-reveal"
                    onClick={() => onPlay(video.driveId)}
                    aria-label={`Play ${section.title} sample ${index + 1}`}
                >
                    <img
                        className="pf-video-card__thumb"
                        src={driveThumbnail(video.thumbId)}
                        alt=""
                        loading="lazy"
                    />
                    <span className="pf-video-card__overlay" />
                    <span className="pf-play-btn">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                    <span className="pf-video-card__info">
                        <span className="pf-video-card__num">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </span>
                </button>
            ))}
        </div>

        {section.features && (
            <div className="pf-features pf-reveal">
                {section.features.map((feature) => (
                    <div key={feature.title} className="pf-feature">
                        <div className="pf-feature__icon" aria-hidden="true">
                            {feature.icon}
                        </div>
                        <div className="pf-feature__title">{feature.title}</div>
                        <div className="pf-feature__desc">{feature.description}</div>
                    </div>
                ))}
            </div>
        )}
    </section>
);

export default PortfolioWork;
