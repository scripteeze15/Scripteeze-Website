/**
 * PortfolioPhilosophy - White panel that breaks up the red, split heading/body.
 */

const PortfolioPhilosophy: React.FC = () => (
    <section className="pf-philosophy">
        <div className="pf-philosophy__inner">
            <div className="pf-reveal">
                <span className="pf-pill">Our Philosophy</span>
                <h2 className="pf-philosophy__heading">
                    Real creators.
                    <em>real results.</em>
                </h2>
            </div>

            <div className="pf-philosophy__body pf-reveal">
                <p>Scripteeze isn&apos;t run by marketers who studied social media.</p>
                <p>
                    It&apos;s built by creators who <strong>grew on it</strong>.
                </p>
                <div className="pf-quote">
                    We don&apos;t follow trends — we understand why they work.
                </div>
            </div>
        </div>
    </section>
);

export default PortfolioPhilosophy;
