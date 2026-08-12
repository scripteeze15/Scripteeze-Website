import React, { useState, useEffect } from 'react';
import './Mascot.css';

// Using a 5x2 sprite sheet (10 frames total)
const TOTAL_FRAMES = 10;

// Quotes the mascot might say
const QUOTES = [
    "Need more red?",
    "Let's build stories!",
    "Looking sharp today.",
    "Bored? Let's scroll!",
    "That's some good copy."
];

const Mascot: React.FC = () => {
    const [frame, setFrame] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        // Occasionally blink or change expression randomly
        const interval = setInterval(() => {
            // Give 20% chance to say something while changing frame
            if (Math.random() > 0.8) {
                const randomFrame = Math.floor(Math.random() * TOTAL_FRAMES);
                setFrame(randomFrame);

                if (Math.random() > 0.5 && !isSpeaking) {
                    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
                    setIsSpeaking(true);
                    setTimeout(() => setIsSpeaking(false), 3000);
                }
            } else {
                // Otherwise just look around by picking a random frame (0, 1, 2 = mostly normal)
                const safeFrames = [0, 1, 2, 7];
                setFrame(safeFrames[Math.floor(Math.random() * safeFrames.length)]);
            }
        }, 3500);

        return () => clearInterval(interval);
    }, [isSpeaking]);

    const handleClick = () => {
        // Change to a surprised or excited frame on click (e.g. frame 4,5,6)
        const activeFrames = [4, 5, 8];
        setFrame(activeFrames[Math.floor(Math.random() * activeFrames.length)]);
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 2500);
    };

    const handleMouseEnter = () => {
        // Change frame to something looking up or curious (e.g. 6 or 2)
        setFrame(Math.random() > 0.5 ? 2 : 6);
    };

    return (
        <div
            className={`mascot ${isSpeaking ? 'mascot--speaking' : ''}`}
            data-frame={frame}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            aria-hidden="true"
        >
            <div className="mascot__sprite-layer"></div>
            <div className="mascot__bubble">{quote}</div>
        </div>
    );
};

export default Mascot;
