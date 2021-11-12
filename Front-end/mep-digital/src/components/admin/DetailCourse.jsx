import React from 'react'
import { useSelector } from "react-redux";

export default function DetailCourse() {
    const selectCourse = useSelector(state => state.coursesInfo.selectCourse)
    return (
        <div className = "detailCourse">
        {selectCourse.name !== undefined
        ?
            (
                <h1>Nombre:{selectCourse.name}</h1>
            )
        :
            (
                <h1>Selecciona un curso o crea uno nuevo</h1>
            )
        }
            
        </div>
    )
}
