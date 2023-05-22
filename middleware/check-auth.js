const jwt = require("jsonwebtoken")
const config = require("../config/config")

module.exports =  (types = []) => {

    if (typeof types === 'string') {
        types = [types];
    }
    return (req, res, next) => {
        try {
            if(req.headers.authorization) {
                const token =  req.headers.authorization.split(" ")[1]
                const decodedToken =  jwt.verify(token, config.secret)
                req.userData = { userId: decodedToken.userId, profil: decodedToken.profil, nom: decodedToken.nom };
                console.log(decodedToken)
                if (types.length && !types.includes(req.userData.profil)) {
                    res.status(401).json({message: "Acces non autorisé"})
                } else {
                    next()
                }
            } else {
                res.status(401).json({message: "Acces non autorisé. Veuillez vous connecté!"})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}
