import React from 'react'

export default function Rating(props) {
  return (
    <div className = "scheduleItem">
      <p>{props.name} {props.lastname}</p>
      <p>{props.rating} {props.rating === 1 ? "estrella":"estrellas"}</p>
    </div>
  )
}
