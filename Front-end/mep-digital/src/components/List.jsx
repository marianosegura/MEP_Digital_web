import { Button } from '@mui/material'
import React from 'react'
import Item from './Item'

export default function List(props) {
    return (
        <div className = "list">
            <Button>
            Agregar {props.type}
            </Button>
            {props.list.length > 0 
            ? 
                props.list.map((element) => {
                return (
                    <Item name = {element.name} id = {element.id} key = {element.id} onChange = {props.onChange}/>
                )})
            :
                console.log("Empy list")
            }
        </div>
    )
}
