/**
 * Portfolio content — copy, Google Drive asset ids and section metadata.
 * Ported from the standalone Scripteeze portfolio deck so the page can be
 * edited as data instead of markup.
 */

export interface HeroStat {
    value: string;
    label: string;
}

export interface MarqueeItem {
    label: string;
    /** Accent items are red on the black strip and carry the ✦ mark. */
    accent?: boolean;
}

export interface ServiceItem {
    icon: string;
    title: string;
    description: string;
}

export interface PortfolioVideo {
    /** Drive file id opened in the player modal. */
    driveId: string;
    /** Drive file id the still frame is pulled from — often the same file. */
    thumbId: string;
}

export interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

export interface WorkSection {
    id: string;
    tag: string;
    title: string;
    /** Italic second line of the heading. */
    titleAccent: string;
    description: string;
    badges: string[];
    videos: PortfolioVideo[];
    /** Cards per row on desktop: 5 for the reel strips, 3 for the wider grid. */
    columns: 3 | 5;
    /** Only the first section closes with the delivery-promise strip. */
    features?: FeatureItem[];
}

export interface TeamMember {
    name: string;
    role: string;
    instagram: {
        handle: string;
        url: string;
        followers?: string;
    };
    brands: string[];
}

/** A Drive still, sized for the 9:16 cards. */
export const driveThumbnail = (id: string): string =>
    `https://drive.google.com/thumbnail?id=${id}&sz=w400-h711`;

/** The embeddable player for a Drive file. */
export const drivePreview = (id: string): string =>
    `https://drive.google.com/file/d/${id}/preview`;

export const heroStats: HeroStat[] = [
    { value: '150K+', label: 'Combined Followers' },
    { value: '50+', label: 'Videos Delivered' },
    { value: '15+', label: 'Brand Collabs' },
    { value: '24H', label: 'Turnaround' },
];

export const marqueeItems: MarqueeItem[] = [
    { label: 'Video Editing', accent: true },
    { label: 'Scriptwriting' },
    { label: 'Graphic Design', accent: true },
    { label: 'Social Media Management' },
    { label: 'Content Strategy', accent: true },
    { label: 'Voice Acting' },
    { label: 'Scroll-Stopping Reels', accent: true },
    { label: 'Cinematic Storytelling' },
    { label: 'Content Shoots', accent: true },
];

export const services: ServiceItem[] = [
    {
        icon: '💬',
        title: 'Social Media Management',
        description: 'Strategic content calendars that keep your audience engaged and growing.',
    },
    {
        icon: '🎥',
        title: 'Video Editing',
        description: 'Reels, Shorts, and long-form content that stops the scroll.',
    },
    {
        icon: '📝',
        title: 'Scriptwriting',
        description: 'Words that hook in the first second and convert by the last.',
    },
    {
        icon: '🎙️',
        title: 'Voice Acting',
        description: 'Professional voiceovers that bring your scripts to life.',
    },
    {
        icon: '🖼️',
        title: 'Thumbnails & Coverpages',
        description: 'Scroll-stopping visuals that demand attention.',
    },
    {
        icon: '📷',
        title: 'Content Shoots — Bangalore',
        description:
            'Full-production shoots, on-location or in-studio across Bangalore — camera, lighting and direction handled end to end.',
    },
];

export const workSections: WorkSection[] = [
    {
        id: 'edits',
        tag: '01 — Video Edits',
        title: 'High quality edits',
        titleAccent: 'Scroll-Stopping',
        description:
            "Turning raw footage into engaging, binge-worthy videos. Every cut is intentional, every frame earns its place — edits that don't just look good, they perform.",
        badges: [
            'Cinematic Quality',
            'Custom Subtitles',
            'AI Clips Integrated',
            'Aesthetic Transitions',
            'Binge-Worthy Pacing',
        ],
        columns: 5,
        videos: [
            { driveId: '1bu6ES7wvfEuUkPveMJRFTFgIlvCmTqxb', thumbId: '1gaSJk5l5kdYkbHwyDEs0hSQbnRs2YEml' },
            { driveId: '1zVHyziMO-5-xijbHY5Oe3n0qYNsdEWwb', thumbId: '1AqfWUJKdL_FfZ4cUKur1kqvi8tZgFN0a' },
            { driveId: '1y49lw9Qi33E3ryrujp3S8Bhe8dxxhkuF', thumbId: '1JGUqoqdXELO4wBj7-INBLbBDkbgstC7t' },
            { driveId: '15Q4Wd6-rn3tTX7TZ_5eGbLQNLj0E_TSD', thumbId: '1cCvIDBwU4A9zSZiUsAAlK6cBLcWUuXNJ' },
            { driveId: '1INpZuqM-zfYYMh5lLEQIbMIM47E88Ox9', thumbId: '1IDlrSRwe_7UfUo9GIJhI7uTXrwgQ17Zq' },
        ],
        features: [
            {
                icon: '⚡',
                title: 'Lightning Delivery',
                description: '24–48 hour turnaround. No chasing, no excuses.',
            },
            {
                icon: '✏️',
                title: 'Easy Revisions',
                description: "Quick, comfortable changes — until it's perfect.",
            },
            {
                icon: '🎬',
                title: 'Cinematic Quality',
                description: "Every frame treated like it's on the big screen.",
            },
            {
                icon: '📈',
                title: 'Built to Perform',
                description: 'Content designed to earn attention, not just look good.',
            },
        ],
    },
    {
        id: 'studio',
        tag: '02 — Studio Work',
        title: 'Fresh from',
        titleAccent: 'the studio',
        description:
            'A new chapter — cinematic, high-production edits crafted for a brand new studio setup. Elevated visuals, tighter storytelling, and a whole new level of quality.',
        badges: [
            'Studio-Grade Production',
            'Cinematic Colour Grade',
            'High-End Editing',
            'Brand New Work',
        ],
        columns: 5,
        videos: [
            { driveId: '1NTqj1lTsmNJUwWYkYZVURhI4Ij6hs2vB', thumbId: '1NTqj1lTsmNJUwWYkYZVURhI4Ij6hs2vB' },
            { driveId: '1Vl0MAjxb34ZEeb92muAsETa614tTkVd5', thumbId: '1Vl0MAjxb34ZEeb92muAsETa614tTkVd5' },
            { driveId: '1HsznNf_x6fcTLc3RvwYFffoza_jV-qAJ', thumbId: '1HsznNf_x6fcTLc3RvwYFffoza_jV-qAJ' },
            { driveId: '10rQ1PnmTTGbR90W86NVGFcD_r7snmcRB', thumbId: '10rQ1PnmTTGbR90W86NVGFcD_r7snmcRB' },
            { driveId: '16_JIq3vW72wEWuOQACP1IawX2fXzzL06', thumbId: '16_JIq3vW72wEWuOQACP1IawX2fXzzL06' },
        ],
    },
    {
        id: 'flashy',
        tag: '03 — Flashy Edits',
        title: 'Fast. Loud.',
        titleAccent: 'Unforgettable.',
        description:
            'Gen-Z energy meets professional polish. Beat-synced cuts, kinetic typography, and electric pacing — for events, brands, and creators who refuse to be ignored.',
        badges: ['Beat-Synced Cuts', 'Kinetic Typography', 'Gen-Z Aesthetic', 'Event & Brand Reels'],
        columns: 5,
        videos: [
            { driveId: '113GDhxJf91X2wDcbA-P335XZi5lHv8_A', thumbId: '113GDhxJf91X2wDcbA-P335XZi5lHv8_A' },
            { driveId: '1NtetWJd1Bm-Ot_3j8rS0VuTg_CDApfLW', thumbId: '1NtetWJd1Bm-Ot_3j8rS0VuTg_CDApfLW' },
            { driveId: '1K2R4dr7wqUovym4NYFci13WgclRfgwpD', thumbId: '1K2R4dr7wqUovym4NYFci13WgclRfgwpD' },
            { driveId: '1rXWLBx5ry0-c958GEwfn-FlvFr0FMQY8', thumbId: '1rXWLBx5ry0-c958GEwfn-FlvFr0FMQY8' },
            { driveId: '1RhE0ep6H1MT55aPcd3gJd8Es0BvG5RGC', thumbId: '1RhE0ep6H1MT55aPcd3gJd8Es0BvG5RGC' },
        ],
    },
    {
        id: 'more',
        tag: '04 — More Work',
        title: 'More from',
        titleAccent: 'our edit room',
        description:
            'A deeper look at the range — education, finance, lifestyle, events. Each edit tailored to the platform, the audience, and the message.',
        badges: [],
        columns: 3,
        videos: [
            { driveId: '1-6hu6ElO0R_gec_16NOH3QSr9yMnH447', thumbId: '1-6hu6ElO0R_gec_16NOH3QSr9yMnH447' },
            { driveId: '15Nu_GN4zWcorqbOpNFLW4LhbCsfWI534', thumbId: '15Nu_GN4zWcorqbOpNFLW4LhbCsfWI534' },
            { driveId: '100tOr-dLqCFkXHSVKUsHCAlIjRVx89gs', thumbId: '100tOr-dLqCFkXHSVKUsHCAlIjRVx89gs' },
            { driveId: '1nlaMT80cLdBnUZhNMHRCMX-Rw69GIYbu', thumbId: '1nlaMT80cLdBnUZhNMHRCMX-Rw69GIYbu' },
            { driveId: '1g1uX7allsswLz6iv4lhQB2JfpBjuPo5j', thumbId: '1g1uX7allsswLz6iv4lhQB2JfpBjuPo5j' },
            { driveId: '1Hvo4uTE-nxGNaLbPGNgx8ICmAn5Y9l9_', thumbId: '1Hvo4uTE-nxGNaLbPGNgx8ICmAn5Y9l9_' },
        ],
    },
];

/** Section 05 — thumbnail and coverpage design stills. */
export const designThumbnails: string[] = [
    '1gaSJk5l5kdYkbHwyDEs0hSQbnRs2YEml',
    '1IDlrSRwe_7UfUo9GIJhI7uTXrwgQ17Zq',
    '1JGUqoqdXELO4wBj7-INBLbBDkbgstC7t',
    '1AqfWUJKdL_FfZ4cUKur1kqvi8tZgFN0a',
    '1cCvIDBwU4A9zSZiUsAAlK6cBLcWUuXNJ',
    '15R5X9P-fDheYjbq9T7uDyoF6TUjcLm-5',
    '1PfTq1TVeuh-82aXk0zABQJ9aOBaYTPQQ',
    '1oDIcHfyFhnH4J5gBcjWRCeFbzlynbZ1t',
    '1SLRFbH4YrZzMoiuRXss2h5-GPfbh-pud',
    '1ICqDA_70NXXSAHsUKW_g79Gv9A1tis08',
    '1Xlss-fTaoChLN9e-lfbYyHFvIyYX59of',
    '1nd0kx8gEtcFzIJcOuCFYkSRavNez4H5B',
];

export const teamMembers: TeamMember[] = [
    {
        name: 'Varun B Raj',
        role: 'Creative Storyteller',
        instagram: {
            handle: '@varunraj.mp4',
            url: 'https://www.instagram.com/varunraj.mp4/',
            followers: '23K followers',
        },
        brands: ['Zomato', 'Zouk', 'Nothing', 'Nivia'],
    },
    {
        name: 'Vikshitha V',
        role: 'Content Creator',
        instagram: {
            handle: '@vikshitha_v',
            url: 'https://www.instagram.com/vikshitha_v/',
            followers: '114K followers',
        },
        brands: ['Blinkit', 'Mars', 'Faces Canada', 'Uber', 'Croma'],
    },
    {
        name: 'Sindhur Sai Anne',
        role: 'Creative Editor',
        instagram: {
            handle: '@sindhur_7812',
            url: 'https://www.instagram.com/sindhur_7812/',
        },
        brands: ['Royal Enfield', 'KTM', 'Benelli', 'Bajaj'],
    },
];

export const fitItems: string[] = [
    'Brands serious about growth',
    'Founders who value storytelling',
    'Teams who want consistency, not chaos',
    'Businesses ready to invest in quality',
];
