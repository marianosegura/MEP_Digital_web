import React from 'react'
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@mui/material";


export default function StudentBasiInfo(props) {
  //State (Redux)
  const selectStudent = useSelector(state => state.studentsInfo.selectStudent)
  const newFlag = useSelector(state => state.studentsInfo.newFlag)
  //State (Component)
  const [id, setId] = useState(selectStudent.id);
  const [name, setName] = useState(selectStudent.name);
  const [lastname, setLastname] = useState(selectStudent.lastname);
  const [email, setEmail] = useState(selectStudent.email);
  const [grade, setGrade] = useState(selectStudent.grade)
  //Button functions
  const deleteStudent = (e) => {
    e.preventDefault();
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/students/" + id;
    var myInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    var myRequest = new Request(direction, myInit);
    fetch(myRequest)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((json) => {
        alert(json.message);
        props.getStudents();
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message);
      });
  };
  const saveStudent = (e) => {
    e.preventDefault();
    var data = {
      name: name,
      lastname: lastname,
      email: email,
      grade: grade,
    };
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/students";
    var myInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    if (!newFlag) {
      //update
      direction = direction + "/" + id;
      myInit.method = "PUT";
    } else {
      //create
      data = { ...data, id: id };
      myInit.body = JSON.stringify(data);
    }
    var myRequest = new Request(direction, myInit);
    fetch(myRequest)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((json) => {
        alert(json.message);
        props.getStudents();
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message);
      });
  };
  //Use effect praaaa!
  useEffect(() => {
    setName(newFlag ? "" : selectStudent.name);
    setId(newFlag ? "" : selectStudent.id);
    setLastname(newFlag ? "" : selectStudent.lastname);
    setEmail(newFlag ? "" : selectStudent.email);
    setGrade(newFlag ? "" : selectStudent.grade)
  }, [selectStudent, newFlag]);
  return (
    <div className="courseBasicInfo">
      <p>Información básica del Estudiante</p>
      <Box sx={{ maxWidth: 300 }}>
        <TextField
          id="outlined-basic"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          label="Id del estudiante"
          variant="outlined"
          name="id"
          disabled={!newFlag}
          onChange={(e) => {
            setId(e.target.value);
          }}
          value={id}
          fullWidth={true}
        />
        <br />
        <br />
        <TextField
          id="courseName"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          label="Nombre"
          variant="outlined"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          fullWidth={true}
        />
        <br />
        <br />
        <TextField
          id="courseName"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          label="Apellidos"
          variant="outlined"
          name="lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          value={lastname}
          fullWidth={true}
        />
        <br />
        <br />
        <TextField
          id="courseName"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          label="Correo"
          variant="outlined"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          fullWidth={true}
        />
        <br />
        <br />
        <FormControl fullWidth={true}>
            <InputLabel id="select-grade-label">Selecciona el grado</InputLabel>
            <Select
              labelId="select-grade-label"
              id="grade-select"
              value={grade}
              label="Selecciona el grado"
              onChange={(e) => {setGrade(e.target.value)}}
            >
              <MenuItem value={"default"} disabled>
                Selecciona
              </MenuItem>
              <MenuItem value={"1"}>Primer año</MenuItem>
              <MenuItem value={"2"}>Segundo año</MenuItem>
              <MenuItem value={"3"}>Tercer año</MenuItem>
              <MenuItem value={"4"}>Cuarto año</MenuItem>
              <MenuItem value={"5"}>Quinto año</MenuItem>
              <MenuItem value={"6"}>Sexto año</MenuItem>
            </Select>
          </FormControl>
        <br />
        <br />
        <Button variant="contained" onClick={saveStudent} fullWidth={true}>
          Guardar
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          onClick={deleteStudent}
          fullWidth={true}
          disabled={newFlag}
        >
          Eliminar
        </Button>
      </Box>
    </div>
  )
}
