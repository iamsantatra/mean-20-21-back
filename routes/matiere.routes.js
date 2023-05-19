let Matiere = require('../model/matiere.model');

async function add(req, res) {

    let matiere = new Matiere({
        nom : req.body.nom,
        image : req.body.image,
        idProf : req.body.idProf,
    });

    console.log(matiere)

    try {
        let result = await matiere.save()

        return res.status(201).json({
            message: "La matière a été enregistrée avec succès !",
            data: result
        });
    } catch(err) {
        return res.status(500).json({
          message: err.message
        })
    }
}

async function findById(req, res) {

    let id = req.params.id;

    let result = await Matiere.findOne({id: id})
    return res.status(200).json({
        message: "La matière à partir id:" + id,
        data: result
    });
}

module.exports = { add, findById }