import React, {useState, useEffect} from 'react';
import TodoItem from './components/TodoItem'
import todoService from './services/todo'
import { ListGroup, Form, Button } from 'react-bootstrap'
import { nanoid } from 'nanoid'

const App = (props) => {
  const [todoItems, setTodoItems] = useState([])
  const [newTodoItem, setNewTodoItem] = useState('')
  const [showAll, setShowAll] = useState(true)

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
        setTodoItems(todoItems.concat(newTodo))
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

  const toggleTodoCompletion = targetId => {
    const todoItem = todoItems.find(item => item.id === targetId)
    const changedItem = { ...todoItem, completed: !todoItem.completed }

    todoService
      .update(targetId, changedItem)
      .then(returnedTodo => { // UPDATE STATE OF TARGET TODO ITEM
        setTodoItems(todoItems.map(item => item.id !== targetId ? item : returnedTodo))
      })
  }

  const todoItemsToShow = showAll
    ? todoItems
    : todoItems.filter(item => !item.completed)

  return (
    <div className="container" style={{marginTop: "5vh"}}>
      <div style={{textAlign:"center"}}>
        <h1>Shit I Need Todo</h1>
      </div >
      <div style={{ textAlign:"right", margin:" 0.5% 0" }} >
      <Button onClick={() => setShowAll(!showAll) } > {showAll ? "Hide Completed" : "Show All" } </Button>
      </div>
      <ListGroup>
        {todoItemsToShow.map(item => <TodoItem
                                         key={item.id}
                                         item={item}
                                         toggleCompletion={() => toggleTodoCompletion(item.id)}
                                         deleteCompletion={() => deleteTodoItem(item.id)} />)}
      </ListGroup>
      <Form onSubmit={addTodoItem} style={{marginTop: "1em"}}>
          <Form.Control value={newTodoItem} onChange={handleTodoItemChange} />
          <Button type="submit" style={{marginTop: "0.5%"}}>Save</Button>
      </Form>
    </div>
  );
}

export default App;
