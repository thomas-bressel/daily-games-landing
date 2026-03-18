import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://daily-games.fr';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Daily Games - Toute l\'actu gaming en un seul endroit',
    template: '%s | Daily Games',
  },
  description:
    'Daily Games agrège en temps réel l\'actualité gaming depuis 100+ sources : sorties, tests, rétro, esport. Zero bullshit, 100% signal.',
  keywords: [
    'actualité gaming',
    'news jeux vidéo',
    'agrégateur gaming',
    'jeux vidéo',
    'esport',
    'retro gaming',
    'amstrad cpc',
    'daily games',
  ],
  authors: [{ name: 'Daily Games', url: APP_URL }],
  creator: 'Daily Games',
  publisher: 'Daily Games',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Daily Games - Toute l\'actu gaming en un seul endroit',
    description:
      'Agrégateur gaming en temps réel : 100+ sources, zéro bruit. L\'essentiel du gaming, maintenant.',
    url: APP_URL,
    siteName: 'Daily Games',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 629,
        alt: 'Daily Games - Toute l\'actu gaming en un seul endroit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Games - Toute l\'actu gaming en un seul endroit',
    description:
      'Agrégateur gaming en temps réel : 100+ sources, zéro bruit. L\'essentiel du gaming, maintenant.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: APP_URL,
    types: {
      'application/rss+xml': `${APP_URL}/api/rss`,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  category: 'gaming',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00FF88',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Daily Games',
  url: APP_URL,
  description:
    'Agrégateur d\'actualités gaming en temps réel depuis 100+ sources.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${APP_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Daily Games',
    url: APP_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${APP_URL}/logo-title.png`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="msapplication-TileColor" content="#00FF88" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#00FF88] text-black px-4 py-2 rounded-md z-50"
        >
          Aller au contenu principal
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
