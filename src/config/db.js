const mongoose = require('mongoose');

const db_url = process.env.MONGO_URI || 'mongodb://localhost:27017/plivo-contact-book';

console.log('HERE', db_url);
mongoose.connect(db_url, function(err, conn) {
    if(err) {
        console.log('Error while connecting to Mongoose : ' + err);
    }
});