const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
var Schema = mongoose.Schema;

const utilisateurSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  motDePasse : {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  profil: {
    type: String,
    required: true,
    enum: ['Etudiant', 'Administrateur'],
    default: "Etudiant"
  },
  id: {
    type: Number,
    required: true
  }
}
);

utilisateurSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Utilisateur", utilisateurSchema)
