const { getValidateStudent, getValidateTeacher } = require('../../validation/getValidators');

// PUT Teacher Rating
exports.updateTeacherRating = async (req, res, next) => {
  const teacherId = req.params.id;
  const { studentId, rating } = req.body;
  console.log(`\nRating teacher (${teacherId})...`);

  try {
    const teacher = await getValidateTeacher(teacherId, res);
    if (!teacher) return;

    const student = await getValidateStudent(studentId, res);
    if (!student) return;

    if (rating > 5 || rating < 1) {
      console.log(`Invalid rating (${rating})!`);  // rating has to be in [1, 5]
      return res.status(500).json({ message: "Calificación inválida (debe ser de 1 a 5)!" });
    }
    
    const teacherRating = teacher.ratings.find(ratingObject => ratingObject.student.equals(student._id));
    if (teacherRating) {
      teacher.ratings.id(teacherRating._id).rating = rating;  // update existing rating
    } else {
      teacher.ratings.push({  // push rating
        student: student._id,
        rating: rating
      });
    }
    teacher.save();  // update ratings

    console.log(`Success on rating teacher ${rating} (${teacher.name} ${teacher.lastname})!`);
    return res.status(200).json({ message: "Calificación de profesor exitosa" });

  } catch (error) {
    console.log(error);
    console.log(`Error rating teacher!`);
    return res.status(500).json({ message: "Un error ocurrió calificando el profesor" })
  }
};


// DELETE Teacher Rating
exports.deleteTeacherRating = async (req, res, next) => {
  const { teacherId, studentId } = req.params;
  console.log(`\nDeleting teacher (${teacherId}) rating by student (${studentId})...`);

  try {
    const teacher = await getValidateTeacher(teacherId, res);
    if (!teacher) return;

    const student = await getValidateStudent(studentId, res);
    if (!student) return;
    
    const teacherRating = teacher.ratings.find(ratingObject => ratingObject.student.equals(student._id));
    if (teacherRating) {
      await teacher.ratings.pull(teacherRating._id);  // update existing rating
    } else {
      console.log(`Student rating doesn't exists (${teacherId})!`);
      return res.status(500).json({ message: "Calificación del profesor no existe" })
    }
    teacher.save();  // update ratings

    console.log(`Success deleting teacher rating by student (${student.name} ${student.lastname})!`);
    return res.status(200).json({ message: "Eliminación de calificación de profesor exitosa" });

  } catch (error) {
    console.log(error);
    console.log(`Error deleting teacher rating!`);
    return res.status(500).json({ message: "Un error ocurrió eliminando la calificación del profesor" })
  }
};
