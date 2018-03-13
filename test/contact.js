const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
var request = require('request');

const server = require('../src/server.js');
const contactsDao = require('../src/dao/contact');
const response = require('../src/util/response');

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

    describe('Calling GET /contact with test@gmail.com dummy email', () => {
        it('should return 200 status code', (done) => {
            getOneContact.withArgs('test@gmail.com').returns(new Promise((resolve, reject) => {
                resolve({
                    "email": "test@gmail.com",
                    "name": "Test User"
                });
            }));

            request({
                headers: {
                  'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
                },
                uri: 'http://localhost:9090/contact?email=test@gmail.com',
                method: 'GET'
              }, (error, response, body) => {
                body = JSON.parse(body);
                expect(response.statusCode).to.equal(200);
                expect(body.email).to.equal('test@gmail.com');
                done();
            });
        })
    });

    describe('Calling GET /contact with dummy username user', () => {
        it('should return 200 status code', (done) => {
            getContactsWithName.withArgs('user', 10, 1).returns(new Promise((resolve, reject) => {
                resolve(
                    [{
                        "email": "test1@gmail.com",
                        "name": "User 1"
                    }, {
                        "email": "test2@gmail.com",
                        "name": "User 2"
                    }]
                );
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
                expect(body[0].email).to.equal('test1@gmail.com');
                expect(body[0].name).to.equal('User 1');

                expect(body[1].email).to.equal('test2@gmail.com');
                expect(body[1].name).to.equal('User 2');
                done();
            });
        })
    });

    // describe('Calling GET /contact with dummy username user', () => {
    //     it('should return 200 status code', (done) => {
    //         getContactsWithName.withArgs('user', 10, 2).returns(new Promise((resolve, reject) => {
    //             resolve(
    //                 [{
    //                     "email": "test3@gmail.com",
    //                     "name": "User 3"
    //                 }]
    //             );
    //         }));

    //         request({
    //             headers: {
    //               'Authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ='
    //             },
    //             uri: 'http://localhost:9090/contact?name=user&page=2',
    //             method: 'GET'
    //           }, (error, response, body) => {
    //             body = JSON.parse(body);
    //             expect(response.statusCode).to.equal(200);
    //             expect(body.length).to.equal(1);
    //             expect(body[0].email).to.equal('test1@gmail.com');
    //             expect(body[0].name).to.equal('User 1');
    //             done();
    //         });
    //     })
    // });
});