import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Box } from '@mui/system'
import { Button, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AssignmentsItem from './AssignmentsItem'

export default function Assignments(props) {
  const type = useSelector(state => state.userInfo.type)
  const courseId = useSelector(state => state.coursesInfo.selectCourse.id)
  const assignments = useSelector(state => state.coursesInfo.selectCourse.assignments)
  const [date, setDate] = useState(new Date())
  
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const sendAssignments = (e) => {
    e.preventDefault();
    var data = {
        title: title,
        description: message,
        submitDate: date
    };
    var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses/" + courseId + "/assignments"
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
        alert(json.description)
        props.getCourses()
        setTitle("")
        setMessage("")
    })
    .catch((error) => {
      alert(JSON.parse(error.message).message)
    })
  }
  return(
  <div className="courseBasicInfo">
  <p>Tareas</p>
  {type === "teacher" && (
  <Box sx={{ maxWidth: 300 }}>
      <TextField
        id="outlined-basic"
        inputProps={{ min: 0, style: { textAlign: "center" } }}
        label="Titulo de la tarea"
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
        label="Tarea"
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Fecha de entrega"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>
      <br />
      <br />
      <Button 
      variant="contained" 
      onClick={sendAssignments}
      fullWidth={true}
      >
        Enviar
      </Button>
    </Box>
  )}

  {assignments !== undefined && assignments.length > 0 ?
  (
    assignments.map((assignmentsItem) => {
      return(
        <AssignmentsItem 
        getCourses={props.getCourses}
        title={assignmentsItem.title}
        message={assignmentsItem.description}
        date={assignmentsItem.submitDate}
        id={assignmentsItem._id}
        key={assignmentsItem._id}
        />
      )
    })
  ):(
    <p>Sin tareas</p>
  )
  }
  
</div>
)
}
