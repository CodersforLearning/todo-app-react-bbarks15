import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem'
import todoService from './services/todo'
import { ListGroup, Form, Button } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const App = () => {
  const [todoItems, setTodoItems] = useState([])
  const [newTodoItem, setNewTodoItem] = useState('')

  useEffect(() => {
    todoService
      .getAll()
      .then(initialTodoItems => {
        setTodoItems(initialTodoItems)
      })
  }, [])

  const addTodoItem = (event) => {
    event.preventDefault()
    const newTodo = {
      id: nanoid(),
      text: newTodoItem,
      completed: false,
    }

    todoService
      .create(newTodo)
      .then(returnedTodo => {
        setTodoItems(todoItems.concat(returnedTodo))
        setNewTodoItem('')
      })

  }

  const deleteTodoItem = id => {
    todoService
      .remove(id)
      .then(() => {
        setTodoItems(todoItems.filter(item => item.id !== id))
      })
  }

  const handleTodoItemChange = (event) => {
    setNewTodoItem(event.target.value)
  }

  const toggleTodoCompletion = id => {
    const todoItem = todoItems.find(item => item.id === id)
    const changedItem = { ...todoItem, completed: !todoItem.completed }

    todoService
      .update(id, changedItem)
      .then(returnedTodo => {
        setTodoItems(todoItems.map(item => item.id !== id ? item : returnedTodo))
      })
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todoItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    todoItems
      .filter((item, index) => item !== items[index])
      .forEach((item, index) => todoService.update(item.id, items[index]))

    setTodoItems(items);
  }

  return (
    <div className="container" style={{ marginTop: "5vh" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Shit I Need Todo</h1>
      </div >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
              {todoItems.map((item, index) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    index={index}
                    toggleCompletion={() => toggleTodoCompletion(item.id)}
                    deleteCompletion={() => deleteTodoItem(item.id)} />
                )
              }
              )}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
      <Form onSubmit={addTodoItem} style={{ marginTop: "1em" }}>
        <Form.Control value={newTodoItem} onChange={handleTodoItemChange} />
        <Button type="submit" style={{ marginTop: "0.5%" }}>Save</Button>
      </Form>
    </div>
  );
}

export default App;
