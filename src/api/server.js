// Imports
var express = require("express");
var bodyParser = require("body-parser");
var apiRouter = require("./apiRouter").router;

//Instantiation
var server = express();

//configuration de body parser
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//configure routes
server.get('/', function (req, res) {
   res.setHeader('Content-Type', 'text/html');
   res.status(200).send('<h1>Server REST PTUT</h1>');
});

server.use('/api/', apiRouter);

//lancement du server
server.listen(8090, function () {
    console.log('Le serveur écoute ...');
});