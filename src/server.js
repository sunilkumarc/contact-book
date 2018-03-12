var express = require('express');
var middlewaresConfig = require('./config/middlewares');
var ContactsController = require('./controllers/contact');
var server = express();

// DB Connection
require('./config/db');

// Middleware
middlewaresConfig(server);

server.get('/', function(req, res){
    res.status(200).send("Server Working Fine :D");
});

ContactsController.set(server);

var port = Number(process.env.PORT || 8000)
server.listen(port, err => {
    if (err)
        console.log(err);
    else
        console.log('Contact book application started ...');
});