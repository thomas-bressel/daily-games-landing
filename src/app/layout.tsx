import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });


/**
 * Create Meta Data
 */
export const metadata: Metadata = {
  title: 'Daily Games - Your Retro Gaming News Hub',
  description: 'Stay updated with the latest retro gaming news, focusing on Amstrad CPC and vintage computing. Your ultimate RSS aggregator for retro gaming enthusiasts.',
  keywords: 'retro gaming, amstrad cpc, vintage computing, rss aggregator, gaming news',
  authors: [{ name: 'Daily Games Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Daily Games - Your Retro Gaming News Hub',
    description: 'Stay updated with the latest retro gaming news, focusing on Amstrad CPC and vintage computing.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Games - Your Retro Gaming News Hub',
    description: 'Stay updated with the latest retro gaming news, focusing on Amstrad CPC and vintage computing.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        
        {/* RSS Feed */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Daily Games RSS Feed" 
          href="/api/rss" 
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        
        {/* Main Application */}
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}