import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { locales, type Locale } from '../i18n';

const inter = Inter({ subsets: ['latin'] });

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://daily-games.eu';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    metadataBase: new URL(APP_URL),
    title: {
      default: isFr ? 'Daily Games - Toute l\'actu gaming en un seul endroit' : 'Daily Games - All your gaming news in one tab',
      template: '%s | Daily Games',
    },
    description: isFr
      ? 'Daily Games agrège en temps réel l\'actualité gaming depuis 20+ sources : retro, homebrew, nextgen. Zéro bruit, 100% signal.'
      : 'Daily Games aggregates real-time gaming news from 20+ sources: retro, homebrew, next-gen. Zero noise, 100% signal.',
    alternates: {
      canonical: `${APP_URL}/${lang}`,
      languages: { fr: `${APP_URL}/fr`, en: `${APP_URL}/en` },
    },
    openGraph: {
      title: isFr ? 'Daily Games - Toute l\'actu gaming en un seul endroit' : 'Daily Games - All your gaming news in one tab',
      description: isFr ? 'Agrégateur gaming en temps réel : 20+ sources, zéro bruit.' : 'Real-time gaming aggregator: 20+ sources, zero noise.',
      url: `${APP_URL}/${lang}`,
      siteName: 'Daily Games',
      locale: isFr ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 629, alt: 'Daily Games' }],
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
