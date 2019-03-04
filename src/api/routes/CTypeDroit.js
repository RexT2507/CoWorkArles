var jwtUtils = require('../utils/utils.Auth');
var models = require('../models');

module.exports ={
    getTypeDroit: function (req, res) {
        models.TypeDroit.findOne({
            attributes: ['numero'],
            where: { numero: numero}
        }).then(function(permissionFound){
            if (permissionFound){
                return res.status(201).json(permissionFound);
            }
            else
                return res.status(409).json({'error': 'le droit n\'existe pas'});
        }).catch(function (err) {
            return res.status(500).json({'error': 'impossible de vérifier si le droit existe déjà'});
        });
    },
    getAllDroit: function (req, res) {


        //recherche de l'utilisateur
        models.User.findOne({
            attributes: ['email', 'nom', 'prenom', 'id'],
            where: {id: userId}
        }).then(function (user){
            if (user){
                return res.status(201).json(user);
            }else{
                return res.status(404).json({'error': 'l\'utilisateur n\'a pas été trouvé'})
            }
        }).catch(function (err) {
            return res.status(500).json({'error': 'impossible de rechercher l\'utilisateur'});
        })
    }
}