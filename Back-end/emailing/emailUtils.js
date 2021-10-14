
const sendgrid = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs');
const PDFDocument = require("pdfkit-table");

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

/**
 * Sends a pdf with a table of a course's students to an email.
 * @param string email Email to send to
 * @param {*} course Course with students
 * @param function callback Callback function
 */
exports.sendStudentsListEmail = (email, course, callback) => {
  const tableData = course.students.map(s => { return [s.id, s.name, s.lastname, s.grade, s.email] });
  const table = {
    title: `${course.name} (${course.id}) - Estudiantes`,
    headers: ["Cédula", "Nombre", "Apellidos", "Grado", "Correo"],
    rows: tableData
  };
  const pdf = new PDFDocument({ margin: 30, size: 'A4' }); 
  const pdfWriteStream = fs.createWriteStream(path.join(__dirname, "estudiantes.pdf"));
  pdf.pipe(pdfWriteStream);  // open pdf
  pdf.table(table, {});  // save pdf data
  pdf.end();  // close pdf

  pdfWriteStream.on('finish', () => {  // wait for writing pdf stream to finish
    const pdfData = fs.readFileSync(path.resolve(__dirname, "estudiantes.pdf")).toString("base64");
    
    const message = {
      to: email,
      from: 'mepdigitalweb@gmail.com', // Change to your verified sender
      subject: `[MEP Digital] ${course.name} - Estudiantes`,
      text: `Lista de estudiantes del curso ${course.name}`,
      attachments: [
        {
          filename: `estudiantes-${course.id}.pdf`,
          content: pdfData,
          type: 'application/pdf',
          disposition: 'attachment',
          contentId: 'pdfId'
        }
      ]
    };

    sendgrid.send(message)
      .then((res) => callback(null))  // null error, success
      .catch((error) => {
        console.log(error);
        callback(error);
      })
  });

}




