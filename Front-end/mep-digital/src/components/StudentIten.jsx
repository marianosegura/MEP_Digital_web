import React from 'react'
import { useState } from 'react'
export default function StudentIten(props) {
  const [showAll, setShowAll] = useState(false)
  return (
    <div className="student" onClick={()=>{setShowAll(!showAll)}}>
      {showAll && (
        <p>Id: {props.id}</p>
      )}
      <p>{props.name} {props.lastname}</p>
      {showAll && (
        <div>
        <p>Correo: {props.email}</p>
        <p>Año: {props.grade}</p>
        </div>
      )}
    </div>
  )
}
