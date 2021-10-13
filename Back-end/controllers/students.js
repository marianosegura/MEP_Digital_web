const bcrypt = require('bcryptjs');  // for password encryption

const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const { getValidateStudent } = require('../validation/getValidators');
const { sendPasswordEmail } = require ('../emailing/emailUtils');
const { generatePassword } = require ('../validation/passwordGenerators');


// POST Student
exports.createStudent = async (req, res, next) => {
  const {id, email, name, lastname, grade } = req.body;
  
  if (!id || !email || !name || !lastname || !grade) {
    console.log('\nStudent data field is missing')
    return res.status(500).json({ message: "Falta un campo del estudiante" });
  }
  
  console.log(`\nCreating student ${name} ${lastname}...`);
  try {
    const idIsRegistered = await Student.exists({ id: id });
    if (idIsRegistered) {
      console.log(`Student id already registered (${id})!`);
      return res.status(500).json({ message: "Carnet ya está registrado" })
    }

    const emailIsRegistered = await Student.exists({ email: email });
    if (emailIsRegistered) {
      console.log(`Student email already registered (${email})!`);
      return res.status(500).json({ message: "Correo ya está registrado" })
    }

    const gradeIsInvalid = grade < 1 || grade > 6;  // primary school is range [1, 6]
    if (gradeIsInvalid) {
      console.log(`Student grade is invalid (${grade})!`);
      return res.status(500).json({ message: "Grado inválido" })
    }

    const password = generatePassword();  // server generated password
    const encryptedPassword = await bcrypt.hash(password, 10);  // salt lenght 10 is secure and fast enough
    const passwordEmailResponse = await sendPasswordEmail(email, password);
    if (!passwordEmailResponse) {
      console.log(`Failed to send email with password (${email})!`);
      return res.status(500).json({ message: "Un error ocurrió enviando el correo con la contraseña" })
    }
    
    const student = new Student({ id, email, password: encryptedPassword, name, lastname, grade });
    await student.save();  // call to create student

    console.log(`Student created successfully (${name} ${lastname})!`);
    return res.status(201).json({ message: 'Se creó el estudiante exitosamente' });
  }
   catch (error) {
    console.log(error);
    console.log(`Failed student creation (${name} ${lastname})!`);
    return res.status(500).json({ message: "Un error ocurrió creando el estudiante" })
  }
};


// GET Student
exports.getStudent = async (req, res, next) => {
  const id = req.params.id;
  console.log(`\nFetching student (${id})...`);
  try {
    const student = await getValidateStudent(id, res);
    if (!student) return;

    console.log(`Success on fetching student (${student.name} ${student.lastname})!`);
    return res.status(200).json({ student });

  } catch (error) {
    console.log(error);
    console.log(`Error fetching student!`);
    return res.status(500).json({ message: "Un error ocurrió recuperando el estudiante" })
  }
};


// GET Students
exports.getStudents =  async (req, res, next) => {
  console.log(`\nFetching all students...`);

  try {
    const students = await Student.find();
    console.log(`Success on fetching all students!`);
    return res.status(200).json({ students });

  } catch (error) {
    console.log(error);
    console.log(`Error fetching all students!`);
    return res.status(500).json({ message: "Un error ocurrió recuperando todos los estudiantes" })
  }
};


// UPDATE Student
exports.udpateStudent =  async (req, res, next) => {
  const id = req.params.id;
  const { email, name, lastname, grade } = req.body;
  console.log(`\nUpdating student (${id}, ${name} ${lastname})...`);

  if (!id || !email || !name || !lastname || !grade) {
    console.log('\nStudent data field is missing')
    return res.status(500).json({ message: "Falta un campo del estudiante" });
  }

  try {
    const emailIsInUse = await Student.exists({ id: { $ne: id }, email: email });
    if (emailIsInUse) {
      console.log(`Email already in use (${email})!`);
      return res.status(500).json({ message: "Correo ya está en uso" })
    }
    const gradeIsInvalid = grade < 1 || grade > 6;  // primary school is range [1, 6]
    if (gradeIsInvalid) {
      console.log(`Student grade is invalid (${grade})!`);
      return res.status(500).json({ message: "Grado inválido" })
    }
    
    const student = await getValidateStudent(id, res);
    if (!student) return;
    
    const isEnrolled = await Course.exists({ students: { "$in" : [student._id]} });
    const isChangingGrade = grade !== student.grade;
    if (isEnrolled && isChangingGrade) {
      console.log(`Enrolled student can't change grade!`);
      return res.status(500).json({ message: "Estudiante no puede cambiar de grado porque está inscrito en cursos" })
    };

    student.email = email;
    student.name = name;
    student.lastname = lastname;
    student.grade = grade;
    await student.save();  // update document

    console.log(`Student updated successfully (${name} ${lastname})!`);
    return res.status(201).json({ message: 'Se actualizó el estudiante exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error updating student!`);
    return res.status(500).json({ message: "Un error ocurrió actualizando el estudiante" })
  }
};


// DELETE Student
exports.deleteStudent =  async (req, res, next) => {
  const id = req.params.id;
  console.log(`\nDeleting student (${id})...`);
  try {
    const student = await getValidateStudent(id, res);
    await Course.updateMany(  // disenroll from all courses
      { students: { "$in" : [student._id]} },
      { $pull : { students : student._id } });
    
    await Course.updateMany(  // delete all student chat messages
      { "chat.user": student._id },
      { $pull : { chat : { user: student._id } } });

    await Teacher.updateMany(  // delete all teacher ratings made by the student
      { "ratings.student": student._id }, 
      { $pull: { ratings: { student: student._id } } });

    await Student.deleteOne({ id: id });  // delete student document
    console.log(`Success on deleting student (${id})!`);
    return res.status(201).json({ message: 'Se eliminó el estudiante exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Error deleting student!`);
    return res.status(500).json({ message: "Un error ocurrió eliminando el estudiante" })
  }
};
