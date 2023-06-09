const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose);

const utilisateurSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  motDePasse : {
    type: String,
    required: true
  },
  image: String,
  profil: {
    type: String,
    required: true,
    enum: ['Etudiant(e)', 'Professeur', 'Administrateur'],
    default: "Etudiant(e)"
  },
  id: Number
}
);

utilisateurSchema.plugin(AutoIncrement, { inc_field: "id" });
module.exports = mongoose.model("User", utilisateurSchema, "users")
