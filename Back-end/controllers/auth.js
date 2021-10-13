const bcrypt = require('bcryptjs');  // for password encryption
const Admin = require('../models/admin');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

// Login User
exports.loginUser = async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    console.log('\nAuth email, password or role is missing')
    return res.status(500).json({ message: "Falta email, contraseña o rol de usuario" });
  }

  console.log(`\nLogging in user ${email}`)

  if (!["admin", "student", "teacher"].includes(role)) {
    console.log(`User role ${role} doesn't exists`)
    return res.status(500).json({ message: "Rol de usuario no existe" });
  } 

  try {
    const condition = { email: email };
    const user = 
      (role == 'admin') ? await Admin.findOne(condition) 
      : (role == 'student') ? await Student.findOne(condition)
      : await Teacher.findOne(condition).populate('ratings.student');
    
    if (!user) {
      console.log(`User ${role} with email ${email} doesn't exists!`);
      return res.status(500).json({ message: "Usuario no existe" });
    }
    
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      console.log(`User ${role} with email ${email} successfully logged in!`);
      return res.status(200).json(user);
    }
    console.log(`Incorrect password!`);
    return res.status(500).json({ message: "Contraseña incorrecta" });
  
  } catch (error) {
    console.log(error);
    console.log(`Error loggin in user!`);
    return res.status(500).json({ message: "Un error ocurrió al intentar hacer login" })
  }
};


// Change Password
exports.changePassword = async (req, res, next) => {
  const { email, role, currentPassword, newPassword } = req.body;

  if (!email || !role || !currentPassword || !newPassword) {
    console.log('\nPassword change field is missing')
    return res.status(500).json({ message: "Falta un campo de cambio de contraseña" });
  }

  console.log(`\nChanging password (${email})`)

  if (!["admin", "student", "teacher"].includes(role)) {
    console.log(`User role ${role} doesn't exists`)
    return res.status(500).json({ message: "Rol de usuario no existe" });
  } 

  try {
    const condition = { email: email };
    const user = 
      (role == 'admin') ? await Admin.findOne(condition) 
      : (role == 'student') ? await Student.findOne(condition)
      : await Teacher.findOne(condition);
    
    if (!user) {
      console.log(`User ${role} with email ${email} doesn't exists!`);
      return res.status(500).json({ message: "Usuario no existe" });
    }
    
    const correctPassword = await bcrypt.compare(currentPassword, user.password);
    if (!correctPassword) {
      console.log(`Incorrect current password (${email})`);
      return res.status(500).json({ message: "Contraseña actual incorrecta" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);  // encrypt new password
    user.password = encryptedPassword;  // override current password
    await user.save();  // save document

    console.log(`Password changed successfully (${email})`);
    return res.status(201).json({ message: 'Se cambió la contraseña exitosamente' });
  
  } catch (error) {
    console.log(error);
    console.log(`Error changing user password!`);
    return res.status(500).json({ message: "Un error ocurrió al intentar cambiar la contraseña" })
  }
};
