const { getValidateCourse } = require('../../validation/getValidators');


// POST Course News
exports.createCourseNews = async (req, res, next) => {
  const id = req.params.id;
  const { title, message, date } = req.body;
  
  if (!title || !message || !date) {
    console.log('\nCourse news field is missing')
    return res.status(500).json({ message: "Falta un campo de la noticia de curso" });
  }
  
  console.log(`\nCreating course news ${title}...`);
  try {
    const course = await getValidateCourse(id, res);
    if (!course) return;

    course.news.push({ title, message, date });  // add news
    await course.save();  // update document
    console.log(`Course news created successfully (${title})!`);
    return res.status(201).json({ message: 'Se creó la noticia del curso exitosamente' });

  } catch (error) {
    console.log(error);
    console.log(`Failed news creation (${title})!`);
    return res.status(500).json({ message: "Un error ocurrió creando la noticia de curso" })
  }
};


// PUT Course News
exports.updateCourseNews = async (req, res, next) => {
  const { courseId, newsId } = req.params;
  const { title, message } = req.body;

  if (!title || !message) {
    console.log('\nCourse news field is missing')
    return res.status(500).json({ message: "Falta un campo de la noticia de curso" });
  }

  console.log(`\nUpdating course news (${newsId})...`);
  try {
    const course = await getValidateCourse(courseId, res);
    if (!course) return;
    
    const news = course.news.find(courseNews => courseNews._id.equals(newsId));
    if (news) {
      course.news.id(news._id).title = title; 
      course.news.id(news._id).message = message; 
      await course.save();  // update course

      console.log(`Success updating course news!`);
      return res.status(200).json({ message: "Actualización de noticia de curso exitosa" });
    } else {
      console.log(`Course news doesn't exists (${newsId})!`);
      return res.status(500).json({ message: "Noticia de curso no existe" })
    }

  } catch (error) {
    console.log(error);
    console.log(`Error updating course news!`);
    return res.status(500).json({ message: "Un error ocurrió actualizando la noticia del curso" })
  }
};


// DELETE Course News
exports.deleteCourseNews = async (req, res, next) => {
  const { courseId, newsId } = req.params;

  if (!newsId) {
    console.log('\nNews id field is missing!')
    return res.status(500).json({ message: "Falta el id de la noticia de curso" });
  }

  console.log(`\nDeleting course news (${newsId})...`);
  try {
    const course = await getValidateCourse(courseId, res);
    if (!course) return;
    
    const news = course.news.find(courseNews => courseNews._id.equals(newsId));
    if (news) {
      await course.news.pull(news._id);  // delete course news
    } else {
      console.log(`Course news doesn't exists (${newsId})!`);
      return res.status(500).json({ message: "Noticia de curso no existe" })
    }
    await course.save();  // update news

    console.log(`Success deleting course news!`);
    return res.status(200).json({ message: "Eliminación de noticia de curso exitosa" });

  } catch (error) {
    console.log(error);
    console.log(`Error deleting course news!`);
    return res.status(500).json({ message: "Un error ocurrió eliminando la noticia del curso" })
  }
};
