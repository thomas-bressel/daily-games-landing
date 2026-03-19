import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Games',
  description: 'Daily Games - Your gaming news feed in one tab.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
