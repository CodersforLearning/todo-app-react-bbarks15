import React from 'react'
import {ListGroup, Button} from 'react-bootstrap'

const TodoItem = ({ item, toggleCompletion, deleteCompletion }) => {
  const status = item.completed ? "unfinish" : "finish"

  const buttonStyle = {float:"right", margin:"0 0.5em"}

  return (
    <ListGroup.Item style={item.completed ? {textDecoration:"line-through"} : null}>
      {item.text}
      <Button onClick={deleteCompletion} variant="danger" style={buttonStyle}>delete</Button>
      <Button onClick={toggleCompletion} variant="outline-dark" style={buttonStyle}>{status}</Button>
    </ListGroup.Item >
  )
}

export default TodoItem
