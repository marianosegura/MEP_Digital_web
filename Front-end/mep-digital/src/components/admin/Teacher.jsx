import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";

export default function Teacher(props) {
  const [teacherId, setTeacherId] = useState(props.teacherId);
  const [teacherName, setTeacherName] = useState(props.teacherName);
  const [teacherLastName, setTeacherLastName] = useState(props.teacherLastName);
  const searchTeacher = (e) => {
    e.preventDefault();
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/teachers/" + teacherId;
    var myInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    var myRequest = new Request(direction, myInit);
    fetch(myRequest)
      .then((response) => {
        if(response.ok){
          return response.json();
        }
        return response.text().then(text => {throw new Error(text)})
      })
      .then((json) => {
        setTeacherName(json.teacher.name);
        setTeacherLastName(json.teacher.lastname);
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message)
      })
      
  };
  const updteTeacher = (e) => {
    e.preventDefault();
    var data = {
      teacherId: teacherId
    };
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/courses/" + props.courseId + "/teacher"
    var myInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    var myRequest = new Request(direction, myInit);
    fetch(myRequest)
      .then((response) => {
        if(response.ok){
          return response.json();
        }
        return response.text().then(text => {throw new Error(text)})
      })
      .then((json) => {
        props.getCourses()
        alert(json.message)
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message)
      })
  };
  const deleteTeacher = (e) => {
    e.preventDefault();
    var data = {
      teacherId: teacherId
    };
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/courses/" + props.courseId + "/teacher"
    var myInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    var myRequest = new Request(direction, myInit);
    fetch(myRequest)
      .then((response) => {
        if(response.ok){
          return response.json();
        }
        return response.text().then(text => {throw new Error(text)})
      })
      .then((json) => {
        alert(json.message)
        props.getCourses()
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message)
      })
  }

  function onChangeId(e) {
    setTeacherId(e.target.value);
  }

  useEffect(() => {
    setTeacherId(props.teacherId);
    setTeacherName(props.teacherName);
    setTeacherLastName(props.teacherLastName);
  }, [props]);

  return (
    <div className="selectTeacher">
      <p>Selección de profesor</p>
      <Box sx={{ maxWidth: 300 }}>
        <TextField
          id="outlined-basic"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          label="Id del profesor"
          variant="outlined"
          name="id"
          disabled={props.new}
          onChange={onChangeId}
          value={teacherId}
          fullWidth={true}
        />
        <br />
        <br />
        <Button
          variant="contained"
          fullWidth={true}
          onClick={searchTeacher}
          disabled={props.new}
        >
          Buscar
        </Button>
        <p>
          Nombre: {teacherName} {teacherLastName}
        </p>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={updteTeacher}
          disabled={props.new}
        >
          Seleccionar
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          fullWidth={true}
          onClick={deleteTeacher}
          disabled={props.new}
        >
          Eliminar
        </Button>
      </Box>
    </div>
  );
}
