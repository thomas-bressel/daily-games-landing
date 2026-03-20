# Daily Games — Landing Page

Landing page officielle de l'extension Chrome **Daily Games**.
Official landing page for the **Daily Games** Chrome extension.

🌐 [daily-games.eu](https://www.daily-games.eu)

---

## FR — Français

Landing page statique du projet Daily Games — une extension Chrome qui agrège 20+ flux gaming (rétro, indie, homebrew, next-gen) dans ton nouvel onglet. Sans algo, sans pub, sans compte.

### Stack

- **Next.js** (App Router, static export)
- **Tailwind CSS**
- **i18n** maison — FR / EN via `src/app/i18n.ts`
- Déployé via **Docker + Nginx** sur VPS

### Structure

```
src/
└── app/
    ├── [lang]/
    │   ├── page.tsx        → Page principale (hero, features, sources, roadmap)
    │   └── privacy/        → Page confidentialité
    ├── i18n.ts             → Traductions FR/EN
    └── layout.tsx          → Layout global
```

### Développement

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Build statique dans /out
```

### Déploiement

Le build est conteneurisé et déployé via Ansible sur un VPS.
Le dossier `out/` est servi par Nginx en static.

---

## EN — English

Static landing page for the Daily Games project — a Chrome extension that aggregates 20+ gaming feeds (retro, indie, homebrew, next-gen) into your new tab. No algorithm, no ads, no account.

### Stack

- **Next.js** (App Router, static export)
- **Tailwind CSS**
- **Homemade i18n** — FR / EN via `src/app/i18n.ts`
- Deployed via **Docker + Nginx** on a VPS

### Structure

```
src/
└── app/
    ├── [lang]/
    │   ├── page.tsx        → Main page (hero, features, sources, roadmap)
    │   └── privacy/        → Privacy policy page
    ├── i18n.ts             → FR/EN translations
    └── layout.tsx          → Global layout
```

### Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Static build output in /out
```

### Deployment

The build is containerized and deployed via Ansible on a VPS.
The `out/` folder is served as static files by Nginx.

---

Built for gamers, by a gamer.
