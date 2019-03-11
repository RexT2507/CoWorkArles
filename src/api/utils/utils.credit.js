var models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


async function getCreditAllForf(allForf) {
    var nbrCreditAchat = 0;
    for(var i = 0; i < allForf.length; i++){
        await models.Forfait.max('createdAt', { where: { createdAt: { [Op.lt]: allForf[i].createdAt }, id: allForf[i].idForf } }).then(await async function (dateForf) {
            var wait = await models.Forfait.findOne({
                    attribute:['nbrCredit'],
                    where: {
                        id: allForf[i].idForf,
                        createdAt: dateForf
                    }
            }).then(await async function (creditForf) {
                nbrCreditAchat += creditForf;
            });
        });
    }
    return nbrCreditAchat;
}

async function getCoutAllReserv(allReserv) {
    var coutTotal = 0;
    for(var i = 0; i < allReserv.length; i++){

            await module.exports.getReservationCout(allReserv[i].idLieu, allReserv[i].dateDeb, allReserv[i].dateFin, allReserv[i].createdAt).then(function (coutReserv) {
                coutTotal = coutTotal + coutReserv;
            });

    }
    return coutTotal;
}

module.exports = {
    getReservationCout: async function(idLieu, dateDeb, dateFin, dateReserv){
        var  cout;
        await models.Lieu.max('createdAt', { where: { createdAt: { [Op.lt]: dateReserv }, id: idLieu } }).then(await async function (dateLieu) {
            await models.Lieu.findOne({
                attribute:['prix'],
                where: {
                    id: idLieu,
                    createdAt: dateLieu
                }
            }).then(await async function (coutLieu) {

                if (coutLieu) {
                    dateFin = new Date(dateFin);
                    dateDeb = new Date(dateDeb);
                    cout = coutLieu.prix*(((dateFin.getTime()/60000)/15) - ((dateDeb.getTime()/60000)/15));
                }
                else {
                    cout = 0;
                }
            });
        });
        return cout;
    },
    getCredit: async function (userId) {
        var porteMonaie;
        await models.Achat.findAll({
            attributes:['idForf', 'createdAt'],
            where: {idUser: userId}
        }).then(await async function (allForf) {
            await getCreditAllForf(allForf).then(await async function (nbrCreditTotal) {
                await models.Reservation.findAll({
                    attributes:['idLieu', 'dateDeb', 'dateFin', 'createdAt'],
                    where: {idUser: userId}
                }).then(await async function (allReserv) {
                    await getCoutAllReserv(allReserv).then(await function (coutReservTotal) {
                        porteMonaie = nbrCreditTotal - coutReservTotal;

                    })
                })
            })
        });
        return porteMonaie;
    },
    checkCredit: async function(userId, montant){
        var result;
        await module.exports.getCredit(userId).then(function (porteMonaie) {
            result = (porteMonaie - montant >= 0);
        });
        return result;
    }
};