import React from 'react'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'

const TodoItem = ({ item, toggleCompletion, deleteCompletion, index, showAll }) => {
  const status = item.completed ? "unfinish" : "finish"

  const buttonStyle = { float: "right", margin: "0 0.5em" }

  const listGroupStyle = item.completed ? {textDecoration:"line-through"} : null

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <ListGroup.Item style={listGroupStyle}>
              <Row className={"align-items-center"}>
                <Col style={{display: "table-cell", verticalAlign: "middle"}}>
                  <p style={{margin: "0"}}>{item.text}</p>
                </Col>
                <Col>
                  <Button onClick={deleteCompletion} variant="danger" style={buttonStyle}>delete</Button>
                  <Button onClick={toggleCompletion} variant="outline-dark" style={buttonStyle}>{status}</Button>
                </Col>
              </Row>
            </ListGroup.Item >
        </div>
      )}

    </Draggable>
  )
}

export default TodoItem
