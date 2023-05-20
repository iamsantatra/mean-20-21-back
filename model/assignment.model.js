let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const User = require("../model/user.model");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let AssignmentSchema = Schema({
    idAssignment: Number,
    dateDeRendu: {
        type: Date,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    rendu: Boolean,
    note: Number,
    remarques: String,
    idMatiere: {
        type: Number,
        required: true
    },
    idEleve: {
        type: Number,
        required: true,
        ref: 'User',
        validate: {
            validator: async function(value) {
              const count = await User.countDocuments({ id: value, profil: 'Etudiant(e)' });
              return count > 0;
            },
            message: "L'ID de l'élève est invalide ou ne correspond pas à un profil d'un élève."
        }
    }
});

AssignmentSchema.plugin(aggregatePaginate);
AssignmentSchema.plugin(AutoIncrement, { inc_field: "idAssignment" });

module.exports = mongoose.model('assignments', AssignmentSchema, 'assignments');
