const express = require('express');
const middlewaresConfig = require('./config/middlewares');
const ContactsController = require('./controllers/contact');
const response = require('./util/response');

const server = express();

// DB Connection
require('./config/db');

// Middleware
middlewaresConfig(server);

server.get('/', function(req, res){
    res.status(200).send(response.welcome);
});

ContactsController.set(server);

const port = Number(process.env.PORT || 8000)
server.listen(port, err => {
    if (err)
        console.log(err);
    else
        console.log('Contact book application started ...');
});