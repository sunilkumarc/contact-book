const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
var request = require('request');

const server = require('../src/server.js');
const contactsDao = require('../src/dao/contact');
const messages = require('../src/util/response');

var localContacts = [];

contact1 = {
    "email": "user1@gmail.com",
    "name": "user1"
}

contact2 = {
    "email": "user2@gmail.com",
    "name": "user2"
}

updatedContact1 = {
    "email": "user1@gmail.com",
    "name": "user1 updated"
}

describe('Contacts Controller Testing', () => {
    before(() => {
        server.startServer(9090);
        getOneContact = sinon.stub(contactsDao, 'getOneContact');
        getContactsWithName = sinon.stub(contactsDao, 'getContactsWithName');
        deleteContact = sinon.stub(contactsDao, 'deleteContact');
        updateContact = sinon.stub(contactsDao, 'updateContact');
        addContact = sinon.stub(contactsDao, 'addContact');
    });

    after(() => {
        server.stopServer();
    });

    describe('Calling GET /', () => {
        it('should return 200 status code', (done) => {
            request({
                headers: {
                  'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
                },
                uri: 'http://localhost:9090',
                method: 'GET'
              }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        })
    });

    describe('Calling POST /contact/add with a contact', () => {
        it('should return 200 status code with added contact', (done) => {
            addContact.withArgs(contact1).returns(new Promise((resolve, reject) => {
                localContacts.push(contact1);
                resolve(contact1);
            }));

            request({
                headers: {
                  'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
                },
                uri: 'http://localhost:9090/contact/add/',
                method: 'POST',
                body: contact1,
                json: true
              }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body.email).to.equal(contact1.email);
                expect(body.name).to.equal(contact1.name);
                done();
            });
        })
    });

    describe('Calling GET /contact without email or name', () => {
        it('should return 500 status code', (done) => {
            request({
                headers: {
                  'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
                },
                uri: 'http://localhost:9090/contact',
                method: 'GET'
              }, (error, response, body) => {
                expect(response.statusCode).to.equal(500);
                expect(body.message).to.equal(response.nameOrEmailRequired);
                done();
            });
        })
    });

    describe('Calling GET /contact with a contact1 email', () => {
        it('should return 200 status code and locally stored contact1', (done) => {
            getOneContact.withArgs(contact1.email).returns(new Promise((resolve, reject) => {
                resolve(contact1);
            }));

            request({
                headers: {
                  'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
                },
                uri: 'http://localhost:9090/contact?email=user1@gmail.com',
                method: 'GET'
              }, (error, response, body) => {
                body = JSON.parse(body);
                expect(response.statusCode).to.equal(200);
                expect(body.email).to.equal(contact1.email);
                done();
            });
        })
    });

    describe('Calling GET /contact by adding contact2', () => {
        it('should return 200 status code with locally stored contact1 and contact2', (done) => {
            getContactsWithName.withArgs('user', 10, 1).returns(new Promise((resolve, reject) => {
                localContacts.push(contact2);
                resolve(localContacts);
            }));

            request({
                headers: {
                  'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
                },
                uri: 'http://localhost:9090/contact?name=user',
                method: 'GET'
              }, (error, response, body) => {
                body = JSON.parse(body);
                expect(response.statusCode).to.equal(200);
                expect(body.length).to.equal(2);
                expect(body[0].email).to.equal(contact1.email);
                expect(body[0].name).to.equal(contact1.name);

                expect(body[1].email).to.equal(contact2.email);
                expect(body[1].name).to.equal(contact2.name);
                done();
            });
        })
    });
    
    describe('Calling PUT /contact with updated contact1', () => {
        it('should return 200 status code and updated contact 1', (done) => {
            updateContact.withArgs(updatedContact1).returns(new Promise((resolve, reject) => {
                resolve(updatedContact1);
            }));

            request({
                headers: {
                  'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
                },
                uri: 'http://localhost:9090/contact',
                method: 'PUT',
                body: updatedContact1,
                json: true
              }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body.message.message).to.equal(messages.updated.message);
                expect(body.contact.name).to.equal(updatedContact1.name);
                expect(body.contact.email).to.equal(updatedContact1.email);
                done();
            });
        })
    });
    
    describe('Calling DELETE /contact', () => {
        it('should return 200 status code and return only one contact', (done) => {
            deleteContact.withArgs(contact2.email).returns(new Promise((resolve, reject) => {
                localContact2 = localContacts.pop();
                resolve(localContact2);
            }));

            request({
                headers: {
                  'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
                },
                uri: 'http://localhost:9090/contact&email=user2@gmail.com',
                method: 'DELETE'
              }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body.message.message).to.equal(messages.deleted.message);
                expect(body.contact.name).to.equal(contact2.name);
                expect(body.contact.email).to.equal(contact2.email);
                done();
            });
        })
    });
});