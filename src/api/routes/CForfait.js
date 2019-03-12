var models = require('../models');
var jwtUtils = require('../utils/utils.Auth');
var droitUtils = require('../utils/utils.Droit');

module.exports ={
    addForf: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0  || typeof(userId) !== 'number')
            return res.status(401).json({'error': 'mauvais token'});

        droitUtils.checkDroit(catId, 1052).then(function (result) {
            if (!result){

                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else{
                var nbrCredit = req.body.nbrCredit;
                var libelle = req.body.libelle;
                var prix = req.body.prix;
                var actif = req.body.actif;


                //gestion des erreurs
                if (libelle == null){
                    return res.status(400).json({'error': 'libelle manquant'});
                }
                if (prix == null){
                    return res.status(400).json({'error': 'prix manquant'});
                }
                if (nbrCredit == null){
                    return res.status(400).json({'error': 'nombre de credit manquant'});
                }
                if (actif == null){
                    actif = false;
                }

                models.Forfait.findOne({
                    attributes: ['id'],
                    where: {
                        libelle: libelle
                    }
                }).then(function (result) {
                    if (!result){
                        models.Forfait.create({
                            nbrCredit: nbrCredit,
                            libelle: libelle,
                            prix: prix,
                            actif: actif
                        }).then(function (newForf) {
                            return res.status(201).json({newForf});
                        }).catch(function (err) {
                            return res.status(500).json({'error': 'impossible d\'ajouter le forfait'});
                        });
                    }
                    else {
                        return res.status(409).json({'error': 'un forfait se nomme déjà ainsi'});
                    }
                })

            }
        });
    },

    changeCredit: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0  || typeof(userId) !== 'number')
            return res.status(400).json({'error': 'mauvais token'});

        droitUtils.checkDroit(catId, 52).then(function (result) {
            if (!result){

                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else {
                var idForf = req.body.idForf;
                var nbrCredit = req.body.nbrCredit;

                if (nbrCredit == null){
                    return res.status(400).json({'error': 'nbrCredit non précisé'});
                }
                if (idForf == null){
                    return res.status(400).json({'error': 'forfait non précisé'});
                }

                models.Forfait.findOne({
                    attributes: ['id', 'libelle', 'actif', 'prix', 'nbrCredit'],
                    where: {
                        id: idForf
                    }
                }).then(function (forf) {
                    if (forf){
                        models.Forfait.create({
                            id: idForf,
                            libelle: forf.libelle,
                            prix: forf.prix,
                            actif: forf.actif,
                            nbrCredit: nbrCredit
                        }).then(function (newforf) {
                            return res.status(201).json({newforf});
                        }).catch(function (err) {
                            return res.status(500).json({'error': 'impossible d\'ajouter le forfait'});
                        });
                    }
                    else {
                        return res.status(404).json({'error': 'le forfait n\'a pas été trouvé'});
                    }

                })
            }
        })
    }
}