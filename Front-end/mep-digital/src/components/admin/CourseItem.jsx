import React from 'react'

export default function CourseItem(props) {
  return (
    <div className = "scheduleItem">
      <p>{props.name}</p>
      <p>{props.id}</p>
    </div>
  )
}
