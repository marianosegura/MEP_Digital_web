import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Box } from '@mui/system'
import { Button, TextField } from '@mui/material'
import ChatItem from './ChatItem'

export default function Chat(props) {
  const userId = useSelector(state => state.userInfo.userId)
  const type = useSelector(state => state.userInfo.type)
  const courseId = useSelector(state => state.coursesInfo.selectCourse.id)
  const chat = useSelector(state => state.coursesInfo.selectCourse.chat)

  const [message, setMessage] = useState("")

  const sendMessage = (e) => {
    e.preventDefault();
    var data = {
        userId: userId,
        userType: type.charAt(0).toUpperCase() + type.slice(1),
        message: message
    };
    var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses/" + courseId + "/chat"
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
        setMessage("")
    })
    .catch((error) => {
      alert(JSON.parse(error.message).message)
    })
  }
  return (
    <div className="courseBasicInfo">
      <p>Chat</p>
      <Box sx={{ maxWidth: 300 }}>
          
          <TextField
            id="courseName"
            label="Mensaje"
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
          onClick={sendMessage}
          fullWidth={true}
          >
            Enviar
          </Button>
        </Box>
        {chat !== undefined && chat.length > 0
        ?(
          chat.map((chatItem) => {
            return (
              <ChatItem
              name={chatItem.user.name}
              lastname={chatItem.user.lastName}
              message={chatItem.message}
              type={chatItem.userType}//have Capitalize first letter eg: Teacher
              />
            )
          })
        ):(
          <p>Sin mensajes</p>
        )}
    </div>
  )
}
