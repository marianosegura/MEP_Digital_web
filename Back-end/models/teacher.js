const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const teacherRatingSchema = mongoose.Schema({ 
  student: { type: mongoose.Schema.ObjectId, ref: "Student" },
  rating: { type: Number, required: true }
});

const teacherSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },  // unique is no validator, but a tool for internal optimization
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  ratings: [teacherRatingSchema]
});

teacherSchema.plugin(uniqueValidator);  // add validator as plugin

module.exports = mongoose.model('Teacher', teacherSchema); 
