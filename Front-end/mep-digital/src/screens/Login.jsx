import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import React from "react";
import "../App.css";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userInfoAction } from "../redux/userReducer";
import { clearCoursesAction } from '../redux/courseReducer';

export default function Login() {
  const [type, setType] = useState("default")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const router = () => {
    switch (type) {
      case "student":
        goStudent();
        break;
      case "teacher":
        goTeacher();
        break;
      case "admin":
        goAdmin();
        break;
      default:
        break;
    }
  }

  const navigate = useNavigate();

  const goStudent = () => {
      navigate("/student")
  }

  const goTeacher = () => {
    navigate("/teacher")
  }
  const goAdmin = () => {
    navigate("/courses")
  }
  const dispatch = useDispatch()

  const loginPost = () => {
    var data = {
      email: userName,
      password: password,
      role: type,
    };

    var myInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    var myRequest = new Request(
      "https://desolate-everglades-59280.herokuapp.com/api/auth/login",
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
        let id = type ==="admin"?"admin":json.id
        dispatch(userInfoAction(id,userName,type))
        router();
      });
  }
  
  const checkInputData = () => {
    if (
      type !== "default" &&
      userName !== "" &&
      password !== ""
    ) {
      return true;
    }
    return false;
  };

  const onSummit = (e) => {
    e.preventDefault();
    dispatch(clearCoursesAction())
    if (checkInputData()) {
      console.log(
        userName + ":" + password + ":" + type
      );
      loginPost();
    } else {
      alert("Faltan datos para poder logearse");
    }
  };

  return (
      <form onSubmit={onSummit} className="Center">
        <Box
          sx={{ maxWidth: 300}}
        >
          <TextField
            id="outlined-basic"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            label="Usuario"
            variant="outlined"
            name="userName"
            onChange={e => setUserName(e.target.value)}
            fullWidth={true}
          /><br/><br/>
          <TextField
            id="outlined-password-input"
            label="Contraseña"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            fullWidth={true}
            /><br/><br/>
          <FormControl fullWidth={true}>
            <InputLabel id="demo-simple-select-label">
              Selecciona un tipo de usuario
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Selecciona un tipo de usuario"
              onChange={e => setType(e.target.value)}
            >
              <MenuItem value={"student"}>Estudiante</MenuItem>
              <MenuItem value={"teacher"}>Profesor</MenuItem>
              <MenuItem value={"admin"}>Administrador</MenuItem>
            </Select>
          </FormControl><br/><br/>
          <Button variant="contained" type="submit" fullWidth={true}>
            Entrar
          </Button>
        </Box>
      </form>
    );
}

