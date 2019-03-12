//Imports
var express = require('express');
var cUser = require('./routes/CUser');
var cCategorie = require('./routes/CCategorie');
var cLieu = require('./routes/CLieu');
var cReservation = require('./routes/CReservation');
var cForfait = require('./routes/CForfait');
var cAchat = require('./routes/CAchat');

//Router
exports.router = (function(){
    var apiRouter = express.Router();

    //Users Routes
    apiRouter.route('/users/register/').post(cUser.register);
    apiRouter.route('/users/login/').post(cUser.login);
    apiRouter.route('/users/info/').get(cUser.getUserProfile);
    apiRouter.route('/users/search').get(cUser.search);
    apiRouter.route('/users/credit').get(cUser.getMyCredit);
    apiRouter.route('/users/info/update/nom').put(cUser.updateNom);
    apiRouter.route('/users/delete').delete(cUser.delete);


    apiRouter.route('/categorie/info/droits').get(cCategorie.getAllDroit);
    apiRouter.route('/categorie/create').post(cCategorie.createCat);

    apiRouter.route('/lieu/ajouter').post(cLieu.addLieu);
    apiRouter.route('/lieu/update/cout').post(cLieu.changeCout);
    apiRouter.route('/lieu/search').get(cLieu.search);
    apiRouter.route('/lieu/update/status').put(cLieu.changeStatus);
    apiRouter.route('/lieu/update/libelle').put(cLieu.changeLibelle);


    apiRouter.route('/reservation/reserver').post(cReservation.Reserver);

    apiRouter.route('/forfait/creer').post(cForfait.addForf);
    apiRouter.route('/forfait/update/credit').post(cForfait.changeCredit);

    apiRouter.route('/achat/acheter').post(cAchat.acheter);

    return apiRouter;
})();