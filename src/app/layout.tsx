import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
    title: "SCRIPTEEZE - We Build Stories That Sell",
    description:
        "A creator-first social media agency built to win on today's platforms. We build stories that sell through social media management, video editing, scriptwriting, and more.",
    keywords: "social media agency, content creation, video editing, scriptwriting, branding, creative strategy",
    authors: [{ name: "SCRIPTEEZE" }],
    openGraph: {
        title: "SCRIPTEEZE - We Build Stories That Sell",
        description: "A creator-first social media agency built to win on today's platforms.",
        url: "https://scripteeze.in",
        siteName: "SCRIPTEEZE",
        images: ["/scripteeze-logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SCRIPTEEZE - We Build Stories That Sell",
        description: "A creator-first social media agency built to win on today's platforms.",
        images: ["/scripteeze-logo.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/scripteeze-logo.png" />
                <link rel="apple-touch-icon" href="/scripteeze-logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@1,400;1,500;1,600&family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
