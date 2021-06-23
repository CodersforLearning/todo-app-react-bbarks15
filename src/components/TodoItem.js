import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'

const TodoItem = ({ item, toggleCompletion, deleteCompletion, index }) => {
  const status = item.completed ? "unfinish" : "finish"

  const buttonStyle = { float: "right", margin: "0 0.5em" }

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <ListGroup.Item style={item.completed ? { textDecoration: "line-through" } : null}>
          {item.text}
          <Button onClick={deleteCompletion} variant="danger" style={buttonStyle}>delete</Button>
          <Button onClick={toggleCompletion} variant="outline-dark" style={buttonStyle}>{status}</Button>
        </ListGroup.Item >
        </div>
      )}

    </Draggable>
  )
}

export default TodoItem
