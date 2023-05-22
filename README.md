# MBDSMagascar2022_2023_api

- RAJOHNSON Fitahiana Santatra Ny Aina - 20
- RAKOTOARISOA Brian Ulrich - 21

## Manipulations à faire pour lancer le projet

- Veuillez cloner le dépôt dans votre machine : `git clone https://github.com/iamsantatra/mean-20-21-back.git`
- ouvrir le répertoire racine du projet dans le terminal et lancer les commandes:
.pour télécharger les dépendances: `npm install` 
.pour démarrer : `node server.js`

## Nos contributions

### Gestion de login/password
- Ajout du modèle User, ce modèle représente un compte utilisateur. Il est lié à la collection `Users` dans la base de données:
```
    id
    nom
    motDePasse
    image
    profil
```

- Inscription: Création de compte administrateur, professeur ou étudiant

- Authentification à l'aide de JSON Web Tokens en suivant le tutoriel sur https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/

- Ajout de la fonction middleware de protection des endpoints pour vérifier si un utuilisateur est connecté : "./middleware/check-auth.js"


### Gestion des matières

- Ce modèle représente une matière enseignée par un professeur. Il est lié à la collection `Matiere` de la base de données MongoDb:
```
    id
    nom
    idProf
    image
```

- Création d'une matière

- Récupération d'une matière par son id 

## Documentation des endpoints ajoutés

### Inscription

```http
  POST /api/users/register
```
| Parameter   | Type     | Description                                                                     |
| :---------- |:---------|:--------------------------------------------------------------------------------|
| `nom`       | `String` | **Required**. Le nom d'utilisateur                                              |
| `motDePasse`| `String` | **Required**. Le mot de passe utilisateur                                       | 
| `image`     | `String` | Une image convertie en base64 représentant la photo de profil                   |
| `profil`    | `String` | **Required** Le profil du compte: 'Etudiant(e)', 'Professeur', 'Administrateur' |


### Login

```http
  POST /api/users/login
```
| Parameter   | Type     | Description                               |
| :---------- |:---------|:------------------------------------------|
| `nom`       | `String` | **Required**. Le nom d'utilisateur        |
| `motDePasse`| `String` | **Required**. Le mot de passe utilisateur |


### Création d'une matière

```http
  POST /api/matieres
```
| Parameter   | Type     | Description                                           |
| :---------- |:---------|:------------------------------------------------------|
| `nom`       | `String` | **Required**. Le nom de la matière                    |
| `idProf`    | `number` | **Required**. L'id du professeur enseignant la matière|
| `image`     | `String` | Une image convertie en base64 représentant la matière |


### Récupérer une matière à partir de son id

```http
  GET /api/matieres/{id}
```
| Parameter   | Type     | Description                                  |
| :---------- |:---------|:---------------------------------------------|
| `id`        | `String` | **Required**. L'id de la matière à récupérer |
