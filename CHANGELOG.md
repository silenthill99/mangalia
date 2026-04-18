# Changelog

Trace des modifications apportées au projet.

## 2026-04-19

### `resources/js/pages/welcome.tsx` — Refonte CSS thème animé/manga

Passage de l'ancien design clair (orange/blanc) à un thème sombre inspiré des sites d'animés, avec une touche universelle (tous genres, pas seulement shonen).

**Itération 1 — version "néon" (jugée trop saturée)**

- Fond `bg-zinc-950` + halftone (trame de points blancs `opacity-0.06`, espacement 24px)
- 3 glows colorés en arrière-plan : `fuchsia-600/20`, `cyan-500/20`, `rose-600/20`
- Logo `MANGALIA` en gradient `rose-400 → fuchsia-400 → cyan-400` + katakana `マンガリア`
- Hero avec `アニメ` géant en filigrane (`text-white/[0.03]`, jusqu'à `text-[14rem]`)
- Boutons en gradient `rose-500 → fuchsia-600` avec `shadow-fuchsia-500/30`
- Cartes : `bg-zinc-900/70`, ring fuchsia au survol, `shadow-2xl shadow-fuchsia-500/20`, image qui zoom à `scale-110`
- Badge note en gradient rose/fuchsia
- Titre de section précédé d'une barre verticale gradient (style "panel manga")

**Itération 2 — version actuelle (adoucie)**

Suite au retour utilisateur "ça pique un peu les yeux", la palette a été migrée vers des tons plus neutres et reposants :

- Halftone réduit : `opacity-0.035`, espacement 28px
- Glows : 2 au lieu de 3, opacité `/20` → `/10`, couleurs `indigo-700` + `violet-700`
- Logo et titre : gradient `indigo-300 → violet-300 → sky-300`
- Boutons : gradient `indigo-500 → violet-600`, `shadow-md shadow-violet-900/30`
- Cartes : ring `violet-400/30`, `shadow-xl shadow-violet-900/30`
- Badges et accents texte : palette `violet-200` / `violet-300`
- Barre verticale du titre de section : `indigo-500 → violet-600`

### Éléments structurels conservés (toutes itérations)

- Header sticky avec `backdrop-blur-xl` et bordure `border-white/10`
- Layout en grille responsive `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Overlay gradient bas → haut sur les images de carte pour la lisibilité
- État vide (aucun article) en `border-dashed`