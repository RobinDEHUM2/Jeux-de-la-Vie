### A Faire

- La mise en place de tests d’intégration pour couvrir l'algorithme - lancés via npm test ;
- Toute autre option qui vous semble intéressant d’ajouter

### Requis

- Une cellule morte possédant exactement trois voisines vivantes devient vivante : elle naît ;
- Une cellule vivante possédant deux ou trois voisines vivantes le reste, sinon elle meurt.
- Une grille de hauteur et de largeur réglable pour l’affichage des cellules ;
- Un select pour choisir une configuration de départ (au minimum 2 possibles). Au clic sur un choix, on réinitialise la grille avec la configuration choisie ;
- Un ou plusieurs boutons permettant de lancer et reprendre la simulation ;
- Un curseur permettant de régler la vitesse de simulation
- La grille doit être torique (bouclée) : les bords gauche/droit et haut/bas sont connectés deux à deux ;
- Il doit être simple de rajouter des configurations de départ, simplement en relançant l'application, sans nécessairement toucher au code ;
- L'algorithme sera côté "main", l'interface côté "renderer" et communiqueront via IPC ;
- L'application sera développée grâce à Electron, on la lancera via npm start ;
- L’utilisation de vue.js est recommandée (techno utilisée pour le launcher) mais pas obligatoire ;

### Optionel

- La mise en place de tests d’intégration pour couvrir l'algorithme - lancés via npm test ;
- La mise en place d’un linter pour la revue de code, lancé via npm lint ;
- La possibilité d’éditer la grille en cliquant sur les cellules ciblées ;
- La possibilité d’exporter et d’importer des configurations de grilles sous forme de fichiers ;
- Toute autre option qui vous semble intéressant d’ajouter
