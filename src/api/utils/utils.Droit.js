var models = require('../models');

module.exports = {
    getDroitByCat: function (categorieId) {
        models.Droit.findAll({
            attributes: ['numeroDroit'],
            where: {idCat: categorieId}
        }).then(function (AllNumDroit){
            return AllNumDroit;
        }).catch(function (err) {
            return false;
        })
    },
    checkDroit: async function (categorieId, typeDroitId){
        if (categorieId == null || !categorieId) {
            return false;
        }
        var result;
        await models.Droit.findOne({
            attributes: ['idCat'],
            where: {idCat: categorieId, numeroDroit: typeDroitId}
        }).then(function (droitFound){
            result = !!droitFound;
        });
        return result;
    },
    addDroit: async function (categorieId, numeroTypeDroit) {
        var newDroit = models.Droit.create({
            idCat: categorieId,
            numeroDroit : numeroTypeDroit
        }).then(function (newDroit) {
            return true;
        }).catch(function (err) {
            console.log("bonjour");
            return false;
        })
    }
}