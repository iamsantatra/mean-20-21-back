const bcrypt = require("bcryptjs");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config")

async function register(req, res) {
    // console.log(req.body)
    let hash = await bcrypt.hash(req.body.motDePasse, 10)
    try {
      let userTest = await User.findOne({ "nom" : req.body.nom.trim()})
      if(userTest != undefined) {
        return res.status(409).json({
          message: "Utilisateur déjà enregistré",
          data: userTest
        });
      }
      const user = new User({
        nom: req.body.nom.trim(),
        motDePasse: hash,
        image: req.body.image,
        profil: req.body.profil
      })
      let result = await user.save()

      return res.status(201).json({
        message: "L'utilisateur a été enregistré avec succès !",
        data: result
      });
    } catch(err) {
      console.log(err)
        return res.status(500).json({
          message: err.message
        })
    }
}

async function login(req, res) {
    console.log(req.body)
    let fetchedUser;
    
    let user = await User.findOne({ nom: req.body.nom.trim() })
    try {
        if (!user) {
            return res.status(401).json({
            message: "Utilisateur inexistant"
            });
        }
        fetchedUser = user;
        bcrypt.compare(req.body.motDePasse, user.motDePasse)
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Mot de passe incorrect"
                });
            }
        console.log(fetchedUser)
        const token = jwt.sign(
          { userId: fetchedUser.id, profil: fetchedUser.profil, nom: fetchedUser.nom },
          config.secret,
          { expiresIn: "24h" }
        );
        res.status(200).json({
          access_token: token,
          data: fetchedUser,
          expiresIn: 86400
        });
      })
    } catch(err) {
      return res.status(500).json({
        message: err.message
      });
    };
}

// function that list all users
async function list(req, res) {
    let result = await User.find()
    return res.status(200).json({
        message: "Liste des utilisateurs",
        data: result
    });
}

module.exports = { register, login, list }