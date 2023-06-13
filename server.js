let express = require('express');
const app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments.routes');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require("./config/config")
const userRoutes = require("./routes/user.routes")
const matiereRoutes = require("./routes/matiere.routes")
const typeConn = require("./config/type.config");
const authorize = require('./middleware/check-auth')
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
// const uri = 'mongodb+srv://mb:toto@cluster0.5e6cs7n.mongodb.net/assignments?retryWrites=true&w=majority';
// const uri = db.uriDev
const uri = db.uriDev
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(authorize([typeConn.etudiant, typeConn.professeur, typeConn.administrateur]), assignment.getAssignments)
  // .post(authorize([typeConn.etudiant, typeConn.professeur, typeConn.administrateur]), assignment.postAssignment)
  .post(assignment.postAssignment)
  .put(authorize([typeConn.professeur, typeConn.administrateur]), assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(authorize([typeConn.etudiant, typeConn.professeur, typeConn.administrateur]), assignment.getAssignment)
  .delete(authorize([typeConn.professeur, typeConn.administrateur]), assignment.deleteAssignment);
  

// app.use(prefix + "/users", userRoutes);
app.route(prefix + '/users/register').post(userRoutes.register)
app.route(prefix + '/users/login').post(userRoutes.login)
app.route(prefix + '/users').get(userRoutes.list)
app.route(prefix + '/users/prof/:id').get(userRoutes.getProfByIdMatiere)
app.route(prefix + '/users/:id')
  .get(authorize([typeConn.etudiant, typeConn.professeur, typeConn.administrateur]), userRoutes.findById);

app.route(prefix + '/matieres/:id')
  .get(authorize([typeConn.etudiant, typeConn.professeur, typeConn.administrateur]), matiereRoutes.findById);
app.route(prefix + '/matieres')
  .post(authorize([typeConn.professeur, typeConn.administrateur]), matiereRoutes.add)
app.route(prefix + '/matieres')
  .get(authorize([typeConn.etudiant, typeConn.professeur, typeConn.administrateur]), matiereRoutes.list)  

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


