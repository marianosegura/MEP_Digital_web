const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const classPeriodSchema = mongoose.Schema({ 
  day: { type: Number, required: true },
  startHour: { type: Number, required: true },
  startMinutes: { type: Number, required: true },
  endHour: { type: Number, required: true },
  endMinutes: { type: Number, required: true }
});

const newsSchema = mongoose.Schema({ 
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true }
});

const assignmentSchema = mongoose.Schema({ 
  title: { type: String, required: true },
  description: { type: String, required: true },
  submitDate: { type: String, required: true }
});

const chatMessageSchema = mongoose.Schema({ 
  user: { type: mongoose.Schema.ObjectId, required: true, refPath: 'userType' },
  message: { type: String, required: true },
  userType: { type: String, required: true, enum: ['Teacher', 'Student'] }  // possible user models, messages can be from students or teachers 
});

const courseSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },  
  name: { type: String, required: true },
  grade: { type: Number, required: true },
  news: [newsSchema],
  schedule: [classPeriodSchema],
  assignments: [assignmentSchema],
  chat: [chatMessageSchema],
  teacher: { type: mongoose.Schema.ObjectId, ref: "Teacher" },  // teacher is assigned after creation
  students: [{ type: mongoose.Schema.ObjectId, ref: "Student" }]
});

courseSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Course', courseSchema); 
