import { Button } from '@mui/material';
import React from 'react'

export default function Item(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.onChange(props.id)
        console.log("I have to change all for " + props.id)
    }
    return (
        <Button variant="text" onClick={handleClick} className="itemButton">
        <p>{props.name} | {props.id}</p>
      </Button>
    )
}
