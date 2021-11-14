import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function RatingTeacher() {
  const teacher = useSelector(
    (state) => state.coursesInfo.selectCourse.teacher
  );
  const [qualification, setQualification] = useState("");
  const userId = useSelector((state) => state.userInfo.userId);

  const handleClick = (e) => {
    e.preventDefault();
    var data = {
      studentId: userId,
      rating: qualification,
    };
    var direction =
      "https://desolate-everglades-59280.herokuapp.com/api/teachers/" +
      teacher.id +
      "/ratings";
    var myInit = {
      method: "PUT",
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
        alert(json.message);
      })
      .catch((error) => {
        alert(JSON.parse(error.message).message);
      });
  };

  return (
    <div className="courseBasicInfo">
      {teacher !== undefined ? (
        <div>
          <p>Califica al profesor</p>
          <p>
            {teacher.name} {teacher.lastname}
          </p>
          <p>{teacher.email}</p>
          <FormControl fullWidth={true}>
            <InputLabel id="select-grade-label">Selecciona el grado</InputLabel>
            <Select
              labelId="select-grade-label"
              id="grade-select"
              value={qualification}
              label="Selecciona el grado"
              onChange={(e) => {
                setQualification(e.target.value);
              }}
            >
              <MenuItem value={"default"} disabled>
                Califica
              </MenuItem>
              <MenuItem value={"1"}>1 Estrella</MenuItem>
              <MenuItem value={"2"}>2 Estrella</MenuItem>
              <MenuItem value={"3"}>3 Estrella</MenuItem>
              <MenuItem value={"4"}>4 Estrella</MenuItem>
              <MenuItem value={"5"}>5 Estrella</MenuItem>
            </Select>
          </FormControl>
          <br /> <br />
          <Button variant="contained" onClick={handleClick} fullWidth={true}>
            Calificar
          </Button>
        </div>
      ) : (
        <p>Cargando</p>
      )}
    </div>
  );
}
