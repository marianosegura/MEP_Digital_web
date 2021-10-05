const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Course = require('../models/course');

// Get validators get the database document and log if it 
// doesn't exists to the console and html response.


exports.getValidateTeacher = async (teacherId, res, populateRatings = false) => {
  const teacher = (populateRatings) 
    ? await Teacher.findOne({ id: teacherId }).populate('ratings.student')
    : await Teacher.findOne({ id: teacherId });

  if (!teacher) {
    console.log(`Teacher doesn't exists (${teacherId})!`);
    res.status(500).json({ message: "Profesor no existe" });
  } 
  return teacher;
};



exports.getValidateStudent = async (studentId, res) => {
  const student = await Student.findOne({ id: studentId });
  if (!student) {
    console.log(`Student doesn't exists (${studentId})!`);
    res.status(500).json({ message: "Estudiante no existe" });
  } 
  return student;
};



exports.getValidateCourse = async (courseId, res, populateAll = false) => {
  const course = (populateAll) 
    ? await Course.findOne({ id: courseId })
      .populate('teacher')
      .populate('teacher.ratings.student')
      .populate('students')
      .lean()  // to ordinary js object to override user type and content
    : await Course.findOne({ id: courseId });

  if (!course) {
    console.log(`Course doesn't exists (${courseId})!`);
    res.status(500).json({ message: "Curso no existe" });
  } 

  if (populateAll) {
    for(let i = 0; i < course.chat.length; i++) {  // populate partial chat user (teacher or student) with basic data 
      const userId = course.chat[i].user;
      let user = 
        (course.chat[i].userType == 'Teacher') ? await Teacher.findById(userId)
        : await Student.findById(userId);

      course.chat[i].user = {
        _id: user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastname
      };
    }
  }

  return course;
};
