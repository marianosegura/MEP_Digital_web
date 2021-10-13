const bcrypt = require('bcryptjs');  // for password encryption
const Teacher = require('../../models/teacher');
const Course = require('../../models/course');
const { getValidateTeacher } = require('../../validation/getValidators');
const { sendPasswordEmail } = require ('../../emailing/emailUtils');
const { generatePassword } = require ('../../validation/passwordGenerators');


// POST Teacher
exports.createTeacher =  async (req, res, next) => {
  const {id, email, name, lastname } = req.body;
  
  if (!id || !email || !name || !lastname) {
    console.log('\nTeacher data field is missing')
    return res.status(500).json({ message: "Falta un campo del profesor" });
  }
  
  console.log(`\nCreating profesor ${name} ${lastname}...`);
  try {
    const idIsRegistered = await Teacher.exists({ id: id });
    if (idIsRegistered) {
      console.log(`Teacher id already registered (${id})!`);
      return res.status(500).json({ message: "Carnet ya está registrado" })
    }

    const emailIsRegistered = await Teacher.exists({ email: email });
    if (emailIsRegistered) {
      console.log(`Teacher email already registered (${email})!`);
      return res.status(500).json({ message: "Correo ya está registrado" })
    }

    const password = generatePassword();  // server generated password
    const encryptedPassword = await bcrypt.hash(password, 10);  // salt lenght 10 is secure and fast enough
    const passwordEmailResponse = await sendPasswordEmail(email, password);
    if (!passwordEmailResponse) {
      console.log(`Failed to send email with password (${email})!`);
      return res.status(500).json({ message: "Un error ocurrió enviando el correo con la contraseña" })
    }

    const teacher = new Teacher({ id, email, password: encryptedPassword, name, lastname });
    await teacher.save();  // call to create teacher
    
    console.log(`Teacher created successfully (${name} ${lastname})!`);
    return res.status(201).json({ message: 'Se creó el profesor exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Failed teacher creation (${name} ${lastname})!`);
    return res.status(500).json({ message: "Un error ocurrió creando el profesor" })
  }
};


// GET Teachers
exports.getTeachers =  async (req, res, next) => {
  console.log(`\nFetching all teachers...`);

  try {
    const teachers = await Teacher.find().populate('ratings.student');

    console.log(`Success on fetching all teachers!`);
    return res.status(200).json({ teachers });

  } catch (error) {
    console.log(error);
    console.log(`Error fetching all teachers!`);
    return res.status(500).json({ message: "Un error ocurrió recuperando todos los profesores" })
  }
};

// GET Teacher
exports.getTeacher = async (req, res, next) => {
  const id = req.params.id;
  console.log(`\nFetching teacher (${id})...`);
  try {
    const teacher = await getValidateTeacher(id, res, true);
    if (!teacher) return;

    console.log(`Success on fetching teacher (${teacher.name} ${teacher.lastname})!`);
    return res.status(200).json({ teacher });

  } catch (error) {
    console.log(error);
    console.log(`Error fetching teacher!`);
    return res.status(500).json({ message: "Un error ocurrió recuperando el profesor" })
  }
};


// UPDATE Teacher
exports.updateTeacher =  async (req, res, next) => {
  const id = req.params.id;
  const { email, name, lastname } = req.body;
  console.log(`\nUpdating teacher (${id}, ${name} ${lastname})...`);

  if (!id || !email || !name || !lastname) {
    console.log('\nTeacher data field is missing')
    return res.status(500).json({ message: "Falta un campo del profesor" });
  }

  try {
    const emailIsInUse = await Teacher.exists({ id: { $ne: id }, email: email });
    if (emailIsInUse) {
      console.log(`Email already in use (${email})!`);
      return res.status(500).json({ message: "Correo ya está en uso" })
    }
    
    const teacher = await getValidateTeacher(id, res);
    if (!teacher) return;

    teacher.email = email;
    teacher.name = name;
    teacher.lastname = lastname;
    await teacher.save();  // update document

    console.log(`Teacher updated successfully (${name} ${lastname})!`);
    return res.status(201).json({ message: 'Se actualizó el profesor exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error updating teacher!`);
    return res.status(500).json({ message: "Un error ocurrió actualizando el profesor" })
  }
};


// DELETE Teacher
exports.deleteTeacher =  async (req, res, next) => {
  const id = req.params.id;
  console.log(`\nDeleting teacher (${id})...`);
  try {
    const teacher = await getValidateTeacher(id, res);
    if (!teacher) return;

    const teacherCourses = await Course.find({ teacher: teacher._id }); 
    if (teacherCourses.length > 0) {
      console.log(`Can't delete a teacher with assigned courses!`)
      return res.status(500).json({ message: "No se puede eliminar un profesor con cursos asignados" });
    }

    await Course.updateMany(  // delete all teacher chat messages
      { "chat.user": teacher._id },
      { $pull : { chat : { user: teacher._id } } });

    await Teacher.deleteOne({ id: id });
    console.log(`Success on deleting teacher (${id})!`);
    return res.status(201).json({ message: 'Se eliminó el profesor exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error deleting teacher!`);
    return res.status(500).json({ message: "Un error ocurrió eliminando el profesor" })
  }
};