import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ScheduleItem(props) {
    const getDay = () => {
        switch(props.day){
            case 0:
                return "Lunes"
            case 1:
                return "Martes"
            case 2:
                return "Miércoles"
            case 3:
                return "Jueves"
            case 4:
                return "Viernes"
            case 5:
                return "Sabado"
            case 6:
                return "Domingo"
            default:
                return "Wtf!!!"
        }
    }
    const getStart = () => {
        return "De: " + props.startHour + ":" + props.startMinutes
    }
    const getEnd = () => {
        return "A: " + props.endHour + ":" + props.endMinutes 
    }
    const handleClick = (e) => {
        e.preventDefault()
        var direction = "https://desolate-everglades-59280.herokuapp.com/api/courses/" + props.courseId + "/schedule/" + props.scheduleId //id = _id
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
            <p>{getDay()} {getStart()} {getEnd()}</p>
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
