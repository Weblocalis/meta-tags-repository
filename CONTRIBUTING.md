# Guide de Contribution

Merci de votre intérêt pour ce projet ! Nous apprécions toute contribution visant à améliorer cette base de données ou son fonctionnement. Ce guide vous aidera à contribuer efficacement.

---

## Comment Contribuer

### 1. **Signaler des bugs**
- Accédez à l'onglet [Issues](../../issues).
- Cliquez sur **"New Issue"** et choisissez le modèle **Bug Report**.
- Remplissez les champs demandés, en fournissant des informations détaillées sur le problème rencontré.

### 2. **Suggérer de nouvelles fonctionnalités**
- Accédez à l'onglet [Issues](../../issues).
- Cliquez sur **"New Issue"** et choisissez le modèle **Feature Request**.
- Décrivez votre idée en expliquant pourquoi elle serait utile.

### 3. **Améliorer la documentation**
- Consultez les fichiers comme `README.md` ou `CONTRIBUTING.md`.
- Proposez des corrections ou des ajouts pertinents via une pull request.

### 4. **Contribuer au code ou aux données**
- Clonez le dépôt :
  ```bash
  git clone https://github.com/<votre-nom-utilisateur>/<nom-du-repo>.git
  ```
- Créez une branche pour vos modifications :
  ```bash
  git checkout -b feature/nom-de-la-fonctionnalite
  ```
- Faites vos modifications.
- Testez vos changements (voir la section sur les tests).
- Faites un commit clair :
  ```bash
  git commit -m "Ajout de [description de votre contribution]"
  ```
- Poussez votre branche :
  ```bash
  git push origin feature/nom-de-la-fonctionnalite
  ```
- Créez une Pull Request depuis GitHub.

---

## Processus de Pull Request

1. Assurez-vous que votre code respecte les normes du projet.
2. Incluez des descriptions claires de vos modifications.
3. Liez votre Pull Request à une issue existante si possible (ex. : `Fixes #numéro-issue`).
4. Attendez la revue des mainteneurs.

---

## Branches Principales

- **`main`** : Contient le code stable. Toutes les contributions passent par une revue avant d'être fusionnées ici.
- **`develop`** : Utilisé pour les travaux en cours. Soumettez vos Pull Requests sur cette branche.

---

## Tests

Avant de soumettre votre travail :
- **Code** : Assurez-vous que le code fonctionne correctement et respecte les normes.
- **Base de données** : Validez les modifications au format JSON (si applicable).
- **Tests unitaires** : Si le projet inclut des tests automatisés, exécutez-les :
  ```bash
  npm test
  ```
- Fournissez des preuves des tests (captures d’écran ou logs).

---

## Merci !

Votre contribution est précieuse et aide à améliorer ce projet pour tout le monde !
