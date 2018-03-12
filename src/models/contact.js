var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

contactSchema.options.toJSON = {
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
};

module.exports = mongoose.model('contact', contactSchema);