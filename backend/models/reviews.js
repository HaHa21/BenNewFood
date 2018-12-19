var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var ReviewSchema = new Schema({

    title: { type: String, required: [true, 'title cant be blank'] },
    content: {type: String, required: [true, 'content cant be blank'] },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, default: 0},
    created: { type: Date, default: Date.now}

});

module.exports = mongoose.model('Review', ReviewSchema);
