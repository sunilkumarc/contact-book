var Contact = require('../models/contact');

module.exports.set = (app) => {
    app.get('/contact/:email', (req, res) => {
        Contact.findOne({email: req.params.email}).then((contact) => {
            console.log(contact);
            if (contact) {
                res.status(200).send(contact);
            } else {
                res.status(404).send('No contact found with this email');
            }
        }).catch((err) => {
            res.status(400).send(err);
        });
    });

    app.post('/contact/add', (req, res) => {
        var contact = new Contact(req.body);

        contact.save(req.body).then((contact) => {
            res.status(200).send(contact);
        }).catch((err) => {
            res.status(400).send(err);
        })
    });
}