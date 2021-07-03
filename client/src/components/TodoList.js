import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ListGroup } from 'react-bootstrap'

const TodoList = (props) => {
   const {filteredTodoItems, toggleTodoCompletion, deleteTodoItem} = props

  return (
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
  )
}

export default TodoList