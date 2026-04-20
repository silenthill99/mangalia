# Changelog

Trace des modifications apportées au projet.

## 2026-04-20

### `resources/js/pages/mangas/show.tsx` — Application du thème manga adouci

Propagation du thème "adouci" de `welcome.tsx` vers la page de détail d'un article, **en conservant intégralement la structure existante** (grille 3 colonnes `lg:grid-cols-[25%_50%_25%]`, panneau gauche sticky avec menu d'articles + menu Profil, panneau central résumé/méta/commentaires, panneau droit sticky avec affiche/titre/âge/note).

- Fond global `bg-zinc-950` + `text-zinc-100`, halftone `opacity-0.035` espacement 28px en `fixed` (persiste au scroll), 2 glows `indigo-700/10` + `violet-700/10`
- Panneaux gauche/droite : `bg-zinc-950/70` + `backdrop-blur-xl`, bordures `border-white/10`
- Logo `MANGALIA` + katakana `マンガリア` remplacent le simple `h1 Mangalia` (gradient `indigo-300 → violet-300 → sky-300`)
- Menu d'articles : item actif sur fond `violet-500/10` + ring `violet-400/30` au lieu du `font-bold`, inactif en `zinc-400` → `violet-300` au survol
- Titres de section (`Résumé`, `Commentaires`) précédés d'une barre verticale gradient `indigo-500 → violet-600` (style panel manga)
- Bouton Profil + bouton Note : gradient `indigo-500 → violet-600` + `shadow-md shadow-violet-900/30`
- Restriction d'âge convertie en `Badge` coloré : `emerald-500/15` pour "Tous publics", `rose-500/15` sinon (ring assorti)
- Affiche de droite : `ring-1 ring-white/10` + `shadow-xl shadow-violet-900/30` + overlay gradient bas → haut
- Retrait du toggle `Dark mode` (l'état `dark` et les classes `dark:` devenaient redondants avec le thème sombre permanent)

### Éléments conservés à l'identique

- Grille responsive `lg:grid-cols-[25%_50%_25%]`
- Panneaux gauche/droite masqués sous `lg` (`hidden ... lg:flex`)
- Version mobile du panneau central (titre + image + âge affichés en `lg:hidden`)
- Menu Profil flottant en bas à gauche avec `useRef` + `handleClickOutside`

### `resources/js/components/commentaries.tsx` — Composant aéré + thème manga

Refonte visuelle avec plus d'espace et alignement sur le thème `welcome.tsx` / `show.tsx`.

- Espacement global augmenté : `space-y-6` → `space-y-10` entre formulaire et liste, `space-y-4` → `space-y-5` entre commentaires
- Formulaire sans cadre (transparent sur le fond) : `Textarea` `rows={4}` rendue plus visible (`border-white/20`, `bg-zinc-900/80`, `shadow-inner shadow-black/30`, placeholder `zinc-400`, focus `violet-400/60`) + placeholder contextuel, bouton "Envoyer" aligné à droite avec gradient `indigo-500 → violet-600`
- Chaque commentaire devient un `<article>` card : `p-6`, ring `violet-400/20` au survol, avatar circulaire (initiale du prénom) en gradient `indigo-500 → violet-600`, nom d'auteur en `violet-200`, contenu en `text-zinc-300 leading-relaxed`, action "Supprimer" isolée sous un séparateur `border-t border-white/5 pt-4`
- État vide ajouté : `border-dashed border-white/10 bg-zinc-900/40 p-10` quand aucun commentaire
- Retrait du `<h2>Commentaires</h2>` interne (désormais porté par `show.tsx` avec la barre verticale gradient, évite le doublon)
- Suppression de `divide-y` remplacé par des cartes distinctes avec leur propre bordure

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