var models = require('../models');
const Sequelize = require('sequelize');
var UtilsDroit = require('../utils/utils.Droit');
var jwtUtils = require('../utils/utils.Auth');
var UtilsCredit = require('../utils/utils.credit');

const Op = Sequelize.Op;

module.exports ={
    Reserver: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var catId = jwtUtils.getCatId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'mauvais token'});

        /*if (!droitUtils.checkDroit(catId, 1000)){
            return res.status(400).json({'error': 'l\'utilisateur n\'a pas les droits'});
        }*/

        UtilsDroit.checkDroit(catId, 1000).then(function (result) {
            if (!result){
                console.log(result);
                return res.status(403).json({'error': 'l\'utilisateur n\'a pas les droits'});
            }
            else {
                //valeurs
                var dateDeb = req.body.dateDeb;
                var dateFin = req.body.dateFin;
                var idLieu = req.body.idLieu;

                //gestion des erreurs
                if (dateDeb == null){
                    return res.status(400).json({'error': 'dateDeb manquant'});
                }
                if (dateFin == null){
                    return res.status(400).json({'error': 'dateFin manquant'});
                }

                models.Reservation.findOne({
                    attributes: ['id'],
                    where: {
                        idLieu: idLieu,
                        dateDeb: {
                            [Op.gte]: dateDeb,
                            [Op.lt]: dateFin
                        },
                        dateFin:{
                            [Op.gt]: dateDeb,
                            [Op.lte]: dateFin
                        }
                    }
                }).then(function(reservationFound) {
                    if (!reservationFound) {
                        models.LieuEvent.findOne({
                            attributes: ['id'],
                            where: {
                                idLieu: idLieu,
                                dateDeb: {
                                    [Op.gte]: dateDeb,
                                    [Op.lt]: dateFin
                                },
                                dateFin:{
                                    [Op.gt]: dateDeb,
                                    [Op.lte]: dateFin
                                }
                            }
                        }).then(function (eventFound) {
                            if (!eventFound){
                                UtilsCredit.getReservationCout(idLieu, dateDeb, dateFin).then(function (cout) {
                                    UtilsCredit.checkCredit(userId, cout).then(function (result) {
                                        console.log(result);
                                        if (result){
                                            console.log(idLieu);
                                            models.Reservation.create({
                                                dateDeb: dateDeb,
                                                dateFin: dateFin,
                                                idUser: userId,
                                                idLieu: idLieu
                                            }).then(function (newReservation) {
                                                return res.status(201).json({'id': newReservation.id});
                                            }).catch(function (err) {
                                                return res.status(500).json({'error': 'impossible d\'ajouter la réservation ' + err});
                                            });
                                        }
                                        else{
                                            return res.status(400).json({'error': 'porte monaie insuffisant pour effectuer la transaction'});
                                        }
                                    })
                                })
                            }
                            else{
                                return res.status(409).json({'error': 'Un évènement a lieu dans cet endroit pendant le créneau choisi ' + eventFound});
                            }
                        }).catch(function (err) {
                            return res.status(500).json({'error': 'impossible de chercher le lieu'});
                        });
                    }
                    else{
                        return res.status(409).json({'error': 'il y a déjà une réservation sur le créneau indiqué'});
                    }

                }).catch(function (err) {
                    return res.status(500).json({'error': 'impossible de vérifier les créneaux de réservation '  + err});
                });
            }
        })

    },
};