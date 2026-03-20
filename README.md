# Daily Games — Landing Page

Landing page officielle de l'extension Chrome **Daily Games**.

🌐 [daily-games.eu](https://www.daily-games.eu)

---

## Stack

- **Next.js** (App Router, static export)
- **Tailwind CSS**
- **i18n** maison — FR / EN via `src/app/i18n.ts`
- Déployé via **Docker + Nginx** sur VPS

## Structure

```
src/
└── app/
    ├── [lang]/
    │   ├── page.tsx        → Page principale (hero, features, sources, roadmap)
    │   └── privacy/        → Page confidentialité
    ├── i18n.ts             → Traductions FR/EN
    └── layout.tsx          → Layout global
```

## Développement

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Build statique dans /out
```

## Déploiement

Le build est conteneurisé et déployé via Ansible sur un VPS.
Le dossier `out/` est servi par Nginx en static.

---

Fait pour les gamers, par un gamer.
