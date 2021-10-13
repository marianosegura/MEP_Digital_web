const bcrypt = require('bcryptjs');  // for password encryption

const Admin = require('../models/admin');
const { sendPasswordEmail } = require ('../emailing/emailUtils');
const { generatePassword } = require ('../validation/passwordGenerators');



// POST Admin
exports.createAdmin = async (req, res, next) => {
  const { email } = req.body;
  
  if (!email ) {
    console.log('\nAdmin data field is missing')
    return res.status(500).json({ message: "Falta un campo del admin" });
  }
  
  console.log(`\nCreating admin ${email}...`);

  try {
    const emailIsRegistered = await Admin.exists({ email: email });
    if (emailIsRegistered) {
      console.log(`Admin email already registered (${email})!`);
      return res.status(500).json({ message: "Correo ya está registrado" })
    }

    const password = generatePassword();  // server generated password
    const encryptedPassword = await bcrypt.hash(password, 10);
    const passwordEmailResponse = await sendPasswordEmail(email, password);
    if (!passwordEmailResponse) {
      console.log(`Failed to send email with password (${email})!`);
      return res.status(500).json({ message: "Un error ocurrió enviando el correo con la contraseña" })
    }

    const admin = new Admin({ email, password: encryptedPassword });
    await admin.save();  // call to create admin
    
    console.log(`Admin created successfully (${email})!`);
    return res.status(201).json({ message: 'Se creó el admin exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Failed admin creation (${email})!`);
    return res.status(500).json({ message: "Un error ocurrió creando el admin" })
  }
};


// DELETE Admin
exports.deleteAdmin =  async (req, res, next) => {
  const { email } = req.body;
  console.log(`\nDeleting admin (${email})...`);
  try {
    const results = await Admin.deleteOne({ email: email });

    if (results.deletedCount == 0) {
      console.log(`Admin doesn't exists (${email})!`);
      return res.status(500).json({ message: "Admin no existe" })
    } else {
      console.log(`Success on deleting admin (${email})!`);
      return res.status(201).json({ message: 'Se eliminó el admin exitosamente' });
    }

  } catch (error) {
    console.log(error);
    console.log(`Error deleting admin!`);
    return res.status(500).json({ message: "Un error ocurrió eliminando el admin" })
  }
};
