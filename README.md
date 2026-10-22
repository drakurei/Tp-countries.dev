# Atlas · Countries Explorer

Atlas est une petite application React qui permet d'explorer les pays du monde. Je l'ai réalisée dans le cadre d'un TP de mon cours de React.

Site en ligne : https://drakurei.github.io/Tp-countries.dev/

## Le sujet du TP

Le but du TP était de créer une application qui récupère les pays du monde grâce à une API, puis qui permet de :

1. afficher la liste des pays ;
2. rechercher un pays par son nom ;
3. filtrer les pays par région ;
4. afficher une page de détail pour chaque pays.

Deux bonus étaient possibles : le tri des pays et les favoris enregistrés dans le navigateur. Je les ai faits tous les deux.

## Pourquoi ce projet

Ce TP m'a permis de mettre en pratique ce que j'ai vu en cours sur un vrai projet : récupérer des données depuis une API, les afficher avec des composants, gérer plusieurs pages avec un routeur et garder une interface agréable sur ordinateur comme sur téléphone.

## Ce que fait l'application

- **Liste des pays** : chaque carte affiche le drapeau, le nom en français, la région, la capitale et la population.
- **Recherche** : on tape le nom d'un pays (en français ou en anglais). La recherche ne tient pas compte des majuscules ni des accents : « bresil » trouve « Brésil ».
- **Filtre par région** : Afrique, Amériques, Asie, Europe, Océanie et Régions polaires. Le filtre et la recherche fonctionnent ensemble.
- **Réinitialisation** : un bouton remet la recherche, le tri et les filtres à zéro.
- **Page de détail** (`/country/BRA` par exemple) : grand drapeau, capitale, population, superficie, langues, monnaies, fuseaux horaires, coordonnées, pays frontaliers (cliquables) et lien vers OpenStreetMap.
- **Bonus tri** : par nom (A à Z) ou par population décroissante.
- **Bonus favoris** : l'étoile ajoute un pays aux favoris. Les favoris restent enregistrés après un rechargement de la page (`localStorage`).
- **États de l'interface** : chargement (cartes « squelettes »), erreur de l'API avec un bouton pour réessayer, recherche sans résultat, drapeau qui ne charge pas, page inconnue.

## Technologies utilisées

- **React 19** pour les composants et l'état ;
- **Vite** pour lancer le projet et le compiler ;
- **React Router** pour les pages (accueil, détail, page 404) ;
- **CSS** classique, réparti en plusieurs fichiers, avec des variables CSS pour les couleurs et les espacements ;
- **GitHub Actions** et **GitHub Pages** pour la mise en ligne.

Je n'ai pas utilisé de bibliothèque d'animation : les animations sont faites en CSS (apparition du titre, cartes qui se révèlent, globe qui tourne) et elles se coupent si l'utilisateur a activé « réduire les animations » dans son système.

## Le rôle de l'API

Les données viennent de l'API gratuite [countries.dev](https://countries.dev/docs). J'utilise deux adresses :

- `https://countries.dev/countries` : la liste complète (250 pays et territoires), chargée une seule fois au démarrage ;
- `https://countries.dev/alpha/{code}` : la fiche d'un pays, appelée par la page de détail. Elle fonctionne même si on ouvre directement le lien d'un pays.

La recherche et le filtre se font ensuite directement dans le navigateur, sur la liste déjà chargée : c'est plus rapide et ça évite d'appeler l'API à chaque lettre tapée.

Avant de coder, j'ai testé les réponses de l'API. J'ai remarqué que les réponses ne sont pas toujours identiques : par exemple, `/countries` donne le nom français du pays alors que `/alpha` ne le donne pas, et le champ `flag` contient un emoji et pas une image. J'ai donc écrit une fonction `normalizeCountry` qui transforme chaque réponse dans un format toujours identique pour les composants.

## Installer et lancer le projet

Il faut avoir [Node.js](https://nodejs.org/) installé (version 20.19 ou plus récente).

```bash
npm install
npm run dev
```

Le site s'ouvre ensuite à l'adresse affichée dans le terminal, par exemple `http://localhost:5173/Tp-countries.dev/`.

## Compiler pour la production

```bash
npm run build
npm run preview
```

`npm run build` crée le dossier `dist/` avec la version optimisée du site. `npm run preview` permet de la tester en local.

## Organisation des fichiers

```
countries-explorer/
├── .github/workflows/deploy.yml   déploiement automatique sur GitHub Pages
├── docs/maquette.html             maquette statique faite avant le développement
├── public/favicon.svg             icône du site
├── src/
│   ├── components/                morceaux d'interface réutilisables
│   │   ├── Header.jsx, Footer.jsx, Hero.jsx
│   │   ├── CountryCard.jsx        carte d'un pays dans la grille
│   │   ├── FlagImage.jsx          drapeau + solution de remplacement
│   │   ├── SearchBar.jsx, RegionFilter.jsx, SortSelect.jsx
│   │   ├── FavoriteButton.jsx     bouton étoile
│   │   ├── LoadingState.jsx, StatePanel.jsx   chargement, erreur, vide
│   │   ├── GlobeIllustration.jsx  globe en SVG du hero
│   │   └── Icons.jsx              petites icônes SVG
│   ├── hooks/
│   │   ├── useCountries.js        chargement de la liste depuis l'API
│   │   └── useFavorites.js        favoris enregistrés dans localStorage
│   ├── pages/
│   │   ├── CountriesPage.jsx      accueil : hero, recherche, filtres, grille
│   │   ├── CountryDetailPage.jsx  fiche d'un pays
│   │   └── NotFoundPage.jsx       page 404
│   ├── services/countriesApi.js   tous les appels à l'API
│   ├── utils/countryUtils.js      normalisation, recherche, filtre, tri, formats
│   ├── styles/                    variables, styles globaux, mise en page, composants, détail
│   ├── App.jsx                    état partagé et routes
│   └── main.jsx                   point d'entrée (React + routeur)
├── index.html
└── vite.config.js
```

## Ce que ce TP m'a fait travailler en React

- **Les composants** : découper l'interface en petites pièces (une carte, une barre de recherche, un filtre) qui reçoivent leurs données par les `props`.
- **L'état avec `useState`** : la recherche, la région, le tri et les favoris sont des états. Quand ils changent, React réaffiche la grille.
- **Les données dérivées** : la liste affichée n'est pas un état de plus, elle est recalculée à chaque rendu à partir de la liste complète et des filtres.
- **Les effets avec `useEffect`** : récupérer les données de l'API, annuler la requête si on quitte la page (`AbortController`), enregistrer les favoris dans `localStorage`.
- **Les hooks personnalisés** : `useCountries` et `useFavorites` regroupent une logique pour alléger `App.jsx`.
- **Le routage** : `Routes`, `Route`, `Link` et `useParams` pour lire le code du pays dans l'URL.
- **La gestion des cas difficiles** : chargement, erreur réseau, données manquantes, image cassée.

## Mise en ligne

Le fichier `.github/workflows/deploy.yml` compile le site et le publie sur GitHub Pages à chaque push sur la branche `main`. Dans `vite.config.js`, l'option `base: "/Tp-countries.dev/"` indique que le site est servi dans ce sous-dossier.

Comme GitHub Pages ne connaît pas les routes de React Router, le workflow copie `index.html` en `404.html` : un lien direct vers `/country/BRA` charge donc quand même l'application.
