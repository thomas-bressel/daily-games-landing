import { locales, type Locale } from '../../i18n';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const content = {
  fr: {
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : 19 mars 2026',
    back: '← Retour',
    sections: [
      {
        title: '1. Présentation',
        body: 'Daily Games est une extension Chrome qui remplace votre nouvel onglet par un flux d\'actualités gaming. Nous nous engageons à protéger votre vie privée.',
      },
      {
        title: '2. Données collectées',
        body: 'L\'extension stocke les données suivantes localement sur votre appareil via chrome.storage.local :',
        list: [
          'Préférences de filtre — la source ou catégorie sélectionnée.',
          'Bookmarks — les articles sauvegardés (titre, lien, source, date).',
        ],
        note: 'Ces données ne quittent jamais votre appareil.',
      },
      {
        title: '3. Compteurs anonymes',
        body: 'Lorsque vous bookmarkez ou partagez un article, un compteur anonyme est incrémenté sur notre serveur (api.daily-games.eu). Aucune information personnelle, adresse IP ou identifiant n\'est stocké.',
      },
      {
        title: '4. Partage des données',
        body: 'Nous ne vendons ni ne partageons aucune donnée. La seule requête externe est vers api.daily-games.eu pour récupérer les articles et mettre à jour les compteurs.',
      },
      {
        title: '5. Permission Bookmarks',
        body: 'La permission bookmarks est utilisée uniquement lorsque vous cliquez explicitement sur le bouton bookmark. Nous ne lisons ni n\'accédons à vos favoris existants.',
      },
      {
        title: '6. Conservation',
        body: 'Les données locales persistent jusqu\'à la désinstallation. Vous pouvez les effacer via Chrome → Extensions → Daily Games → Effacer les données.',
      },
      {
        title: '7. Contact',
        body: 'Pour toute question :',
        email: 'contact@daily-games.eu',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: March 19, 2026',
    back: '← Back',
    sections: [
      {
        title: '1. Overview',
        body: 'Daily Games is a Chrome extension that replaces your new tab with a gaming news feed. We are committed to protecting your privacy.',
      },
      {
        title: '2. Data Collected',
        body: 'The extension stores the following data locally on your device using chrome.storage.local:',
        list: [
          'Filter preferences — the feed source or category you have selected.',
          'Bookmarks — saved articles (title, link, source, date).',
        ],
        note: 'This data never leaves your device.',
      },
      {
        title: '3. Anonymous Counters',
        body: 'When you bookmark or share an article, an anonymous counter is incremented on our server (api.daily-games.eu). No personal information, IP address, or identifier is stored.',
      },
      {
        title: '4. Data Sharing',
        body: 'We do not sell or share any data. The only external request is to api.daily-games.eu to fetch articles and update anonymous counters.',
      },
      {
        title: '5. Bookmarks Permission',
        body: 'The bookmarks permission is used only when you explicitly click the bookmark button. We do not read or access your existing bookmarks.',
      },
      {
        title: '6. Retention',
        body: 'Locally stored data persists until uninstallation. You can clear it via Chrome → Extensions → Daily Games → Clear data.',
      },
      {
        title: '7. Contact',
        body: 'For any questions:',
        email: 'contact@daily-games.eu',
      },
    ],
  },
};

export default async function PrivacyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const c = content[lang] ?? content.en;

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href={`/${lang}`} className="text-[#00FF41] text-xs font-mono hover:underline mb-10 inline-block">
          {c.back}
        </a>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk Medium, sans-serif' }}>{c.title}</h1>
        <p className="text-[#404040] text-xs font-mono mb-12">{c.updated}</p>

        <div className="space-y-10">
          {c.sections.map((section, i) => (
            <div key={i} className="border-t border-[#404040] pt-8">
              <h2 className="text-sm font-mono text-[#707070] uppercase tracking-widest mb-3">{section.title}</h2>
              <p className="text-[#707070] leading-relaxed text-sm" style={{ fontFamily: 'Inter Medium, sans-serif' }}>{section.body}</p>
              {'list' in section && section.list && (
                <ul className="mt-3 space-y-1 list-disc list-inside text-[#707070] text-sm">
                  {section.list.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
              {'note' in section && section.note && (
                <p className="mt-3 text-[#404040] text-xs font-mono">{section.note}</p>
              )}
              {'email' in section && section.email && (
                <a href={`mailto:${section.email}`} className="text-[#00FF41] text-sm font-mono hover:underline mt-2 inline-block">
                  {section.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
