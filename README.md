# Rituels

Appli web installable (PWA) qui regroupe deux outils :

- **Shutdown & Warm-up** (`shutdown.html`) : rituel de fin de journée en 4 étapes, puis la tâche d'attaque affichée le matin.
- **Sommeil & Forme** (`sommeil.html`) : saisie de la nuit (phases de la montre), plan du jour selon la nuit, grille de forme du soir et bilan.

Tout tourne dans le navigateur. **Aucune donnée n'est envoyée nulle part** : les saisies restent sur l'appareil. Le dépôt ne contient que le code et des profils métiers génériques.

## Profils métiers

Au premier lancement, l'accueil propose de choisir un profil. Il pré-remplit :

- la checklist de fermeture du soir ;
- les exemples affichés dans les champs du shutdown ;
- les tâches conseillées selon la nuit (journées verte, orange, rouge, et ce qu'il vaut mieux éviter) ;
- les facteurs de la veille et l'objectif de sommeil.

Tu peux en changer à tout moment dans **Accueil → Profil et sauvegarde**. Un profil ne touche jamais aux données (nuits, journées, projets, historique).

Profils fournis, dans `profils/` : Neutre, Développement & data, Bureau & gestion de projet, Enseignement, Santé & soin, Commerce & relation client, Indépendant·e & créatif·ve.

### Ajouter un profil

1. Copie un fichier de `profils/`, par exemple `neutre.json`, et adapte-le.
2. Ajoute une ligne dans `profils/index.json` (`fichier`, `nom`, `description`).
3. Pousse sur `main`.

Format :

```json
{
  "type": "rituels-profil",
  "version": 1,
  "nom": "Mon métier",
  "description": "Une ligne affichée dans la liste.",
  "shutdown": {
    "checklist": ["Point 1", "Point 2"],
    "exemples": { "arret": "…", "premiereAction": "…", "resultat": "…" },
    "projets": ["Optionnel : projets ajoutés s'ils n'existent pas déjà"]
  },
  "sommeil": {
    "objectif": "7h30",
    "taches": { "verte": [], "orange": [], "rouge": [], "eviter": [] },
    "facteurs": ["Sport", "Écran tard"]
  }
}
```

Chaque bloc est facultatif : seul ce qui est présent est remplacé.

### Profil perso

Un profil peut être personnel : tes listes, ta checklist, tes projets. Nomme-le `quelquechose.perso.json`. Le `.gitignore` empêche de le publier. Charge-le via **Accueil → Profil et sauvegarde → Charger un fichier**.

## Sauvegarde

**Accueil → Profil et sauvegarde → Exporter toutes mes données** crée un seul fichier `rituels-sauvegarde-AAAA-MM-JJ.json` (les deux outils, réglages compris). Pour le recharger, sur le même appareil ou un autre, passe par **Charger un fichier**. Les anciens exports de chaque outil sont aussi acceptés.

Ces fichiers sont personnels : le `.gitignore` les exclut du dépôt.

## Mise en ligne sur GitHub Pages

1. Pousse le contenu de ce dossier à la racine d'un dépôt public.
2. **Settings → Pages** : *Deploy from a branch*, `main`, `/ (root)`.
3. L'appli est en ligne sur `https://<compte>.github.io/<dépôt>/`.

## Installation sur Android

Ouvre l'adresse dans **Chrome**, puis **⋮ → Installer l'application**. Un appui long sur l'icône propose les raccourcis *Shutdown*, *Warm-up* et *Ma nuit*. L'appli fonctionne ensuite hors ligne.

Chaque téléphone a ses propres données : plusieurs personnes peuvent utiliser la même adresse sans se mélanger.

## Modifier l'appli

Après une modification, **incrémente `VERSION` dans `sw.js`** (`rituels-v3` → `rituels-v4`), puis ouvre l'appli deux fois sur le téléphone pour récupérer la nouvelle version.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil, profils et sauvegarde |
| `shutdown.html` | Shutdown & Warm-up |
| `sommeil.html` | Sommeil & Forme |
| `profils/` | Fiches métiers et leur index |
| `manifest.webmanifest` | Nom, icônes et raccourcis de l'appli installée |
| `sw.js` | Service worker : fonctionnement hors ligne |
| `icons/` | Icônes de l'appli |
