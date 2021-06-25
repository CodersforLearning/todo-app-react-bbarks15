import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem'
import todoService from './services/todo'
import { ListGroup, Form, Button } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const App = () => {
  const [todoItems, setTodoItems] = useState([])
  const [newTodoItem, setNewTodoItem] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    todoService
      .getAll()
      .then(initialTodoItems => {
        setTodoItems(initialTodoItems.sort((a, b) => a.position - b.position))
      })
  }, [])

  const addTodoItem = (event) => {
    event.preventDefault()
    const newTodo = {
      id: nanoid(),
      text: newTodoItem,
      completed: false,
      position: todoItems.length,
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

  const handleNewTodoItemChange = (event) => {
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
    if (search !== '') {
      alert('cannot drag while searching');
      return;
    }
    if (!result.destination) return;

    const items = Array.from(todoItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedItems = items.map((item, index) => {
      return {...item, position:index}
    })

    reorderedItems
      .filter((item, index) => item.id !== todoItems[index].id)
      .forEach((item, index) => todoService.update(item.id, item))

    setTodoItems(reorderedItems);
  }

  const filteredTodoItems = search !== ''
    ? todoItems.filter(item => item.text.includes(search))
    : todoItems

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className="container" style={{ marginTop: "5vh" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Shit I Need Todo</h1>
      </div >
      <Form style={{ margin: "1em 0" }}>
        <Form.Label>Search</Form.Label>
        <Form.Control value={search} onChange={handleSearchChange} />
      </Form>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTodoItems.map((item, index) => {
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
        <Form.Control value={newTodoItem} onChange={handleNewTodoItemChange} />
        <Button type="submit" style={{ marginTop: "0.5%" }}>Save</Button>
      </Form>
    </div>
  );
}

export default App;
