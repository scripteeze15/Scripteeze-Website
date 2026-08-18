/**
 * VideoModal - Drive preview player for a work card.
 *
 * The overlay stays mounted so it can fade, and the iframe src is cleared on
 * close, which is what stops playback. While closed the close button is taken
 * out of the tab order — the overlay is invisible, so it must not be reachable.
 */

import { drivePreview } from './portfolio-data';

interface VideoModalProps {
    /** Drive file id of the open video, or null when the player is closed. */
    videoId: string | null;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
    const isOpen = videoId !== null;

    return (
        <div
            className={`pf-modal ${isOpen ? 'pf-modal--active' : ''}`}
            onClick={(event) => {
                // Only a click on the backdrop itself closes the player.
                if (event.target === event.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Work sample player"
        >
            <div className="pf-modal__inner">
                <button
                    type="button"
                    className="pf-modal__close"
                    onClick={onClose}
                    tabIndex={isOpen ? 0 : -1}
                    aria-label="Close player"
                >
                    ✕
                </button>
                <iframe
                    title="Scripteeze work sample"
                    src={isOpen ? drivePreview(videoId) : ''}
                    allow="autoplay"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default VideoModal;
