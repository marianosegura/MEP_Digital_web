const { classPeriodOverlapsCourse } = require('../../validation/scheduleCheckers');
const { getValidateCourse } = require('../../validation/getValidators');

// POST Course Schedule
exports.createClassPeriod = async (req, res, next) => {
  const id = req.params.id;
  const { day, startHour, startMinutes, endHour, endMinutes} = req.body;
  
  if (day == undefined || startHour == undefined || startMinutes == undefined || endHour == undefined || endMinutes == undefined ) {
    console.log('\nClass period field is missing!')
    return res.status(500).json({ message: "Falta un campo del periodo de clase" });
  }

  const dayIsInvalid = day < 1 || day > 7;  //  hours should be in [0, 7[
  if (dayIsInvalid) {
    console.log(`Invalid day number (${day})!`);
    return res.status(500).json({ message: "Número de día inválido" })
  }

  const hoursAreInvalid = startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23;  //  hours should be in [0, 24[
  if (hoursAreInvalid) {
    console.log(`Invalid hour (start ${startHour}  or end ${endHour})!`);
    return res.status(500).json({ message: "Hora inicial o final inválida" })
  }

  const minutesAreInvalid = startMinutes < 0 || startMinutes > 59 || endMinutes < 0 || endMinutes > 59;  //  minutes should be in [0, 59[
  if (minutesAreInvalid) {
    console.log(`Invalid minutes (start ${startMinutes}  or end ${endMinutes})!`);
    return res.status(500).json({ message: "Minutos iniciales o finales inválidos" })
  }

  const newClassPeriod = { day, startHour, startMinutes, endHour, endMinutes };
  console.log(`\nAdding course (${id}) class period (day ${day} ${startHour}:${startMinutes}-${endHour}:${endMinutes})...`);
  try {
    const course = await getValidateCourse(id, res);
    if (!course) return;

    if (course.teacher || course.students.length > 0) {
      console.log(`Course schedule can't be modified while students are enrolled and a teacher is assigned!`)
      return res.status(500).json({ message: "Horario de curso no puede ser modificado mientras haya estudiantes inscritos y un profesor asignado" });
    }

    if (classPeriodOverlapsCourse(newClassPeriod, course)) {
      console.log(`New class period overlaps course schedule!`);
      return res.status(500).json({ message: "Nuevo periodo de clase choca con el horario del curso" })
    }

    course.schedule.push(newClassPeriod);  // push class period
    await course.save();  // update document

    console.log(`New class period added successfully!`);
    return res.status(201).json({ message: 'El nuevo periodo de clase se añadió exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error adding course class period!`);
    return res.status(500).json({ message: 'Un error ocurrió añadiendo el periodo de clase del curso' })
  }
};


// DELETE Course Schedule
exports.deleteClassPeriod = async (req, res, next) => {
  const { courseId, classPeriodId } = req.params;

  if (!classPeriodId) {
    console.log('\nClass period id field is missing!')
    return res.status(500).json({ message: "Falta el id de período de clase" });
  }

  console.log(`\nDeleting course class period (${classPeriodId})...`);
  try {
    const course = await getValidateCourse(courseId, res);
    if (!course) return;

    if (course.teacher || course.students.length > 0) {
      console.log(`Course schedule can't be modified while students are enrolled and a teacher is assigned!`)
      return res.status(500).json({ message: "Horario de curso no puede ser modificado mientras haya estudiantes inscritos y un profesor asignado" });
    }
    
    const classPeriod = course.schedule.find(period => period._id.equals(classPeriodId));
    if (classPeriod) {
      await course.schedule.pull(classPeriod._id);  // delete class period
    } else {
      console.log(`Class period doesn't exists (${classPeriodId})!`);
      return res.status(500).json({ message: "Período de clase no existe" })
    }
    course.save();  // update ratings

    console.log(`Success deleting class period!!`);
    return res.status(200).json({ message: "Eliminación de período de clase exitosa" });

  } catch (error) {
    console.log(error);
    console.log(`Error deleting class period!`);
    return res.status(500).json({ message: "Un error ocurrió eliminando el período de clase" })
  }
};
