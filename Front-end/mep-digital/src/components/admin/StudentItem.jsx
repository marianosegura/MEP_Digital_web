import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

export default function StudentItem(props) {
    const handleClick = (e) => {
        e.preventDefault()
        var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses/" + props.courseId + "/students/" + props.id
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
    }
    return (
        <div className = "scheduleItem">
            <p>{props.name} {props.lastname}</p>
            <p>Id: {props.id}</p>
            <Button variant="outlined" 
            startIcon={<DeleteIcon />} 
            onClick={handleClick}
            fullWidth = {true}
            >
                Borrar 
            </Button>
        </div>
    )
}
