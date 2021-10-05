const Course = require('../../models/course');
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const { getValidateTeacher, getValidateCourse, getValidateStudent } = require('../../validation/getValidators');


// POST Course
exports.createCourse = async (req, res, next) => {
  const {id, name, grade } = req.body;
  
  if (!id || !name || grade == undefined ) {
    console.log('\nCourse data field is missing')
    return res.status(500).json({ message: "Falta un campo del curso" });
  }

  const gradeIsInvalid = grade < 1 || grade > 6;  // primary school is range [1, 6]
  if (gradeIsInvalid) {
    console.log(`Course grade is invalid (${grade})!`);
    return res.status(500).json({ message: "Grado inválido" })
  }
  
  console.log(`\nCreating course ${id} - ${name}...`);
  try {
    const idIsRegistered = await Course.exists({ id: id });
    if (idIsRegistered) {
      console.log(`Course id already registered (${id})!`);
      return res.status(500).json({ message: "Id de curso ya está registrado" })
    }

    const course = new Course({ id, name, grade });

    await course.save();  // call to create teacher
    console.log(`Course created successfully (${id} - ${name})!`);
    return res.status(201).json({ message: 'Se creó el curso exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Failed course creation (${id} - ${name})!`);
    return res.status(500).json({ message: "Un error ocurrió creando el curso" })
  }
};


// GET Course
exports.getCourse = async (req, res, next) => {
  const id = req.params.id;
  console.log(`\nFetching course ${id}...`);

  try {
    const course = await getValidateCourse(id, res, populateAll=true);
    if (!course) return;

    if (course.teacher) {  // get teacher with populated student ratings
      course.teacher = await getValidateTeacher(course.teacher.id, res, populateRatings=true);
    }

    console.log(`Success on fetching course!`);
    return res.status(200).json({ course: course });

  } catch (error) {
    console.log(error);
    console.log(`Error fetching course!`);
    return res.status(500).json({ message: "Un error ocurrió recuperando el curso" })
  }
};


// GET Courses
exports.getCourses = async (req, res, next) => {
  console.log(`\nFetching courses...`);
  const { teacherId, studentId } = req.query;  // filter received as query params

  try {
    let queryParam = {};
    if (teacherId) {
      const teacher = await getValidateTeacher(teacherId, res);
      if (!teacher) return;  // teacher doesn't exists
      queryParam = { teacher : teacher._id };  // filter by teacher id (internal mongodb object id)
    } else if (studentId) {
      const student = await getValidateStudent(studentId, res);
      if (!student) return;  // teacher doesn't exists
      queryParam = { students: { "$in" : [student._id]} };  // filter by student id 
    } 

    const courses = await Course.find(queryParam)
      .populate('teacher')
      .populate('students')
      .lean();  // to ordinary js object to override user type and content

    for (let course of courses) {
      if (course.teacher) {  // get teacher with populated student ratings
        course.teacher = await getValidateTeacher(course.teacher.id, res, populateRatings=true);
      }

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
 
    console.log(`Success on fetching courses!`);
    return res.status(200).json({ courses: courses });

  } catch (error) {
    console.log(error);
    console.log(`Error fetching courses!`);
    return res.status(500).json({ message: "Un error ocurrió recuperando los cursos" })
  }
};


// UPDATE Course
exports.updateCourse = async (req, res, next) => {
  const id = req.params.id;
  const { name, grade } = req.body;
  console.log(`\nUpdating course (${id})...`);

  if (!id || !name || grade == undefined ) {
    console.log('\nCourse data field is missing')
    return res.status(500).json({ message: "Falta un campo del curso" });
  }

  const gradeIsInvalid = grade < 1 || grade > 6;  // primary school is range [1, 6]
  if (gradeIsInvalid) {
    console.log(`Course grade is invalid (${grade})!`);
    return res.status(500).json({ message: "Grado inválido" })
  }

  try {
    const course = await getValidateCourse(id, res);
    if (!course) return;

    course.name = name;
    course.grade = grade;
    await course.save();  // update document

    console.log(`Course updated successfully (${id} - ${name})!`);
    return res.status(201).json({ message: 'Se actualizó el curso exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error updating course!`);
    return res.status(500).json({ message: "Un error ocurrió actualizando el curso" })
  }
};


// DELETE Course
exports.deleteCourse = async (req, res, next) => {
  const id = req.params.id;
  console.log(`\nDeleting course (${id})...`);
  try {
    const results = await Course.deleteOne({ id: id });

    if (results.deletedCount == 0) {
      console.log(`Course doesn't exists (${id})!`);
      return res.status(500).json({ message: "Curso no existe" })
    } else {
      console.log(`Success on deleting course (${id})!`);
      return res.status(201).json({ message: 'Se eliminó el curso exitosamente' });
    }

  } catch (error) {
    console.log(error);
    console.log(`Error deleting curso!`);
    return res.status(500).json({ message: "Un error ocurrió eliminando el curso" })
  }
};
