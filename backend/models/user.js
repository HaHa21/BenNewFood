var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String}

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
