const express = require('express');
const middlewaresConfig = require('./config/middlewares');
const ContactsController = require('./controllers/contact');
const response = require('./util/response');

const server = express();
var app;

// DB Connection
require('./config/db');

// Middleware
middlewaresConfig(server);

server.get('/', function(req, res){
    res.status(200).send(response.welcome);
});

ContactsController.set(server);

const port = Number(process.env.PORT || 8000)

const startServer = (port) => {
    app = server.listen(port);
}

const stopServer = () => {
    app.close();
}

startServer(port);

module.exports = {
    startServer: startServer,
    stopServer: stopServer
}