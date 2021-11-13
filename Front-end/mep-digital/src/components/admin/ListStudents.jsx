import React from "react";
import StudentItem from "./StudentItem";
import { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";

export default function ListStudents(props) {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [grade, setGrade] = useState("");

  function onChangeId(e) {
    setStudentId(e.target.value);
  }

  const searchStudent = (e) => {
    e.preventDefault();
    if (studentId !== "") {
      var direction =
        "https://desolate-everglades-59280.herokuapp.com/api/students/" + studentId;
      var myInit = {
        method: "GET",
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
          setStudentName(json.student.name);
          setStudentLastName(json.student.lastname);
          setGrade(json.student.grade)
        })
        .catch((error) => {
          alert(JSON.parse(error.message).message);
        });
    }
  };
  const addStudent = (e) => {
    e.preventDefault();
    var data = {
        studentId: studentId,
    };
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/courses/" +
      props.courseId + "/students";
    var myInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
        props.getCourses();
        alert(json.message);
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message);
      });
  };

  const getYear = () => {
    switch (grade) {
      case 1:
        return "Primero";
      case 2:
        return "Segundo";
      case 3:
        return "Tercero";
      case 4:
        return "Cuarto";
      case 5:
        return "Quinto";
      case 6:
        return "Sexto";
      default:
        return "";
    }
  };

  return (
    <div className="selectTeacher">
      <p>
        List de estudiantes (
        {props.students !== undefined ? props.students.length : 0})
      </p>
      <Box sx={{ maxWidth: 300 }}>
        <TextField
          id="outlined-basic"
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          label="Id del estudiante"
          variant="outlined"
          name="id"
          disabled={props.new}
          onChange={onChangeId}
          value={studentId}
          fullWidth={true}
          type="number"
        />
        <br />
        <br />
        <Button
          variant="contained"
          fullWidth={true}
          onClick={searchStudent}
          disabled={props.new}
        >
          Buscar
        </Button>
        <p>
          Nombre: {studentName} {studentLastName}
        </p>
        <p>Cursando: {getYear()}</p>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={addStudent}
          disabled={props.new}
        >
          Agregar
        </Button>
        <br />
        <br />
      </Box>
      {props.students !== undefined && props.students.length > 0 ? (
        props.students.map((student) => {
          return (
            <StudentItem
              getCourses={props.getCourses}
              name={student.name}
              lastname={student.lastname}
              id={student.id}
              key={student.id}
              courseId={props.courseId}
            />
          );
        })
      ) : (
        <p>Sin estudiantes agregados a esta clase</p>
      )}
    </div>
  );
}
