var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    title: { type: String, required: [true, 'title cant be blank'] },
    content: {type: String, required: [true, 'content cant be blank'] },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('MessageContent', schema);
