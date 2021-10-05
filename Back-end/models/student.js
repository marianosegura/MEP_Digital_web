const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const studentSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },  // unique is no validator, but a tool for internal optimization
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  grade: { type: Number, required: true, min: 1, max: 6 }
});

studentSchema.plugin(uniqueValidator);  // add validator as plugin

module.exports = mongoose.model('Student', studentSchema); 