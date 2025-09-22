# Choisis ton nom préféré et remplace "daily-games"
npx create-next-app@latest daily-games --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd daily-games


__Dependencies__

rss-parser : Parser les flux RSS facilement
date-fns : Manipulation des dates (plus léger que moment.js)
uuid : Générer des IDs uniques pour les articles
prettier : Formatage automatique du code

# Dépendances pour RSS parsing et gestion des dates
npm install rss-parser date-fns uuid

# Types TypeScript pour les dépendances
npm install -D @types/uuid

# Prettier pour le code formatting (optionnel mais recommandé)
npm install -D prettier eslint-config-prettier


__Architecture__

# Dans le dossier daily-games, créer toute l'architecture
mkdir -p src/Components/{UI,Layout,Features}
mkdir -p src/Lib/{RSS,Utils,Constants}
mkdir -p src/Types
mkdir -p src/Hooks
mkdir -p src/Services
mkdir -p src/Models
