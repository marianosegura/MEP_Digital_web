const { getValidateCourse } = require('../../validation/getValidators');


// POST Course Assignment
exports.createCourseAssignment = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, submitDate } = req.body;
  
  if (!title || !description || !submitDate) {
    console.log('\nCourse assignment field is missing')
    return res.status(500).json({ description: "Falta un campo de la tarea de curso" });
  }
  
  console.log(`\nCreating course assignment ${title}...`);
  try {
    const course = await getValidateCourse(id, res);
    if (!course) return;

    course.assignments.push({ title, description, submitDate });  // add assignment
    await course.save();  // update document
    console.log(`Course assignment created successfully (${title})!`);
    return res.status(201).json({ description: 'Se creó la tarea del curso exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Failed assignment creation (${title})!`);
    return res.status(500).json({ description: "Un error ocurrió creando la tarea del curso" })
  }
};


// PUT Course Assignment
exports.updateCourseAssignment = async (req, res, next) => {
  const { courseId, assignmentId} = req.params;
  const { title, description, submitDate } = req.body;

  if (!title || !description || !submitDate) {
    console.log('\nCourse assignment field is missing')
    return res.status(500).json({ description: "Falta un campo de la tarea de curso" });
  }

  console.log(`\nUpdating course assignment (${assignmentId})...`);
  try {
    const course = await getValidateCourse(courseId, res);
    if (!course) return;
    
    const assignment = course.assignments.find(courseAssignment => courseAssignment._id.equals(assignmentId));
    if (assignment) {
      course.assignments.id(assignment._id).title = title; 
      course.assignments.id(assignment._id).description = description; 
      course.assignments.id(assignment._id).submitDate = submitDate; 
      await course.save();  // update course

      console.log(`Success updating course assignment!`);
      return res.status(200).json({ description: "Actualización de tarea de curso exitosa" });
    } else {
      console.log(`Course assignment doesn't exists (${assignmentId})!`);
      return res.status(500).json({ description: "Tarea de curso no existe" })
    }

  } catch (error) {
    console.log(error);
    console.log(`Error updating course assignment!`);
    return res.status(500).json({ description: "Un error ocurrió actualizando la tarea del curso" })
  }
};


// DELETE Course Assignment
exports.deleteCourseAssignment = async (req, res, next) => {
  const { courseId, assignmentId} = req.params;

  if (!assignmentId) {
    console.log('\nassignment id field is missing!')
    return res.status(500).json({ description: "Falta el id de la tarea de curso" });
  }

  console.log(`\nDeleting course assignment (${assignmentId})...`);
  try {
    const course = await getValidateCourse(courseId, res);
    if (!course) return;
    
    const assignment = course.assignments.find(courseAssignment => courseAssignment._id.equals(assignmentId));
    if (assignment) {
      await course.assignments.pull(assignment._id);  // delete course assignment
    } else {
      console.log(`Course assignment doesn't exists (${assignmentId})!`);
      return res.status(500).json({ description: "Tarea de curso no existe" })
    }
    await course.save();  // update assignment

    console.log(`Success deleting course assignment!`);
    return res.status(200).json({ description: "Eliminación de tarea de curso exitosa" });

  } catch (error) {
    console.log(error);
    console.log(`Error deleting course assignment!`);
    return res.status(500).json({ description: "Un error ocurrió eliminando la tarea del curso" })
  }
};
