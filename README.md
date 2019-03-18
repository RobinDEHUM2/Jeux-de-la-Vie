# ankama-jeu-de-la-vie

Projet de 72h pour la société Ankama.
Auteur : Robin DEHU

## architecture du projet

1. config
   Dossier contenant le fichier de config du projet,
   et le fichier patterns qui contient quelques positions initiales.

2. main
   "Back end" du projet,
   index.js est la racine d'electron.
   controller.js définit les connections ipc.
   FileExplorer.js permet d'ouvrir les fenêtre d'accès aux fichiers.
   GameOfLife.js est le moteur du jeu.

3. public
   Le fichier html utile à la production du front par Vue.js

4. savedFiles
   Dossier initial pour sauvegarder et charger des grilles.

5. src
   "Front end" Vue et Vuex

6. test
   Tests unitaires
