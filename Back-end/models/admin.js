const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }
});

adminSchema.plugin(uniqueValidator);  // add validator as plugin

module.exports = mongoose.model('Admin', adminSchema); 