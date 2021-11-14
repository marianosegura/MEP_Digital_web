import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import StudentIten from '../StudentIten'

export default function StudentList() {
  const courseId = useSelector(state => state.coursesInfo.selectCourse.id)
  const students = useSelector(state => state.coursesInfo.selectCourse.students)
  const email = useSelector(state => state.userInfo.email)
  const sendList = (e) => {
    e.preventDefault();
    var data = {
        email: email
    };
    var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses/" + courseId + "/students/email-list"
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
    })
    .catch((error) => {
      alert(JSON.parse(error.message).message)
    })
  }
  return (
    <div className="courseBasicInfo">
      <p>Lista de clase</p>
      <Box sx={{ maxWidth: 300 }}>
          <Button 
          variant="contained" 
          onClick={sendList}
          fullWidth={true}
          >
            Enviar lista
          </Button>
      </Box>
      {
        students !== undefined && students.length > 0
        ?
        (
          students.map((student) => {
            return (
              <StudentIten
              name={student.name}
              lastname={student.lastname}
              email={student.email}
              grade={student.grade}
              key={student.id}
              id={student.id}
              /> 
            )
          })
        ):(
          <p>Sin estudiantes</p>
        )
      }
    </div>
  )
}
