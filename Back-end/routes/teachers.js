const express = require('express');
const TeachersController = require('../controllers/teachers/teachers');
const TeachersRatingsController = require('../controllers/teachers/teachers_ratings');


const router = express.Router();


// DELETE Teacher Rating
router.delete("/:teacherId/ratings/:studentId", TeachersRatingsController.deleteTeacherRating);


// PUT Teacher Rating
router.put("/:id/ratings", TeachersRatingsController.updateTeacherRating);


// GET Teacher
router.get("/:id", TeachersController.getTeacher);


// DELETE Teacher
router.delete("/:id", TeachersController.deleteTeacher);


// UPDATE Teacher
router.put("/:id", TeachersController.updateTeacher);


// GET Teachers
router.get("/", TeachersController.getTeachers);


// POST Teacher
router.post("/", TeachersController.createTeacher);

module.exports = router;
