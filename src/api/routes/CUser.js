//Imports
var bcryptjs = require('bcryptjs');
var jwtUtils = require('../utils/utils.Auth');
var creditUtils = require('../utils/utils.credit');
var models = require('../models');
const Sequelize = require('sequelize');

//Constantes
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,11}$/;

const OP = Sequelize.Op;

module.exports ={
    register: function (req, res) {
        //valeurs
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var email = req.body.email;
        var password =req.body.password;
        var categorie = 1;

        //gestion des erreurs de paramètre manquant
        if (nom == null) {
            return res.status(400).json({'error': 'nom manquant'});
        }
        if (prenom == null){
            return res.status(400).json({'error': 'prenom manquant'});
        }
        if (email == null){
            return res.status(400).json({'error': 'email manquant'});
        }
        if (password == null){
            return res.status(400).json({'error': 'mot de passe manquant'});
        }

        if(nom.length >= 50 || nom.length <= 1){
            return res.status(400).json({'error': 'le nom doit être compris entre 2 et 50 caractères'});
        }
        if(prenom.length >= 25 || prenom.length <= 2){
            return res.status(400).json({'error': 'le nom doit être compris entre 3 et 25 caractères'});
        }
        if (!EMAIL_REGEX.test(email)){
            return res.status(400).json({'error': 'email invalide'});
        }
        if (!PASSWORD_REGEX.test(password)){
            return res.status(400).json({'error': 'le mot de passe doit être compris entre 4 et 11 caractère et pocèder au moins 1 caractère numérique'});
        }

        //gestion d'utilisateur existant
        models.User.findOne({
            attributes: ['email'],
            where: { email: email}
        }).then(function(userFound){
            if (!userFound){
                bcryptjs.genSalt(10, function(err, salt) {
                    bcryptjs.hash(password, salt, function(err, hash) {
                        var newUser = models.User.create({
                            nom: nom,
                            prenom : prenom,
                            email: email,
                            password: hash,
                            idCat: categorie
                        }).then(function (newUser) {
                            return res.status(201).json({'id': newUser.id});
                        }).catch(function (err) {
                            return res.status(500).json({'error': 'impossible d\'ajouter l\'utilisateur' + err });
                        });
                    });
                })
            }
            else
                return res.status(409).json({'error': 'l\'utilisateur existe déjà'});
        }).catch(function (err) {
            return res.status(500).json({'error': 'impossible de vérifier si l\'utilisateur existe déjà ' + err});
        });
    },

    login: function (req, res) {
        //valeur
        var email = req.body.email;
        var password = req.body.password;

        //gestion des champs manquant
        if (email == null)
            return res.status(400).json({'error': 'email manquant'});
        if (password == null)
            return res.status(400).json({'error': 'mot de passe manquant'});


        //recherche de l'utilisateur
        models.User.findOne({
            attributes: ['email', 'nom', 'prenom', 'password', 'id', 'idCat'],
            where: {email: email}
        }).then(function (userFound) {
            if (userFound){
                bcryptjs.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                    if (resBycrypt){
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        })
                    }
                    else
                        return res.status(403).json({'error': 'Mot de passe invalide'});
                });
            }
            else
                return res.status(404).json({'error': 'L\'utilisateur n\'est pas dans la base de donnée'})
        }).catch(function (err) {
            return res.status(500).json({'error': 'imposible de vérifier l\'utilisateur ' + err});
        })
    },

    getUserProfile: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'mauvais token'});

        //recherche de l'utilisateur
        models.User.findOne({
            attributes: ['email', 'nom', 'prenom', 'id', 'idCat'],
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
    },

    search: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        if (userId < 0 || typeof(userId) !== 'number')
            return res.status(400).json({'error': 'mauvais token'});

        var recherche = req.body.recherche;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        //recherche des utilisateurs
        models.User.findAll({
            order: [(order != null) ? order.split(':') : ['nom', 'ASC']],
            attributes: ['id', 'email', 'nom', 'prenom', 'tel'],
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            where: {[OP.or]: [
                    {email: {[OP.like]: '%'+recherche+'%'}},
                    {nom: {[OP.like]: '%'+recherche+'%'}},
                    {prenom: {[OP.like]: '%'+recherche+'%'}},
                    {tel: {[OP.like]: '%'+recherche+'%'}}
                ]}
        }).then(function (UsersFound) {
            if (UsersFound){
                res.status(200).json(UsersFound);
            }else{
                res.status(404).json({"error": "aucun utilisateur trouvé"});
            }
        }).catch(function (err) {
            res.status(500).json({"error": "impossible de rechercher les utilisateurs"});
        });
    },

    updateNom: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'mauvais token'});

        //valeur
        var nom = req.body.nom;

        //recherche de l'utilisateur
        models.User.findOne({
            attributes: ['id', 'nom'],
            where: { id : userId}
        }).then(function (userFound) {
            if (userFound){
                userFound.update({
                    nom: (nom ? nom : userFound.nom)
                }).then(function () {
                    if(userFound){
                        return res.status(201).json(userFound);
                    }
                    else{
                        return res.status(500).json({'error': 'imposible de mettre à jour l\'utilisateur'});
                    }
                }).catch(function (err) {
                    return res.status(500).json({'error': 'impossible de mettre à jour l\'utilisateur'});
                })
            }
            else{
                return res.status(404).json({'error': 'l\'utilisateur n\'a pas été trouvé'});
            }
        }).catch(function (err) {
            return res.status(500).json({'error': 'incapable de vérifier l\'utilisateur'});
        });
    },
    getMyCredit: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0 || typeof(userId) !== 'number')
            return res.status(400).json({'error': 'mauvais token'});

        creditUtils.getCredit(userId).then(function (nbrCredit){
            return res.status(200).json({'credits': nbrCredit});
        }).catch(function (err) {
            return res.status(500).json({'error': err});
        })
    },
    delete: function (req, res) {
        //check le token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0 || typeof(userId) !== 'number')
            return res.status(400).json({'error': 'mauvais token'});

        //valeur
        var id = req.body.id;

        models.User.destroy({
            where: {id : id}
        }).then(function (userDelete) {
            if (userDelete) {
                if (userId == id) {
                    return res.status(201).json({'isUser': 'l\'utilisateur supprimé est l\'utilisateur connecté'})
                }
                else {
                    return res.status(201).json({'successful': 'utilisateur supprimé'});
                }
            }
            else {
                return res.status(400).json({'error': 'l\'utilisateur n\'existe pas' })
            }
        }).catch(function (err) {
            return res.status(500).json({'error': 'incapable de supprimer l\'utilisateur' })
        })
    }
}