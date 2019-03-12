var jwtUtils = require('../utils/utils.Auth');
var UtilsDroit = require('../utils/utils.Droit');
var models = require('../models');

module.exports ={
    acheter: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'mauvais token'});

        UtilsDroit.checkDroit(catId, 1040).then(function (result) {
            if (!result) {
                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else {
                var idForf = req.body.idForf;

                if (idForf == null){
                    return res.status(400).json({'error': 'forfait manquant'});
                }

                models.Achat.create({
                    idUser: userId,
                    idForf: idForf
                }).then(function (newAchat) {
                    return res.status(201).json({newAchat});
                }).catch(function (err) {
                    return res.status(500).json({'error': 'impossible d\'ajouter l\'achat' + err});
                });
            }
        });
    }
}