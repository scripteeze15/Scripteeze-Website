/**
 * PortfolioDesign - Section 05: thumbnail and coverpage stills, no player.
 */

import { designThumbnails, driveThumbnail } from './portfolio-data';

const badges = ['Instant Click Appeal', 'High CTR Design', 'Platform-Optimised', 'Bold Typography'];

const PortfolioDesign: React.FC = () => (
    <section id="thumbnails" className="pf-section">
        <div className="pf-reveal">
            <p className="pf-section-tag">05 — Graphic Design</p>
            <h2 className="pf-section-title">
                Design that
                <em>Demands the click</em>
            </h2>
            <p className="pf-section-desc">
                Thumbnails, covers, social posts — the first frame is everything. Bold,
                high-contrast design built to earn the click, not beg for it.
            </p>
            <div className="pf-badges">
                {badges.map((badge) => (
                    <span key={badge} className="pf-badge">
                        ✓ {badge}
                    </span>
                ))}
            </div>
        </div>

        <div className="pf-thumb-grid">
            {designThumbnails.map((id) => (
                <div key={id} className="pf-thumb-item pf-reveal">
                    <img src={driveThumbnail(id)} alt="Scripteeze thumbnail design" loading="lazy" />
                    <div className="pf-thumb-overlay">
                        <span>Thumbnail Design</span>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default PortfolioDesign;
