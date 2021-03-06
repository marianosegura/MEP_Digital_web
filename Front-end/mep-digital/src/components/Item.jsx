import { Button } from '@mui/material';
import React from 'react'

export default function Item(props) {
    const handleClick = (e) => {
        e.preventDefault()
        props.onChange(props.id)
    }
    return (
        <Button variant="text" onClick={handleClick}>
        <p>{props.name} | {props.id}</p>
        </Button>
    )
}
