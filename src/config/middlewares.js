const bodyParser = require('body-parser');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const getUnauthorizedResponse = require('../util/response').getUnauthorizedResponse;

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(basicAuth({
        users: {
            'admin': 'supersecret'
        },
        unauthorizedResponse: getUnauthorizedResponse
    }));
}