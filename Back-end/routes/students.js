const express = require('express');
const bcrypt = require('bcryptjs');  // for password encryption
const { getValidateStudent } = require('../validation/getValidators');
const Student = require('../models/student');
const Course = require('../models/course');
const StudentsController = require('../controllers/students');

const router = express.Router();

// GET Student
router.get("/:id", StudentsController.getStudent);


// DELETE Student
router.delete("/:id", StudentsController.deleteStudent);


// UPDATE Student
router.put("/:id", StudentsController.udpateStudent);


// GET Students
router.get("/", StudentsController.getStudents);


// POST Student
router.post("/", StudentsController.createStudent);


module.exports = router;
