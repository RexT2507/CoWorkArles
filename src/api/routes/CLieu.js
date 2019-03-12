var models = require('../models');
var jwtUtils = require('../utils/utils.Auth');
var droitUtils = require('../utils/utils.Droit');
var lieuUtils = require('../utils/utils.lieu');
const Sequelize = require('sequelize');


const OP = Sequelize.Op;

module.exports ={
    addLieu: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0  || typeof(userId) !== 'number')
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
                var actif = req.body.actif;

                //gestion des erreurs
                if (libelle == null){
                    return res.status(400).json({'error': 'libelle manquant'});
                }
                if (prix == null){
                    prix = 0;
                }
                if (actif == null){
                    actif = false;
                }

                models.Lieu.findOne({
                    attributes: ['libelle'],
                    where: { libelle: libelle}
                }).then(function(LieuFound) {
                    if (!LieuFound) {
                        models.Lieu.create({
                            libelle: libelle,
                            prix: prix,
                            actif: actif
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
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'mauvais token'});

        var recherche = req.body.recherche;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        //recherche des lieux

        models.Lieu.findAll({
            order: [(order != null) ? order.split(':') : ['libelle', 'ASC']],
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('id')), 'id']],
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            where: {[OP.or]: [
                    {libelle: {[OP.like]: '%'+recherche+'%'}},
                    {prix: {[OP.like]: '%'+recherche+'%'}}
                ],
                actif: true
            }
        }).then(function (idLieuxFound) {
            if (idLieuxFound){
                lieuUtils.getLieux(idLieuxFound).then(function (allLieux) {
                    res.status(200).json(allLieux);
                });
            }else{
                res.status(404).json({"error": "aucun lieu trouvé"});
            }
        }).catch(function (err) {
            res.status(500).json({"error": "impossible de rechercher les lieux"});
        });
    },

    changeStatus: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0  || typeof(userId) !== 'number')
            return res.status(400).json({'error': 'mauvais token'});

        droitUtils.checkDroit(catId, 22).then(function (result) {
            if (!result){

                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else{
                //valeurs
                var actif = req.body.actif;
                var idLieu = req.body.idLieu;

                //gestion des erreurs
                if (actif == null){
                    return res.status(400).json({'error': 'status voulu non précisé'});
                }
                if (idLieu == null){
                    return res.status(400).json({'error': 'Lieu non précisé'});
                }

                models.Lieu.update({
                    actif: actif
                },{
                    where:{
                        id: idLieu
                    }
                }).then(function (update) {
                    return res.status(201).json({'succesful': 'status du lieu modifié'});
                }).catch(function (err) {
                    return res.status(500).json({'error': 'impossible de mettre à jour le lieu'});
                });
            }
        })
    },
    changeCout: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0  || typeof(userId) !== 'number')
            return res.status(400).json({'error': 'mauvais token'});

        droitUtils.checkDroit(catId, 22).then(function (result) {
            if (!result){

                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else {
                var idLieu = req.body.idLieu;
                var cout = req.body.cout;

                if (cout == null){
                    return res.status(400).json({'error': 'cout non précisé'});
                }
                if (idLieu == null){
                    return res.status(400).json({'error': 'Lieu non précisé'});
                }

                models.Lieu.findOne({
                    attributes: ['id', 'libelle', 'actif', 'prix'],
                    where: {
                        id: idLieu
                    }
                }).then(function (lieu) {
                    if (lieu){
                        models.Lieu.create({
                            id: idLieu,
                            libelle: lieu.libelle,
                            prix: cout,
                            actif: lieu.actif
                        }).then(function (newLieu) {
                            return res.status(201).json({newLieu});
                        }).catch(function (err) {
                            return res.status(500).json({'error': 'impossible d\'ajouter le Lieu'});
                        });
                    }
                    else {
                        return res.status(404).json({'error': 'le lieu n\'a pas été trouvé'});
                    }

                })
            }
        })
    },

    changeLibelle: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0  || typeof(userId) !== 'number')
            return res.status(400).json({'error': 'mauvais token'});

        droitUtils.checkDroit(catId, 22).then(function (result) {
            if (!result) {

                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else {
                var idLieu = req.body.idLieu;
                var libelle = req.body.libelle;

                if (libelle == null){
                    return res.status(400).json({'error': 'nouveau nom non précisé'});
                }
                if (idLieu == null){
                    return res.status(400).json({'error': 'Lieu non précisé'});
                }

                models.Lieu.findOne({
                    where: {
                        libelle: libelle,
                        id: {[OP.ne]: idLieu}
                    }
                }).then(function (lieuFound) {
                    if (!lieuFound){
                        models.Lieu.update({
                            libelle: libelle
                        },{
                            where:{
                                id: idLieu
                            }
                        }).then(function (update) {
                            return res.status(201).json({'succesful': 'nom du lieu modifié'});
                        }).catch(function (err) {
                            return res.status(500).json({'error': 'impossible de mettre à jour le lieu'});
                        });
                    }
                    else{
                        return res.status(409).json({'error': 'le nom existe déjà pour désigner un autre lieu'});
                    }
                })

            }
        })
    }

};