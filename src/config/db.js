const mongoose = require('mongoose');

const db_url = process.env.MONGO_URI || 'mongodb://plivo-test-user:testpass@ds113019.mlab.com:13019/contacts-book';

console.log('HERE', db_url);
mongoose.connect(db_url, function(err, conn) {
    if(err) {
        console.log('Error while connecting to Mongoose : ' + err);
    }
});