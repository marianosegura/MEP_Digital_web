import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

export default function NewsItem(props) {
  const type = useSelector((state) => state.userInfo.type);
  const courseId = useSelector(state => state.coursesInfo.selectCourse.id)
  const handleClick = (e) => {
    e.preventDefault()
        var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses/" + courseId + "/news/" + props.id //id = _id
        var myInit = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
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
  return (
    <div className="scheduleItem">
      <p>{props.title}</p>
      <p>Fecha {props.date.split("T")[0]}</p>
      <p>{props.message}</p>

      {type === "teacher" && (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleClick}
          fullWidth={true}
        >
          Borrar
        </Button>
      )}
    </div>
  );
}
