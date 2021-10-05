const Course = require('../../models/course');
const { scheduleOverlapsCourses } = require('../../validation/scheduleCheckers');
const { getValidateTeacher, getValidateCourse } = require('../../validation/getValidators');


// UPDATE Course Teacher
exports.updateCourseTeacher = async (req, res, next) => {
  const courseId = req.params.id;
  const teacherId = req.body.teacherId;
  
  if (!teacherId ) {
    console.log('\nTeacher id is missing')
    return res.status(500).json({ message: "Falta el id del profesor" });
  }

  console.log(`\nUpdating course (${courseId}) teacher (${teacherId})...`);
  try {
    const teacher = await getValidateTeacher(teacherId, res);
    if (!teacher) return;

    const course = await getValidateCourse(courseId, res);
    if (!course) return;

    if (course.schedule.length === 0) {
      console.log(`Course doesn't have a schedule yet!`)
      return res.status(500).json({ message: "Curso no tiene un horario definido todavía" });
    }

    const teacherCourses = await Course.find({ teacher: teacher._id });  // get current teacher courses
    const isNotCourseTeacher = !teacher._id.equals(course.teacher);
    if (isNotCourseTeacher && scheduleOverlapsCourses(course.schedule, teacherCourses)) {
      console.log('Course schedule overlaps teacher schedule!')
      return res.status(500).json({ message: "Horario de clases del profesor choca con horario de curso" });
    }

    course.teacher = teacher._id;
    await course.save();  // update document

    console.log(`Course (${course.name}) teacher (${teacher.name} ${teacher.lastname}) updated successfully!`);
    return res.status(201).json({ message: 'Se actualizó el profesor del curso exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error updating course teacher!`);
    return res.status(500).json({ message: "Un error ocurrió actualizando el profesor del curso" })
  }
};


// DELETE Course Teacher
exports.deleteCourseTeacher =  async (req, res, next) => {
  const id = req.params.id;

  console.log(`\nDeleting course (${id}) teacher...`);
  try {
    const course = await getValidateCourse(id, res);
    if (!course) return;

    console.log(course.students);
    if (course.students.length > 0) {
      console.log(`Can't delete teacher from a course with enrolled students!`)
      return res.status(500).json({ message: "No se puede eliminar el profesor de un curso con estudiantes inscritos" });
    }

    course.teacher = undefined;  // remove teacher attribute
    await course.save();  // update document

    console.log(`Course (${course.name}) teacher removed successfully!`);
    return res.status(201).json({ message: 'Se removió al profesor del curso exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error removed course teacher!`);
    return res.status(500).json({ message: "Un error ocurrió removiendo al profesor del curso" })
  }
};
