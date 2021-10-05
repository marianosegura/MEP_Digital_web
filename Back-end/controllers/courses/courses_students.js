const Course = require('../../models/course');
const { scheduleOverlapsCourses } = require('../../validation/scheduleCheckers');
const { getValidateStudent, getValidateCourse } = require('../../validation/getValidators');


// POST Course Student
exports.createCourseStudent = async (req, res, next) => {
  const courseId = req.params.id;
  const studentId = req.body.studentId;
  
  if (!studentId) {
    console.log('\nStudent id is missing')
    return res.status(500).json({ message: "Falta el id del estudiante" });
  }

  console.log(`\nEnrolling student (${studentId}) to course (${courseId})...`);
  try {
    const student = await getValidateStudent(studentId, res);
    if (!student) return;

    const course = await getValidateCourse(courseId, res);
    if (!course) return;

    if (student.grade != course.grade) {
      console.log(`Student and course grades don't match! (${student.grade}!=${course.grade})`)
      return res.status(500).json({ message: "Grado de estudiante y curso no coinciden" });
    }

    if (course.schedule.length === 0) {
      console.log(`Course doesn't have a schedule yet!`)
      return res.status(500).json({ message: "Curso no tiene un horario definido todavía" });
    }

    if (course.teacher == undefined) {
      console.log(`Course doesn't have a teacher!`)
      return res.status(500).json({ message: "Curso no tiene un profesor asignado todavía" });
    }

    for(const studentIdObject of course.students) {
      if (student._id.equals(studentIdObject)) {
        console.log('Student already enrolled!')
        return res.status(500).json({ message: "Estudiante ya está inscrito en el curso" });
      }
    }

    const studentCourses = await Course.find({ students: { "$in" : [student._id]} });  // get student enrolled courses
    if (scheduleOverlapsCourses(course.schedule, studentCourses)) {
      console.log('Course schedule overlaps student schedule!')
      return res.status(500).json({ message: "Horario de clases del estudiante choca con horario de curso" });
    }

    course.students.push(student._id);  // push student ref
    await course.save();  // update document

    console.log(`Student enrolled successfully!`);
    return res.status(201).json({ message: 'Se inscribió el estudiante exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error enrolling student!`);
    return res.status(500).json({ message: "Un error ocurrió inscribiendo el estudiante" })
  }
};


// DELETE Course Student
exports.deleteCourseStudent = async (req, res, next) => {
  const { courseId, studentId } = req.params;
  
  if (!studentId) {
    console.log('\nStudent id is missing')
    return res.status(500).json({ message: "Falta el id del estudiante" });
  }

  console.log(`\nDisenrolling student (${studentId}) from course (${courseId})...`);
  try {
    const student = await getValidateStudent(studentId, res);
    if (!student) return;

    const course = await getValidateCourse(courseId, res);
    if (!course) return;

    let studentIsEnrolled = false;
    course.students.forEach(courseStudent => studentIsEnrolled = studentIsEnrolled || student._id.equals(courseStudent));
    if (!studentIsEnrolled) {
      console.log('Student is not enrolled!')
      return res.status(500).json({ message: "Estudiante no está inscrito en el curso" });
    }

    course.students.pull(student._id);  // remove student ref
    await course.save();  // update document

    console.log(`Student disenrolled successfully!`);
    return res.status(201).json({ message: 'Se dio de baja al estudiante exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error disenrolling student!`);
    return res.status(500).json({ message: "Un error ocurrió dando de baja al estudiante" })
  }
};