# Gestion des devoirs MBDS (back-end MEAN)

## Membres du groupe

- RAJOHNSON Fitahiana Santatry Ny Aina  - 20
- RAKOTOARISOA Brian Ulrich - 21

## Manipulations à faire pour lancer le projet

- Veuillez cloner le dépôt dans votre machine : `git clone https://github.com/iamsantatra/mean-20-21-back.git`
- Utilisez la commande `cd` pour vous rendre dans le répertoire racine de votre projet: `cd mean-20-21-back`
- Lancez les commandes:
  - pour télécharger les dépendances: `npm install` 
  - pour démarrer : `node server.js`

## Nos contributions

### Gestion utilisateur

- Ajout du modèle User, ce modèle représente un compte utilisateur. Il est lié à la collection `users` dans la base de données:
```
    id
    nom
    motDePasse
    image
    profil
```

- Inscription: Création de compte administrateur, professeur ou étudiant

- Ce code (back-end et front-end) est basé sur notre projet de l'année dernière, disponible sur GitHub : [E-Kaly](https://github.com/iamsantatra/m1p9mean-santatry-ny-aina), inspiré du tutoriel [AcademindPro MEAN](https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/) ainsi que le site [bezkoder](https://www.bezkoder.com/).

- Ajout de la fonction middleware de protection des endpoints pour vérifier si un utilisateur est connecté  ou admin: "./middleware/check-auth.js"

- Lister les utilisateurs

- Récupération d'un utilisateur par son id 

- Récupération d'un professeur à partir de l'id d'une matière 

### Gestion des matières

- Ce modèle représente une matière enseignée par un professeur. Il est lié à la collection `matieres` de la base de données MongoDb:
```
    idMatiere
    nom
    idProf
    image
```
- Lister les matières

- Création d'une matière

- Récupération d'une matière par son id 

### Gestion des devoirs

- Version finale du model **assignment**. Il est lié à la collection `assignments` de la base de données MongoDb: 
```
    idAssignment
    dateDeRendu
    nom
    rendu
    note
    remarques
    idMatiere
    idEleve
```

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


### Authenfication

```http
  POST /api/users/login
```
| Parameter   | Type     | Description                               |
| :---------- |:---------|:------------------------------------------|
| `nom`       | `String` | **Required**. Le nom d'utilisateur        |
| `motDePasse`| `String` | **Required**. Le mot de passe utilisateur |

### Récupère le prof à partir de l'idMatiere

```http
  GET /api/users/prof/{id}
```
| Parameter   | Type     | Description                                  |
| :---------- |:---------|:---------------------------------------------|
| `id`        | `number` | **Required**. L'id de la matière             |

### Récupère l'utilisateur à partir de son ID

```http
  GET /api/users/{id}
```
| Parameter   | Type     | Description                                  |
| :---------- |:---------|:---------------------------------------------|
| `id`        | `number` | **Required**. L'id de l'utilisateur          |

### Liste des utilisateurs

```http
  GET /api/users
```

### Création d'une matière

```http
  POST /api/matieres
```
| Parameter   | Type     | Description                                           |
| :---------- |:---------|:------------------------------------------------------|
| `nom`       | `String` | **Required**. Le nom de la matière                    |
| `idProf`    | `number` | **Required**. L'id du professeur enseignant la matière|
| `image`     | `String` | Chemin de l'emplacement  |

### Liste des matières

```http
  GET /api/matieres
```

### Récupérer une matière à partir de son id

```http
  GET /api/matieres/{id}
```
| Parameter   | Type     | Description                                  |
| :---------- |:---------|:---------------------------------------------|
| `id`        | `number` | **Required**. L'id de la matière à récupérer |


### Création d'un devoir

```http
  POST /api/matieres
```
| Parameter   | Type     | Description                                           |
| :---------- |:---------|:------------------------------------------------------|
| `nom`       | `String` | **Required**. Le nom de la matière                    |
| `dateDeRendu`    | `number` | **Required**. La date de rendue|
| `rendu`     | `boolean` | **Required**. Si le devoir est rendu ou non |
| `idMatiere`     | `number` | **Required**. id de la matière |
| `idEleve`     | `number` | **Required**. id de l'élève |
