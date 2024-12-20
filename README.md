# Documentation de l'API Express

## Description

Ce projet est une API construite avec Express.js pour gérer les utilisateurs, les articles et les opérations liées à l'authentification et à la réinitialisation des mots de passe. L'API inclut des fonctionnalités comme l'inscription, la connexion, la gestion des articles (création, mise à jour, suppression, récupération), ainsi que la réinitialisation des mots de passe.

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- MongoDB

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone <URL-du-dépôt>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement :
   Créez un fichier `.env` et ajoutez les variables nécessaires, par exemple :
   ```env
   PORT=3000
   MONGO_URI=<URL de la base de données MongoDB>
   JWT_SECRET=<votre clé secrète JWT>
   ```

## Démarrage

1. Lancez le serveur en mode développement :
   ```bash
   npm run dev
   ```
2. L'API sera accessible sur `http://localhost:<PORT>`.

## Routes de l'API

### Authentification

- **Inscription**
  - `POST /register`
  - Corps de la requête :
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Connexion**
  - `POST /login`
  - Corps de la requête :
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Réinitialisation de mot de passe**
  - `POST /forgot-password`
  - `POST /verify-code`
  - `POST /reset-password`

### Gestion des utilisateurs

- **Récupérer les utilisateurs**
  - `GET /users`
- **Mettre à jour un utilisateur**
  - `PUT /update/:id`
- **Supprimer un utilisateur**
  - `DELETE /delete`

### Gestion des articles

- **Créer un article**
  - `POST /article`
- **Récupérer tous les articles**
  - `GET /articles`
- **Récupérer un article par ID**
  - `GET /article/:articleId`
- **Mettre à jour un article**
  - `PUT /article/:articleId`
- **Récupérer des articles par utilisateur**
  - `GET /user/:userId/articles`
- **Supprimer un article**
  - `DELETE /article/:articleId`

## Middlewares

- `authMiddleware` : Vérifie l'authentification de l'utilisateur à l'aide d'un jeton JWT.

## Modèles de données

### Utilisateur
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### Article
```json
{
  "title": "string",
  "content": "string",
  "category": "string",
  "author": "id de l'utilisateur",
  "imagePath": "string"
}
```

## Contributions

Les contributions sont les bienvenues ! Veuillez soumettre une pull request avec une description claire des modifications proposées.

## Licence

Ce projet est sous licence MIT.

