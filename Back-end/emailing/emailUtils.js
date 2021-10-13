
const sendgrid = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs');

sendgrid.setApiKey(process.env.SENDGRID_KEY);  // get environment variable sendgrid key 

/**
 * Sends a greetings email to a user with their account password.
 * @param string email User email
 * @param string password Server generated password
 * @returns Email response upon success, null otherwise.
 */
exports.sendPasswordEmail = async (email, password) => {
  const imageFile = fs.readFileSync(path.resolve(__dirname, 'greetings.png'));
  const imageData = Buffer.from(imageFile).toString('base64');
  
  const message = {
    to: email,
    from: 'mepdigitalweb@gmail.com', // Change to your verified sender
    subject: '¡Su contraseña del MEP Digital!',
    html: `<img src="cid:greetings"/><hr><p><strong>Correo: </strong>${email}</p><p><strong>Contraseña: </strong>${password}</p><hr>`,
    attachments: [
      {
        filename: 'greetings.png',
        contentType: 'image/png',
        content: imageData,
        content_id: "greetings",
        disposition: 'inline'
      }
    ]
  }

  try {
    return await sendgrid.send(message);
  } catch (error) {
    console.log(error);
    return null;
  }
}





