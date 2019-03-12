var models = require('../models');

module.exports = {
    getLieux: async function (ListeId) {
        var infoLieux = [];
        for (var i = 0; i < ListeId.length; i++){
            var idLieu = ListeId[i].id;
            await models.Lieu.max('createdAt', { where: { id: idLieu }}).then(await async function (date) {
                await models.Lieu.findOne({
                    attributes: ['id', 'libelle', 'prix'],
                    where: {
                        id: idLieu,
                        createdAt: date
                    }
                }).then(await async function (lieuFind) {
                    infoLieux[i] = lieuFind;
                });
            });
        }
        return infoLieux;
    }
}