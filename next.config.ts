import type { NextConfig } from 'next';

// The app runs as a custom Node server behind Hostinger's Apache/LiteSpeed
// proxy, so there is no vhost to hang response headers off — they have to come
// from Next itself.
const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // Pin the workspace root. A stray package-lock.json sits in the Windows home
    // directory, and without this Turbopack walks up past the repo and warns
    // about (or resolves against) the wrong root.
    turbopack: {
        root: import.meta.dirname,
    },

    // Don't advertise the framework and version to scanners.
    poweredByHeader: false,

    async headers() {
        return [
            { source: '/:path*', headers: securityHeaders },
            // Contact submissions are personal data. Declared after the general
            // rule so it wins for /api, and keeps the proxy from retaining them.
            {
                source: '/api/:path*',
                headers: [{ key: 'Cache-Control', value: 'no-store' }],
            },
        ];
    },
};

export default nextConfig;
