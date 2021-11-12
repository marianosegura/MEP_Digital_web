import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";

export default function CourseBasiInfo(props) {
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [grade, setGrade] = useState(props.grade);

  function onChangeName(e) {
    setName(e.target.value);
  }
  function onChangeId(e) {
    setId(e.target.value);
  }
  function onChangeGrade(e) {
    setGrade(e.target.value);
  }
  function saveInfo(e){
    e.preventDefault();
    var data = {
        name:name,
        grade:grade
    };
    var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses"
    var myInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    if(!props.new){ //update
        direction = direction + "/" + id
        myInit.method = "PUT"
    } else { //create 
        data = {...data,id:id}
        myInit.body = JSON.stringify(data)
    }
    var myRequest = new Request(
        direction,
        myInit
    );
    fetch(myRequest)
    .then((response) => {
        if (!response.ok) {
            throw response;
        }
        return response.json(); //we only get here if there is no error
    })
    .then((json) => {
        alert(json.message)
        props.getCourses()
    });
  }
  useEffect(() => {
    setName(props.new ? "" : props.name);
    setId(props.new ? "" : props.id);
    setGrade(props.new ? "default" : props.grade);
  }, [props]);

  return (
    <div className="courseBasicInfo">
      <p>Información básica del curso</p>
      <form onSubmit={saveInfo}>
        <Box sx={{ maxWidth: 300 }}>
          <TextField
            id="outlined-basic"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            label="Id del curso"
            variant="outlined"
            name="id"
            disabled={!props.new}
            onChange={onChangeId}
            value={id}
            fullWidth={true}
          />
          <br />
          <br />
          <TextField
            id="courseName"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            label="Nombre del curso"
            variant="outlined"
            name="name"
            onChange={onChangeName}
            value={name}
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
              onChange={onChangeGrade}
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
          <Button 
          variant="contained" 
          type="submit"
          fullWidth={true}>
            Guardar
          </Button>
        </Box>
      </form>
    </div>
  );
}
