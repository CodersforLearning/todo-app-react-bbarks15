import React, {useState, useEffect} from 'react';
import TodoItem from './components/TodoItem'
import todoService from './services/todo'
import { ListGroup, Form, Button } from 'react-bootstrap'
import './App.css';

const App = (props) => {
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
      id: todoItems.length + 1,
      text: newTodoItem,
      completed: false,
    }

    todoService
      .create(newTodo)
      .then(returnedTodo => {
        setTodoItems(todoItems.concat(newTodo))
        setNewTodoItem('')
      })

  }

  const deleteTodoItem = id => {
    todoService
      .remove(id)
      .then(setTodoItems(todoItems.filter(item => item.id !== id)))
  }

  const handleTodoItemChange = (event) => {
    setNewTodoItem(event.target.value)
  }

  const toggleTodoCompletion = id => {
    const todoItem = todoItems.find(n => n.id === id)
    const changedItem = { ...todoItem, completed: !todoItem.completed }

    todoService
      .update(id, changedItem)
      .then(returnedTodo => {
        setTodoItems(todoItems.map(item => item.id !== id ? item : returnedTodo))
      })
  }


  return (
    <div className="container">
      <div style={{textAlign:"center"}}>
        <h1>Todo List</h1>
      </div>
      <ListGroup>
        {todoItems.map(item => <TodoItem key={item.id}
                                         item={item}
                                         toggleCompletion={() => toggleTodoCompletion(item.id)}
                                         deleteCompletion={() => deleteTodoItem(item.id)} />)}
      </ListGroup>
      <Form onSubmit={addTodoItem} style={{marginTop: "1em"}}>
          <Form.Control value={newTodoItem} onChange={handleTodoItemChange} />
          <Button variant="dark" type="submit" style={{marginTop: "0.5em"}}>Save</Button>
      </Form>
    </div>
  );
}

export default App;
