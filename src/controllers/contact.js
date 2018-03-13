const Contact = require('../models/contact');
const contactsDao = require('../dao/contact');
const response = require('../util/response');

module.exports.set = (app) => {
    app.get('/contact/', (req, res) => {
        if (!req.query.email && !req.query.name) {
            return res.status(500).send(response.nameOrEmailRequired);
        }
        if (req.query.email) {
            contactsDao.getOneContact(req.query.email).then((contact) => {
                if (contact) {
                    return res.status(200).send(contact);
                } else {
                    return res.status(404).send(response.noContactFoundWithMail);
                }
            }).catch((err) => {
                console.log(err);
                return res.status(400).send(err);
            });
        } else if (req.query.name) {
            var perPage = 10;
            var page = req.query.page || 1;

            contactsDao.getContactsWithName(req.query.name, perPage, page).then((contacts) => {
                if (contacts.length > 0) {
                    return res.status(200).send(contacts);
                }
                return res.status(404).send(response.noContactFoundWithName);
            }).catch((err) => {
                return res.status(500).send({"message": err});
            });
        }
    });

    app.delete('/contact/', (req, res) => {
        if (!req.query.email) {
            return res.status(500).send(response.emailMissing);
        }
        contactsDao.deleteContact(req.query.email).then((contact) => {
            if (!contact) {
                return res.status(400).send(response.noEmail);
            }
            const responseMessage = {
                message: response.deleted,
                contact: contact
            };
            return res.status(200).send(responseMessage);
        }).catch((err) => {
            return res.status(500).send(err);
        });
    });

    app.put('/contact/', (req, res) => {
        if (!req.body.email) {
            return res.status(500).send(response.emailMissing);
        }

        contactsDao.updateContact(req.body).then((contact) => {
            const message = {
                message: response.updated,
                contact: contact
            }
            return res.status(200).send(message);
        }).catch((err) => {
            return res.status(500).send(err);
        })
    });

    app.post('/contact/add', (req, res) => {
        if (!req.body.email) {
            return res.status(500).send(response.emailMissing);
        }
        
        contactsDao.addContact(req.body).then((contact) => {
            return res.status(200).send(contact);
        }).catch((err) => {
            return res.status(400).send(err);
        });
    });
}