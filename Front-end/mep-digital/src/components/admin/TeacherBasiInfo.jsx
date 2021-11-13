import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";

export default function TeacherBasiInfo(props) {
  //State
  const selectTeacher = useSelector(
    (state) => state.teachersInfo.selectTeacher
  );
  const newFlag = useSelector((state) => state.teachersInfo.newFlag);
  const [id, setId] = useState(selectTeacher.id);
  const [name, setName] = useState(selectTeacher.name);
  const [lastname, setLastname] = useState(selectTeacher.lastname);
  const [email, setEmail] = useState(selectTeacher.email);
  //Button functions
  const deleteTeacher = (e) => {
    e.preventDefault();
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/teachers/" + id;
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
        props.getCourses();
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message);
      });
  };
  const saveTeacher = (e) => {
    e.preventDefault();
    var data = {
      name: name,
      lastname: lastname,
      email: email,
    };
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/teachers";
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
        props.getTeachers();
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message);
      });
  };
  //Use effect praaaa!
  useEffect(() => {
    setName(newFlag ? "" : selectTeacher.name);
    setId(newFlag ? "" : selectTeacher.id);
    setLastname(newFlag ? "" : selectTeacher.lastname);
    setEmail(newFlag ? "" : selectTeacher.email);
  }, [selectTeacher, newFlag]);

  return (
    <div className="courseBasicInfo">
      <p>Información básica del Profesor</p>
      <Box sx={{ maxWidth: 300 }}>
        <TextField
          id="outlined-basic"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          label="Id del profesor"
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
        <Button variant="contained" onClick={saveTeacher} fullWidth={true}>
          Guardar
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          onClick={deleteTeacher}
          fullWidth={true}
          disabled={newFlag}
        >
          Eliminar
        </Button>
      </Box>
    </div>
  );
}
