import React from 'react'

export default function Rating(props) {
  return (
    <div className = "scheduleItem">
      <p>{props.name} {props.lastname}</p>
      <p>{props.rating}</p>
    </div>
  )
}
