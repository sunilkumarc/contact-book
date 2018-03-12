var Contact = require('../models/contact');

module.exports.set = (app) => {
    app.get('/contact/', (req, res) => {
        if (!req.query.email && !req.query.name) {
            return res.status(500).send({"message": "Either email or name parameter should be sent in the url"});
        }
        if (req.query.email) {
            Contact.findOne({email: req.query.email}).then((contact) => {
                if (contact) {
                    return res.status(200).send(contact);
                } else {
                    return res.status(404).send('No contact found with this email');
                }
            }).catch((err) => {
                return res.status(400).send(err);
            });
        } else if (req.query.name) {
            var perPage = 2;
            var page = req.query.page || 1;
            
            // Contact.find({name: new RegExp('^' + req.query.name, 'i')}).then((contacts) => {
            //     if (contacts) {
            //         return res.status(200).send(contacts);
            //     }
            //     return res.status(404).send('No contacts found with this name');
            // }).catch((err) => {
            //     return res.status(500).send({"message": err});
            // });
            Contact.find({name: new RegExp('^' + req.query.name, 'i')})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then((contacts) => {
                if (contacts) {
                    return res.status(200).send(contacts);
                }
                return res.status(404).send('No contacts found with this name');
            })
            .catch((err) => {
                return res.status(500).send({"message": err});
            });
        }
    });

    app.delete('/contact/:email', (req, res) => {
        Contact.findOneAndRemove({email: req.params.email}, (err, contact) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!contact) {
                return res.status(200).send({"message":"Email does not exists."});
            }
            const response = {
                message: "Successfully Deleted",
                contact: contact
            };
            return res.status(200).send(response);
        });
    });

    app.put('/contact/', (req, res) => {
        var contact = new Contact(req.body);
        contact = contact.toObject();
        delete contact._id;

        if (!contact.email) {
            return res.status(500).send({"message": "Email id is missing"});
        }
        Contact.update({email: contact.email}, contact, (err, updated) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                const message = {
                    message: "Updated Successfully.",
                    contact: contact
                }
                return res.status(200).send(message);
            }
        });
    });

    app.post('/contact/add', (req, res) => {
        var contact = new Contact(req.body);

        contact.save(req.body).then((contact) => {
            return res.status(200).send(contact);
        }).catch((err) => {
            return res.status(400).send(err);
        })
    });
}