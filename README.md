# 🎮 SMASH ARENA

**Site de classement compétitif Smash Bros Ultimate**

## 🚀 Fonctionnalités

- **Classement dynamique** : Tri par points, victoires, ou nom
- **Historique des matchs** : Voir tous les matchs enregistrés avec dates
- **Gestion des joueurs** : Liste complète avec stats et personnages
- **Interface brute et puissante** : Style directement inspiré de Smash Ultimate
- **0 dépendances** : HTML, CSS, JavaScript pur

## 📁 Structure

```
smash-arena/
├── index.html           # Page d'accueil
├── classement.html      # Classement des joueurs
├── historique.html      # Historique des matchs
├── joueurs.html         # Liste des joueurs
├── styles.css           # Styles CSS (noir, blanc, rouge)
├── script.js            # Logique JavaScript
├── data.js              # Base de données (joueurs, matchs)
├── bg-hero.jpg          # Image de fond (à remplacer)
└── README.md            # Ce fichier
```

## 🎨 Design

- **Couleurs** : Noir (#0a0a0a), Blanc (#f5f5f5), Rouge (#e60012)
- **Ombres** : Dures, sans flou (box-shadow directes)
- **Titres** : MASSIFS, UPPERCASE, avec text-shadow rouge
- **Cartes** : Bordures nettes, hover avec ombre dure
- **Responsive** : Adapté mobile, tablette, desktop

## 🎮 Pages

### 🏠 Accueil (`index.html`)
- Titre SMASH ARENA géant
- Image de fond puissante
- 3 boutons : Classement, Historique, Joueurs

### 📊 Classement (`classement.html`)
- Liste triable des joueurs par points, victoires, ou nom
- Affiche le rang, le nom, le personnage principal, points, victoires, win rate
- Ombres dures au hover
- Top 3 avec couleurs spéciales (or, argent, bronze)

### ⏱️ Historique (`historique.html`)
- Tous les matchs enregistrés
- Affiche : joueurs, personnages, résultat, date, stage
- Filtrage : tous, récents (24h), cette semaine
- Le gagnant est en rouge

### 👥 Joueurs (`joueurs.html`)
- Grid des cartes joueurs
- Recherche en temps réel
- Affiche : nom, main character, points, stats, style
- Cartes style "affiche Smash"

## 🛠️ Technologie

- **HTML5** : Structure sémantique
- **CSS3** : Grid, Flexbox, media queries
- **JavaScript Vanilla** : Tri, filtrage, stockage local

## 📝 Données

Les données sont stockées dans `data.js` :
- 8 joueurs de test avec stats complètes
- 10 matchs d'exemple
- Sauvegarde en `localStorage`

## 🎯 Utilisateur

1. Ouvrir `index.html` dans le navigateur
2. Cliquer sur les boutons pour explorer
3. Le site stocke les données localement

## 🔧 Personnalisation

### Ajouter un joueur
```javascript
// Dans data.js, ajouter à l'array PLAYERS
{
    id: 9,
    name: "Votre nom",
    mainCharacter: "Personnage",
    secondaryCharacters: ["Autres"],
    points: 3000,
    wins: 90,
    losses: 30,
    winRate: 75.0,
    style: "Votre style"
}
```

### Ajouter un match
```javascript
// Utiliser la fonction addMatch() dans script.js
addMatch(player1Id, player2Id, winnerId, "Stage");
```

### Changer l'image de fond
Remplacer `bg-hero.jpg` par votre image et mettre à jour le chemin dans `styles.css`

## 🎯 Inspirations Smash

- Titre massif avec text-shadow
- Bordures nettes, ombres dures
- Palette noir/blanc/rouge contrastée
- Cartes d'affiche plutôt que de cartes molles
- Layout compétitif, lisible, puissant

---

**Smash Arena = Brut, puissant, compétitif** 🔴⚫⚪
