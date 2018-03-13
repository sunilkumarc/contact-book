const mongoose = require('mongoose');

const db_url = 'mongodb://localhost:27017/plivo-contact-book';

mongoose.connect(db_url, function(err, conn) {
    if(err) {
        console.log('Error while connecting to Mongoose : ' + err);
    }
});