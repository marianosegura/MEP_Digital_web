const express = require('express');
const CoursesController = require('../controllers/courses/courses');
const CoursesSchedulesController = require('../controllers/courses/courses_schedules');
const CoursesTeachersController = require('../controllers/courses/courses_teachers');
const CoursesStudentsController = require('../controllers/courses/courses_students');
const CoursesNewsController = require('../controllers/courses/courses_news');
const CoursesAssignmentsController = require('../controllers/courses/courses_assignments');
const CoursesChatController = require('../controllers/courses/courses_chat');

const router = express.Router();


// POST Course Chat Message
router.post("/:id/chat", CoursesChatController.createCourseChatMessage);


// PUT Course Chat Message
router.put("/:id/chat", CoursesChatController.updateCourseChatMessage);


// DELETE Course Chat Message
router.delete("/:id/chat", CoursesChatController.deleteCourseChatMessage);


// PUT Course Assignment
router.put("/:courseId/assignments/:assignmentId", CoursesAssignmentsController.updateCourseAssignment);


// DELETE Course Assignment
router.delete("/:courseId/assignments/:assignmentId", CoursesAssignmentsController.deleteCourseAssignment);


// POST Course Assignment
router.post("/:id/assignments", CoursesAssignmentsController.createCourseAssignment);


// POST Course News
router.post("/:id/news", CoursesNewsController.createCourseNews);


// PUT Course News
router.put("/:courseId/news/:newsId", CoursesNewsController.updateCourseNews);


// DELETE Course News
router.delete("/:courseId/news/:newsId", CoursesNewsController.deleteCourseNews);

// POST Email List of Course Students
router.post("/:courseId/students/email-list", CoursesStudentsController.emailCourseStudentsList);

// DELETE Course Student
router.delete("/:courseId/students/:studentId", CoursesStudentsController.deleteCourseStudent);


// POST Course Student
router.post("/:id/students", CoursesStudentsController.createCourseStudent);


// UPDATE Course Teacher
router.put("/:id/teacher", CoursesTeachersController.updateCourseTeacher);


// DELETE Course Teacher
router.delete("/:id/teacher", CoursesTeachersController.deleteCourseTeacher);


// POST Course Schedule
router.post("/:id/schedule", CoursesSchedulesController.createClassPeriod);


// DELETE Course Schedule
router.delete("/:courseId/schedule/:classPeriodId", CoursesSchedulesController.deleteClassPeriod);


// UPDATE Course
router.put("/:id", CoursesController.updateCourse);


// DELETE Course
router.delete("/:id", CoursesController.deleteCourse);


// GET Course
router.get("/:id", CoursesController.getCourse);


// GET Courses
router.get("/", CoursesController.getCourses);


// POST Course
router.post("/", CoursesController.createCourse);


module.exports = router;
