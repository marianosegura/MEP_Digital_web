import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Box } from '@mui/system'
import { Button, TextField } from '@mui/material'
import NewsItem from './NewsItem'

export default function News(props) {
  const type = useSelector(state => state.userInfo.type)
  const courseId = useSelector(state => state.coursesInfo.selectCourse.id)
  const news = useSelector(state => state.coursesInfo.selectCourse.news)

  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const sendNews = (e) => {
    e.preventDefault();
    var data = {
        title: title,
        message: message,
        date: new Date()
    };
    var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses/" + courseId + "/news"
    var myInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    var myRequest = new Request(
        direction,
        myInit
    );
    fetch(myRequest)
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then(text => {throw new Error(text)})
    })
    .then((json) => {
        alert(json.message)
        props.getCourses()
        setTitle("")
        setMessage("")
    })
    .catch((error) => {
      alert(JSON.parse(error.message).message)
    })
  }
  
  return (
    <div className="courseBasicInfo">
      <p>Noticias</p>
      {type === "teacher" && (
      <Box sx={{ maxWidth: 300 }}>
          <TextField
            id="outlined-basic"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            label="Titulo de noticia"
            variant="outlined"
            name="id"
            onChange={(e) => {setTitle(e.target.value)}}
            value={title}
            fullWidth={true}
          />
          <br />
          <br />
          <TextField
            id="courseName"
            label="Noticia"
            multiline
            rows={4}
            variant="outlined"
            name="news"
            onChange={(e) => {setMessage(e.target.value)}}
            value={message}
            fullWidth={true}
          />
          <br />
          <br />
          <Button 
          variant="contained" 
          onClick={sendNews}
          fullWidth={true}
          >
            Enviar
          </Button>
        </Box>
      )}

      {news !== undefined && news.length > 0 ?
      (
        news.map((newsItem) => {
          return(
            <NewsItem 
            getCourses={props.getCourses}
            title={newsItem.title}
            message={newsItem.message}
            date={newsItem.date}
            id={newsItem._id}
            key={newsItem._id}
            />
          )
        })
      ):(
        <p>Sin noticias</p>
      )
      }
      
    </div>
  )
}
