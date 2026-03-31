import { locales, type Locale, getT } from '../i18n';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/daily-games/cenlpcopnpmmhcbkjpdebmfbanjlcnda';
const FIREFOX_STORE_URL = 'https://addons.mozilla.org/fr/firefox/addon/dailygames/';

const SOURCES = [
  // Next-Gen & Pro
  'Jeux Video.com', 'Game Kult', 'Canard PC', 'Xbox Gamer', 'Puissance Nintendo', 'Origami', 'VGC', 'GamesRadar+', 'Le Bistro du jeu vidéo', 'Sega-Mag', 'Factor News', 'Jeux On Line',
  // Retro Gaming
  'Recalbox', 'Association MO5', 'Rom Game', 'Abandonware France', 'Back in Toys TV', 'Conkerax', 'Old School Is Beautifull', 'Le joueur du grenier', 'Passion Jeux Vidéo TV', 'Retrogamer', 'Reddit Retrogaming',
  // Indie & Découvertes
  'IndieMag', 'At0mium', 'Indie Retro News', 'Indie DB', 'Itch.io News',
  // Homebrew & Tech
  'Wololo.net', 'Retro RGB', 'GBAtemp', 'Scene World',
  // Machines
  'Amstrad.eu', 'Vretro Computing', 'Atari Legend', 'Amiga Impact',
];

export default async function LandingPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const tr = getT(lang);
  const otherLang = lang === 'fr' ? 'en' : 'fr';

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">

      {/* Skip link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#00FF41] focus:text-black focus:px-4 focus:py-2 focus:rounded focus:font-mono focus:text-sm">
        {tr.nav.skipToContent}
      </a>

      {/* Header */}
      <header className="bg-[#000000] border-b border-[#404040] px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-between">
          <img src="/logo-title.png" alt="Daily Games" className="h-12 w-auto" />
          <nav aria-label={tr.nav.label} className="flex items-center gap-6">
            <a href={`/${otherLang}`} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'} className="text-[#A0A0A0] hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">
              {otherLang}
            </a>
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border border-[#4285F4] text-[#4285F4] px-4 py-2 rounded-lg text-sm font-mono hover:bg-[#4285F4] hover:text-white transition-colors">
              <img src="/img/devicon--chrome.svg" alt="" className="h-4 w-auto" />
              Chrome
            </a>
            <a href={FIREFOX_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border border-[#FF7139] text-[#FF7139] px-4 py-2 rounded-lg text-sm font-mono hover:bg-[#FF7139] hover:text-white transition-colors">
              <img src="/img/logos--firefox.svg" alt="" className="h-4 w-auto" />
              Firefox
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative px-6 py-24 border-b border-[#404040] overflow-hidden">
        {/* Background logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img src="/file.svg" alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
        </div>
        {/* Gradient overlay: theme green left → red right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a0f]/80 via-transparent to-[#3a0010]/80 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block border border-[#156262] text-[#00FF41] text-xs font-mono px-3 py-1 rounded mb-8">
            {tr.hero.badge}
          </span>
          <h1 id="hero-title" className="text-5xl md:text-6xl font-bold mb-4 leading-tight scanline" style={{ fontFamily: 'Space Grotesk Medium, sans-serif' }}>
            <span className="glitch text-warp" data-text={tr.hero.title}>{tr.hero.title}</span><br />
            <span className="text-[#00FF41] glitch text-warp" data-text={tr.hero.titleSub}>{tr.hero.titleSub}</span>
          </h1>
          <p className="text-[#A0A0A0] text-lg md:text-xl mb-10 max-w-2xl leading-relaxed" style={{ fontFamily: 'Inter Medium, sans-serif' }}>
            {tr.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#4285F4] text-[#4285F4] px-8 py-3 rounded-lg font-mono text-sm font-bold hover:bg-[#4285F4] hover:text-white transition-colors"
            >
              <img src="/img/devicon--chrome.svg" alt="" className="h-5 w-auto" />
              {tr.hero.ctaChrome}
            </a>
            <a
              href={FIREFOX_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#FF7139] text-[#FF7139] px-8 py-3 rounded-lg font-mono text-sm font-bold hover:bg-[#FF7139] hover:text-white transition-colors"
            >
              <img src="/img/logos--firefox.svg" alt="" className="h-5 w-auto" />
              {tr.hero.ctaFirefox}
            </a>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=PW6CXDP49HF5L"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tr.hero.donate} (${lang === 'fr' ? 'nouvel onglet' : 'new tab'})`}
              className="inline-flex items-center justify-center gap-2 border border-[#2790c3] text-[#2790c3] px-8 py-3 rounded-lg font-mono text-sm font-bold hover:bg-[#2790c3] hover:text-white transition-colors"
            >
              <img src="/img/logos--paypal.svg" alt="" className="h-4 w-auto" />
              {tr.hero.donate}
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-label={lang === 'fr' ? 'Fonctionnalités' : 'Features'} className="bg-[#000000] px-6 py-20 border-b border-[#404040]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tr.features.map((feature, i) => (
            <div key={i} className="bg-[#2D2D2D] border border-[#156262] rounded-2xl p-6 hover:border-[#00FF41] transition-colors">
              <h2 className="text-white font-bold mb-2 text-sm" style={{ fontFamily: 'Space Grotesk Medium, sans-serif' }}>
                {feature.title}
              </h2>
              <p className="text-[#A0A0A0] text-sm leading-relaxed" style={{ fontFamily: 'Inter Medium, sans-serif' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshot */}
      <section className="px-6 py-20 border-b border-[#404040]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk Medium, sans-serif' }}>
              {tr.screenshot.title}
            </h2>
            <p className="text-[#A0A0A0]" style={{ fontFamily: 'Inter Medium, sans-serif' }}>
              {tr.screenshot.subtitle}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#ff00ff]">
            <img src="/img/screenshot.png" alt={tr.screenshot.alt} className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="px-6 py-16 border-b border-[#404040]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-mono text-[#A0A0A0] uppercase tracking-widest mb-6">
            {tr.sources.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((source) => (
              <span
                key={source}
                className="border border-[#156262] text-[#A0A0A0] text-xs font-mono px-3 py-1.5 rounded-lg hover:border-[#00FF41] hover:text-white transition-colors"
              >
                {source}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs font-mono text-[#A0A0A0]">
            {tr.sources.suggest}{' '}
            <a
              href="mailto:contact@daily-games.eu?subject=Suggestion%20de%20source&body=Nom%20de%20la%20source%20%3A%0AURL%20du%20flux%20RSS%20%3A%0ACat%C3%A9gorie%20%3A%20r%C3%A9tro%20%2F%20indie%20%2F%20homebrew%20%2F%20next-gen"
              className="text-[#00FF41] hover:underline"
            >
              {tr.sources.suggestLinkText}<span aria-hidden="true"> →</span>
            </a>
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-6 py-16 border-b border-[#404040]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-mono text-[#A0A0A0] uppercase tracking-widest mb-2">
            {tr.roadmap.title}
          </h2>
          <p className="text-[#A0A0A0] text-sm mb-8" style={{ fontFamily: 'Inter Medium, sans-serif' }}>
            {tr.roadmap.subtitle}
          </p>
          <ul className="flex flex-col gap-3">
            {tr.roadmap.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#00FF41] font-mono text-xs mt-0.5" aria-hidden="true">→</span>
                <div>
                  <span className="text-white text-sm font-bold" style={{ fontFamily: 'Space Grotesk Medium, sans-serif' }}>{item.label}</span>
                  <span className="text-[#A0A0A0] text-sm font-mono ml-2"><span aria-hidden="true">— </span>{item.note}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#000000] px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <img src="/logo-title.png" alt="" className="h-12 w-auto"/>
            <span className="text-[#A0A0A0] text-xs font-mono hidden md:block">{tr.footer.tagline}</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-[#A0A0A0]">
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=PW6CXDP49HF5L"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tr.footer.donate} (${lang === 'fr' ? 'nouvel onglet' : 'new tab'})`}
              className="flex items-center gap-2 border border-[#2790c3] text-[#2790c3] px-3 py-1.5 rounded-lg hover:bg-[#2790c3] hover:text-white transition-colors"
            >
              <img src="/img/logos--paypal.svg" alt="" className="h-4 w-auto" />
              {tr.footer.donate}
            </a>
            <a href={`/${lang}/privacy`} className="hover:text-[#00FF41] transition-colors">{tr.footer.privacy}</a>
            <a href={`/${otherLang}`} aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'} className="hover:text-white transition-colors uppercase tracking-widest">{otherLang}</a>
            <span>{tr.footer.rights}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
