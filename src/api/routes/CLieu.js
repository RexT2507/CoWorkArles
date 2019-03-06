var models = require('../models');
var jwtUtils = require('../utils/utils.Auth');
var droitUtils = require('../utils/utils.Droit');
const Sequelize = require('sequelize');


const OP = Sequelize.Op;

module.exports ={
    addLieu: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0)
            return res.status(401).json({'error': 'mauvais token'});

        /*if (!droitUtils.checkDroit(catId, 1022)){
            return res.status(400).json({'error': 'l\'utilisateur n\'a pas les droits'});
        }*/
        droitUtils.checkDroit(catId, 1022).then(function (result) {
            if (!result){

                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else{
                //valeurs
                var libelle = req.body.libelle;
                var prix = req.body.prix;

                //gestion des erreurs
                if (libelle == null){
                    return res.status(400).json({'error': 'libelle manquant'});
                }
                if (prix == null){
                    prix = 0;
                }

                models.Lieu.findOne({
                    attributes: ['libelle'],
                    where: { libelle: libelle}
                }).then(function(LieuFound) {
                    if (!LieuFound) {
                        models.Lieu.create({
                            libelle: libelle,
                            prix: prix
                        }).then(function (newLieu) {
                            return res.status(201).json({'id': newLieu.id});
                        }).catch(function (err) {
                            return res.status(500).json({'error': 'impossible d\'ajouter le Lieu'});
                        });
                    }
                    else
                        return res.status(409).json({'error': 'le Lieu existe déjà'});
                }).catch(function (err) {
                    return res.status(500).json({'error': 'impossible de vérifier si le Lieu existe déjà '  + err});
                });
            }

        });
    },

    search: function (req, res) {
        var recherche = req.body.recherche;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        //recherche des lieux
        models.Lieu.findAll({
            order: [(order != null) ? order.split(':') : ['libelle', 'ASC']],
            attributes: ['libelle', 'prix'],
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            where: {[OP.or]: [
                    {libelle: {[OP.like]: '%'+recherche+'%'}},
                    {prix: {[OP.like]: '%'+recherche+'%'}}
                ]}
        }).then(function (LieuxFound) {
            if (LieuxFound){
                res.status(200).json(LieuxFound);
            }else{
                res.status(404).json({"error": "aucun lieu trouvé"});
            }
        }).catch(function (err) {
            res.status(500).json({"error": "impossible de rechercher les lieux"});
        });
    }
};