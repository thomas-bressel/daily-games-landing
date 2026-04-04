export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const t = {
  fr: {
    nav: {
      install: 'Installer l\'extension',
      privacy: 'Confidentialité',
      label: 'Navigation principale',
      skipToContent: 'Aller au contenu',
    },
    hero: {
      badge: 'Extension navigateur · Gratuite',
      title: 'Toute TON actu gaming.',
      titleSub: 'En un onglet.',
      subtitle: 'Trop de sources, pas assez de temps. Daily Games agrège 35+ flux gaming dans ton nouvel onglet — rétro, indie, next-gen — sans algo, sans pub, sans compte.',
      ctaChrome: 'Installer sur Chrome',
      ctaFirefox: 'Installer sur Firefox',
      donate: 'Soutenir le projet',
    },
    features: [
      { title: 'Flux en temps réel', desc: '35+ sources agrégées et mises à jour automatiquement.' },
      { title: 'Filtres par univers', desc: 'Rétro, indie, homebrew, next-gen. 35+ sources présélectionnées, zéro configuration.' },
      { title: 'Bookmarks Chrome', desc: 'Sauvegardez vos articles directement dans vos favoris Chrome.' },
      { title: 'Privé par défaut', desc: 'Aucun compte, aucun tracking. Vos données restent sur votre machine.' },
    ],
    sources: {
      title: 'Sources agrégées',
      suggest: 'Une source manque ?',
      suggestLink: 'Suggérer une source →',
      suggestLinkText: 'Suggérer une source',
    },
    roadmap: {
      title: 'C\'est une v1.0',
      subtitle: 'L\'extension est fonctionnelle et stable. Des améliorations arrivent.',
      items: [
        { label: 'Choisir ses propres sources', note: 'Activer / désactiver chaque flux individuellement' },
        { label: 'Filtres par langue', note: 'Afficher uniquement les sources FR ou EN' },
        { label: 'Mode lecture', note: 'Lire un article directement dans l\'extension' },
      ],
    },
    screenshot: {
      title: 'Votre nouvel onglet, réinventé.',
      subtitle: 'Un flux propre, des filtres accessibles, vos bookmarks à portée de main.',
      alt: 'Screenshot de l\'extension Daily Games',
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          q: 'Comment installer Daily Games ?',
          a: 'Clique sur "Installer sur Chrome" ou "Installer sur Firefox", confirme l\'installation, puis ouvre un nouvel onglet — Daily Games s\'affiche automatiquement.',
        },
        {
          q: 'Sur quels navigateurs ça fonctionne ?',
          a: 'Daily Games fonctionne sur Chrome, Firefox, LibreWolf, Edge et Brave. Il n\'est pas compatible avec Opera, Vivaldi et Safari.',
        },
        {
          q: 'L\'extension ne s\'affiche pas dans mon nouvel onglet ?',
          a: 'Une autre extension contrôle peut-être ton nouvel onglet (Speed Dial, Momentum…). Désactive-la temporairement pour laisser Daily Games s\'afficher.',
        },
        {
          q: 'Ça fonctionne sur mobile ?',
          a: 'Non, les extensions navigateur ne sont pas supportées sur mobile. Daily Games est uniquement disponible sur navigateur desktop.',
        },
      ],
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
      label: 'Main navigation',
      skipToContent: 'Skip to content',
    },
    hero: {
      badge: 'Browser Extension · Free',
      title: 'All your gaming news.',
      titleSub: 'One tab.',
      subtitle: 'Too many sources, not enough time. Daily Games aggregates 35+ gaming feeds into your new tab — retro, indie, next-gen — no algorithm, no ads, no account.',
      ctaChrome: 'Install on Chrome',
      ctaFirefox: 'Install on Firefox',
      donate: 'Support the project',
    },
    features: [
      { title: 'Real-time feed', desc: '35+ sources aggregated and updated automatically.' },
      { title: 'Filter by universe', desc: 'Retro, indie, homebrew, next-gen. 35+ curated sources, zero configuration.' },
      { title: 'Chrome bookmarks', desc: 'Save articles directly to your Chrome bookmarks.' },
      { title: 'Private by default', desc: 'No account, no tracking. Your data stays on your machine.' },
    ],
    sources: {
      title: 'Aggregated sources',
      suggest: 'Missing a source?',
      suggestLink: 'Suggest a source →',
      suggestLinkText: 'Suggest a source',
    },
    roadmap: {
      title: 'This is v1.0',
      subtitle: 'The extension is fully functional. More is coming.',
      items: [
        { label: 'Choose your own sources', note: 'Enable / disable each feed individually' },
        { label: 'Language filter', note: 'Show only FR or EN sources' },
        { label: 'Reader mode', note: 'Read an article directly inside the extension' },
      ],
    },
    screenshot: {
      title: 'Your new tab, reinvented.',
      subtitle: 'Clean feed, accessible filters, bookmarks at hand.',
      alt: 'Daily Games extension screenshot',
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          q: 'How do I install Daily Games?',
          a: 'Click "Install on Chrome" or "Install on Firefox", confirm the installation, then open a new tab — Daily Games appears automatically.',
        },
        {
          q: 'Which browsers are supported?',
          a: 'Daily Games works on Chrome, Firefox, LibreWolf, Edge and Brave. It is not compatible with Opera, Vivaldi and Safari.',
        },
        {
          q: 'The extension doesn\'t show up in my new tab?',
          a: 'Another extension may be controlling your new tab (Speed Dial, Momentum…). Disable it temporarily to let Daily Games appear.',
        },
        {
          q: 'Does it work on mobile?',
          a: 'No, browser extensions are not supported on mobile. Daily Games is only available on desktop browsers.',
        },
      ],
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
