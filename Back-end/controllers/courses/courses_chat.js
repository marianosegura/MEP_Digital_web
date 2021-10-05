const { getValidateCourse, getValidateStudent, getValidateTeacher } = require('../../validation/getValidators');


// POST Course Chat Message
exports.createCourseChatMessage = async (req, res, next) => {
  const id = req.params.id;
  const { userId, userType, message } = req.body;
  
  if (!userId || !userType || !message) {
    console.log('\nCourse chat message field is missing')
    return res.status(500).json({ message: "Falta un campo del mensaje de chat" });
  }
  
  console.log(`\nCreating course chat message ${userId}...`);
  try {
    const course = await getValidateCourse(id, res);
    if (!course) return;

    if (userType != 'Teacher' && userType != 'Student') {
      console.log(`Invalid user type ${userType}, must be Teacher or Student`)
      return res.status(500).json({ message: "Tipo de usuario inválido, debe ser estudiante o profesor" });
    }

    let user;
    if (userType === 'Teacher') {
      user = await getValidateTeacher(userId, res);
      if (!user) return;

      if (!course.teacher.equals(user._id)) {
        console.log(`Teacher user is not assigned course teacher!`)
        return res.status(500).json({ message: "Usuario profesor no es el profesor asignado del curso" });
      }
    } else {  // 'Student'
      user = await getValidateStudent(userId, res);
      if (!user) return;

      if (!course.students.includes(user._id)) {
        console.log(`Student user is not enrolled in the course!`)
        return res.status(500).json({ message: "Usuario estudiante no está inscrito en el curso" });
      }
    };

    course.chat.push({ user: user._id, userType, message });  // add chat message
    await course.save();  // update document
    console.log(`Course chat message created successfully (${userId})!`);
    return res.status(201).json({ message: 'Se creó el mensaje de chat exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Failed chat message creation (${userId})!`);
    return res.status(500).json({ message: "Un error ocurrió creando el mensaje de chat" })
  }
};


// PUT Course Chat Message
exports.updateCourseChatMessage = async (req, res, next) => {
  const { courseId, chatMessageId } = req.params;
  const { message } = req.body;

  if (!message) {
    console.log('\nCourse chat message field is missing')
    return res.status(500).json({ message: "Falta un campo del mensaje de chat" });
  }

  console.log(`\nUpdating course chat message (${chatMessageId})...`);
  try {
    const course = await getValidateCourse(courseId, res);
    if (!course) return;
    
    const chatMessage = course.chat.find(courseChatMessage => courseChatMessage._id.equals(chatMessageId));
    if (chatMessage) {
      course.chat.id(chatMessage._id).message = message; 
      await course.save();  // update course

      console.log(`Success updating course chat message!`);
      return res.status(200).json({ message: "Actualización de mensaje de chat exitosa" });
    } else {
      console.log(`Course chat message doesn't exists (${chatMessageId})!`);
      return res.status(500).json({ message: "Mensaje de chat no existe" })
    }

  } catch (error) {
    console.log(error);
    console.log(`Error updating course chatMessage!`);
    return res.status(500).json({ message: "Un error ocurrió actualizando el mensaje de chat" })
  }
};


// DELETE Course Chat Message
exports.deleteCourseChatMessage = async (req, res, next) => {
  const { courseId, chatMessageId } = req.params;

  if (!chatMessageId) {
    console.log('\nChat message id field is missing!')
    return res.status(500).json({ message: "Falta el id del mensaje de chat" });
  }

  console.log(`\nDeleting course chat message (${chatMessageId})...`);
  try {
    const course = await getValidateCourse(courseId, res);
    if (!course) return;
    
    const chatMessage = course.chat.find(courseChatMessage => courseChatMessage._id.equals(chatMessageId));
    if (chatMessage) {
      await course.chat.pull(chatMessage._id);  // delete course chat message
      await course.save();  // update chatMessage
    } else {
      console.log(`Course chat message doesn't exists (${chatMessageId})!`);
      return res.status(500).json({ message: "Mensaje de chat no existe" })
    };

    console.log(`Success deleting course chat message!`);
    return res.status(200).json({ message: "Eliminación de mensaje de chat exitosa" });

  } catch (error) {
    console.log(error);
    console.log(`Error deleting course chat message!`);
    return res.status(500).json({ message: "Un error ocurrió eliminando el mensaje de chat" })
  }
};
