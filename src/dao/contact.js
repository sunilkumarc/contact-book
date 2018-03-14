const Contact = require('../models/contact');
const response = require('../util/response');

const getOneContact = (email) => {
    return new Promise((resolve, reject) => {
        Contact.findOne({email: email}).then((contact) => {
            if (contact) {
                resolve(contact);
            }
            reject(response.noContactFoundWithMail);
        }).catch((err) => {
            return reject(err);
        });
    });
}

const getContactsWithName = (name, perPage, page) => {
    return new Promise((resolve, reject) => {
        Contact.find({name: new RegExp('^' + name, 'i')})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((contacts) => {
            resolve(contacts);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

const deleteContact = (email) => {
    return new Promise((resolve, reject) => {
        Contact.findOneAndRemove({email: email}, (err, contact) => {
            if (err) {
                reject(err);
            }
            resolve(contact);
        });
    });
}

const updateContact = (body) => {
    return new Promise((resolve, reject) => {
        var contact = new Contact(body);
        contact = contact.toObject();
        delete contact._id;

        getOneContact(contact.email).catch((err) => {
            reject(err);
        });

        Contact.update({email: contact.email}, contact, (err, updated) => {
            if (err) {
                reject(err);
            }
            resolve(contact);
        });
    });
}

const addContact = (body) => {
    return new Promise((resolve, reject) => {
        var contact = new Contact(body);
          
        contact.save(body).then((contact) => {
            resolve(contact);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    getOneContact: getOneContact,
    getContactsWithName: getContactsWithName,
    deleteContact: deleteContact,
    updateContact: updateContact,
    addContact: addContact
}