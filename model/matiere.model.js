let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const User = require("../model/user.model");

let MatiereSchema = Schema({
    idMatiere: Number,
    nom: {
        type: String,
        required: true
      },
    image: String,
    idProf: {
        type: Number, 
        ref: 'User',
        validate: {
            validator: async function(value) {
              const count = await User.countDocuments({ id: value, profil: 'Professeur' });
              return count > 0;
            },
            message: "L'ID du professeur est invalide ou ne correspond pas à un profil de professeur existant."
        }
    }
});

MatiereSchema.plugin(AutoIncrement, { inc_field: "idMatiere" });

module.exports = mongoose.model('Matiere', MatiereSchema, 'matieres');
