var jwtUtils = require('../utils/utils.Auth');
var UtilsDroit = require('../utils/utils.Droit');
var models = require('../models');

module.exports ={
    createCat: function (req, res) {
        //check le token
        /*var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'mauvais token'});

        droitUtils.checkDroit(catId, 1062).then(function (result) {
            if (!result){

                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else{*/
                //valeurs
                var libelle = req.body.libelle;
                var accreditation = req.body.accreditation;
                var droits = JSON.parse(req.body.droits); //tableau de droit

                //gestion des erreurs
                if (libelle == null){
                    return res.status(400).json({'error': 'libelle manquant'});
                }
                if (accreditation == null){
                    return res.status(400).json({'error': 'accreditation manquant'});
                }

                models.Categorie.findOne({
                    attributes: ['libelle'],
                    where: { libelle: libelle}
                }).then(function(CatFound) {
                    if (!CatFound) {
                        var newCategorie = models.Categorie.create({
                            libelle: libelle,
                            accreditation: accreditation
                        }).then(function (newCategorie) {
                            for(var i= 0; i < droits.length; i++) {
                                UtilsDroit.addDroit(newCategorie.id, droits[i]); // erreur pas traité
                            }
                            return res.status(201).json({'id': newCategorie.id});
                        }).catch(function (err) {
                            return res.status(500).json({'error': 'impossible d\'ajouter la categorie' + err});
                        });
                    }
                    else
                        return res.status(409).json({'error': 'la categorie existe déjà'});
                }).catch(function (err) {
                    return res.status(500).json({'error': 'impossible de vérifier si la categorie existe déjà '+err});
                });
            /*}
        });*/

    },
    getAllDroit: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'mauvais token'});
      //valeurs
      var idCategorie = req.body.idCat;

      //gestion des erreurs
        if (!idCategorie){
            return res.status(400).json({'error': 'idCategorie manquant'});
        }

        var recherche = UtilsDroit.getDroitByCat(idCategorie);

        if (recherche){
            if (recherche != null){
                return res.status(201).json(recherche);
            }else{
                return res.status(404).json({'error': 'aucun droit n\'a été trouvé pour cette categorie'});
            }
        }else{
            return res.status(500).json({'error': 'impossible d\'ajouter la categorie'});
        }
    },


}