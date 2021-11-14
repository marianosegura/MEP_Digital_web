import React from 'react'

export default function ChatItem(props) {
  return (
    <div className={props.type ==="Teacher"?"teacher":"student"}>
      <p >{props.name} {props.lastname}</p>
      <p >{props.message}</p>
    </div>
  )
}
