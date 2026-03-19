import { locales, type Locale, getT } from '../i18n';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const CHROME_STORE_URL = '#';

const SOURCES = [
  'Indie Retro News', 'MO5', 'Atariage', 'Itch.io', 'Game Radar',
  'Amstrad.eu', 'Octoate', 'Abandonware France', 'Indie DB',
  'Reddit', 'Scene World', 'Retro RGB', 'Le Bistro', 'Amstariga',
];

export default async function LandingPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const tr = getT(lang);
  const otherLang = lang === 'fr' ? 'en' : 'fr';

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">

      {/* Header */}
      <header className="bg-[#1E1E1E] border-b border-[#404040] px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <img src="/logo-title.png" alt="Daily Games" className="h-12 w-auto" />
          <div className="flex items-center gap-6">
            <a href={`/${otherLang}`} className="text-[#A0A0A0] hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">
              {otherLang}
            </a>
            <a
              href={CHROME_STORE_URL}
              className="border border-[#00FF41] text-[#00FF41] px-4 py-2 rounded-lg text-sm font-mono hover:bg-[#00FF41] hover:text-black transition-colors"
            >
              {tr.nav.install}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-24 border-b border-[#404040]">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block border border-[#156262] text-[#00FF41] text-xs font-mono px-3 py-1 rounded mb-8">
            {tr.hero.badge}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight scanline" style={{ fontFamily: 'Space Grotesk Medium, sans-serif' }}>
            <span className="glitch text-warp" data-text={tr.hero.title}>{tr.hero.title}</span><br />
            <span className="text-[#00FF41] glitch text-warp" data-text={tr.hero.titleSub}>{tr.hero.titleSub}</span>
          </h1>
          <p className="text-[#A0A0A0] text-lg md:text-xl mb-10 max-w-2xl leading-relaxed" style={{ fontFamily: 'Inter Medium, sans-serif' }}>
            {tr.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={CHROME_STORE_URL}
              className="inline-flex items-center justify-center border border-[#00FF41] bg-[#00FF41] text-black px-8 py-3 rounded-lg font-mono text-sm font-bold hover:bg-transparent hover:text-[#00FF41] transition-colors"
            >
              {tr.hero.cta}
            </a>
          </div>
          <p className="text-[#A0A0A0] text-xs font-mono mt-3">{tr.hero.ctaSub}</p>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 border-b border-[#404040]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tr.features.map((feature, i) => (
            <div key={i} className="bg-[#2D2D2D] border border-[#156262] rounded-2xl p-6 hover:border-[#00FF41] transition-colors">
              <h3 className="text-white font-bold mb-2 text-sm" style={{ fontFamily: 'Space Grotesk Medium, sans-serif' }}>
                {feature.title}
              </h3>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <img src="/logo-title.png" alt="Daily Games" className="h-12 w-auto"/>
            <span className="text-[#A0A0A0] text-xs font-mono hidden md:block">{tr.footer.tagline}</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-[#A0A0A0]">
            <a href={`/${lang}/privacy`} className="hover:text-[#00FF41] transition-colors">{tr.footer.privacy}</a>
            <a href={`/${otherLang}`} className="hover:text-white transition-colors uppercase tracking-widest">{otherLang}</a>
            <span>{tr.footer.rights}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
