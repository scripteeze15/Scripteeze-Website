/**
 * /portfolio - The work deck. Kept as a server component so the route can own
 * its metadata; the interactive page itself is the Portfolio client component.
 */

import type { Metadata } from 'next';
import Portfolio from '../../components/Portfolio/Portfolio';

export const metadata: Metadata = {
    title: 'Portfolio - SCRIPTEEZE',
    description:
        'Selected work from SCRIPTEEZE — scroll-stopping reels, studio edits, flashy event films and thumbnail design, made by a creator-led content studio in Bangalore.',
    alternates: {
        canonical: '/portfolio',
    },
    openGraph: {
        title: 'Portfolio - SCRIPTEEZE',
        description:
            'Selected work from SCRIPTEEZE — reels, studio edits, event films and thumbnail design from a creator-led content studio in Bangalore.',
        url: '/portfolio',
        siteName: 'SCRIPTEEZE',
        images: ['/scripteeze-logo.png'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio - SCRIPTEEZE',
        description: 'Selected work from SCRIPTEEZE — a creator-led content studio in Bangalore.',
        images: ['/scripteeze-logo.png'],
    },
};

export default function PortfolioPage() {
    return <Portfolio />;
}
