import React from "react";
import ScheduleItem from "./ScheduleItem";
import { useState, useEffect } from "react";
import TimePicker from "@mui/lab/TimePicker";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";

export default function Schedule(props) {
  const [date] = useState(new Date());
  const [startTime, setStartTime] = useState(date);
  const [endTime, setEndTime] = useState(date);
  const [day, setDay] = useState(`default`);
  const [listSchedule, setListSchedule] = useState(props.schedule)

  const handleClick = (e) => {
    e.preventDefault();
    var data = {
        day: day,
        startHour: startTime.getHours(),
        startMinutes: startTime.getMinutes(),
        endHour: endTime.getHours(),
        endMinutes: endTime.getMinutes()
    };
    console.log(data)
    var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses/" + props.courseId + "/schedule"
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
        if (!response.ok) {
            throw response;
        }
        return response.json(); //we only get here if there is no error
    })
    .then((json) => {
        alert(json.message)
        props.getCourses()
    });

  };
  useEffect(() => {
    setListSchedule(props.schedule)
  }, [props]);
  return (
    <div className="schedule">
      <p>Horarios</p>
      {listSchedule.length > 0 ? (
        listSchedule.map((element) => {
          return (
            <ScheduleItem
              scheduleId={element._id}
              key={element._id}
              day={element.day}
              startHour={element.startHour}
              startMinutes={element.startMinutes}
              endHour={element.endHour}
              endMinutes={element.endMinutes}
              getCourses={props.getCourses}
              courseId={props.courseId}
            />
          );
        })
      ) : (
        <p>Lista vacia de horarios</p>
      )}
      <br />
      <br />
      <Box sx={{ maxWidth: 270 }}>
        <FormControl fullWidth={true} disabled={props.new}>
          <InputLabel id="select-grade-label">Día</InputLabel>
          <Select
            labelId="select-grade-label"
            id="grade-select"
            value={day}
            label="Selecciona un día"
            onChange={(e) => setDay(e.target.value)}
          >
            <MenuItem value={"default"} disabled>
              Selecciona
            </MenuItem>
            <MenuItem value={0}>Lunes</MenuItem>
            <MenuItem value={1}>Martes</MenuItem>
            <MenuItem value={2}>Miércoles</MenuItem>
            <MenuItem value={3}>Jueves</MenuItem>
            <MenuItem value={4}>Viernes</MenuItem>
            <MenuItem value={5}>Sabado</MenuItem>
            <MenuItem value={6}>Domingo</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <br />
          <br />
          <TimePicker
            label="Inicio"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
            fullWidth={true}
            disabled={props.new}
          />
          <br />
          <br />
          <TimePicker
            label="Fin"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
            className="timePiker"
            disabled={props.new}
          />
        </LocalizationProvider>
        <br />
        <br />
        <Button variant="contained" onClick={handleClick} fullWidth={true} disabled={props.new}>
          Guardar
        </Button>
      </Box>
    </div>
  );
}
