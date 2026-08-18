/**
 * PortfolioFooter - The deck's own sign-off bar.
 */

const PortfolioFooter: React.FC = () => (
    <footer className="pf-footer">
        <img src="/scripteeze-logo.png" alt="SCRIPTEEZE" className="pf-footer__logo" />
        <p>Creator-Led Content Studio · Bangalore · info@scripteeze.in</p>
        <div className="pf-footer__links">
            <a href="https://www.scripteeze.in" target="_blank" rel="noopener noreferrer">
                www.scripteeze.in
            </a>
            <a href="https://www.instagram.com/scripteeze" target="_blank" rel="noopener noreferrer">
                Instagram
            </a>
        </div>
    </footer>
);

export default PortfolioFooter;
