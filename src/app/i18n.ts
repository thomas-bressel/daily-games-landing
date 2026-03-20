export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const t = {
  fr: {
    nav: {
      install: 'Installer l\'extension',
      privacy: 'Confidentialité',
    },
    hero: {
      badge: 'Extension Chrome  -- Gratuite',
      title: 'Toute TON actu gaming.',
      titleSub: 'En un onglet.',
      subtitle: 'Daily Games remplace votre nouvel onglet par un flux d\'actualités gaming agrégé depuis 20+ sources. Retrogaming, homebrew, nextgen  -- sans bruit.',
      cta: 'Installer l\'extension',
      ctaSub: 'Chrome Web Store  -- gratuit',
      donate: 'Soutenir le projet',
    },
    features: [
      { title: 'Flux en temps réel', desc: '20+ sources agrégées et mises à jour automatiquement.' },
      { title: 'Filtres par univers', desc: 'Amstrad CPC, Atari ST, Retrogaming, Homebrew, NextGen.' },
      { title: 'Bookmarks Chrome', desc: 'Sauvegardez vos articles directement dans vos favoris Chrome.' },
      { title: 'Privé par défaut', desc: 'Aucun compte, aucun tracking. Vos données restent sur votre machine.' },
    ],
    sources: {
      title: 'Sources agrégées',
      suggest: 'Une source manque ?',
      suggestLink: 'Suggérer une source →',
    },
    screenshot: {
      title: 'Votre nouvel onglet, réinventé.',
      subtitle: 'Un flux propre, des filtres accessibles, vos bookmarks à portée de main.',
      alt: 'Screenshot de l\'extension Daily Games',
    },
    footer: {
      tagline: 'Fait pour les gamers, par un gamer.',
      privacy: 'Confidentialité',
      rights: '© 2026 Daily Games.',
      donate: 'Soutenir le projet',
    },
  },
  en: {
    nav: {
      install: 'Install extension',
      privacy: 'Privacy',
    },
    hero: {
      badge: 'Chrome Extension  -- Free',
      title: 'All your gaming news.',
      titleSub: 'One tab.',
      subtitle: 'Daily Games replaces your new tab with a gaming news feed aggregated from 20+ sources. Retrogaming, homebrew, next-gen  -- zero noise.',
      cta: 'Install extension',
      ctaSub: 'Chrome Web Store  -- free',
      donate: 'Support the project',
    },
    features: [
      { title: 'Real-time feed', desc: '20+ sources aggregated and updated automatically.' },
      { title: 'Filter by universe', desc: 'Amstrad CPC, Atari ST, Retrogaming, Homebrew, NextGen.' },
      { title: 'Chrome bookmarks', desc: 'Save articles directly to your Chrome bookmarks.' },
      { title: 'Private by default', desc: 'No account, no tracking. Your data stays on your machine.' },
    ],
    sources: {
      title: 'Aggregated sources',
      suggest: 'Missing a source?',
      suggestLink: 'Suggest a source →',
    },
    screenshot: {
      title: 'Your new tab, reinvented.',
      subtitle: 'Clean feed, accessible filters, bookmarks at hand.',
      alt: 'Daily Games extension screenshot',
    },
    footer: {
      tagline: 'Built for gamers, by a gamer.',
      privacy: 'Privacy',
      rights: '© 2026 Daily Games.',
      donate: 'Support the project',
    },
  },
} as const;

export function getT(lang: Locale) {
  return t[lang] ?? t[defaultLocale];
}
