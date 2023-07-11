import React, { useState } from "react";
import { useDispatch } from "react-redux";
import todoListSlice from "../../redux/TodoListSlice";
import "./Todo.css";
const Todo = ({ name, completed, id }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoName, setUpdatedTodoName] = useState(name);

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(todoListSlice.actions.toggleStatus(id));
  };

  const handleRemoveButtonClicked = () => {
    dispatch(todoListSlice.actions.removeTodo(id));
  };

  const handleEditButtonClicked = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log(updatedTodoName)
    dispatch(todoListSlice.actions.updateTodo({
      id: id,
      name: updatedTodoName,
    }));
    setIsEditing(false);
  };
  return (
    <div className="todo-section">
      <div className="todo-left">
        <input type="checkbox" onChange={toggleCheckbox} checked={checked} />
        {isEditing ? (
          <input
            type="text"
            value={updatedTodoName}
            onChange={(event) => setUpdatedTodoName(event.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        ) : (
          <span
            style={
              checked ? { opacity: 0.5, textDecoration: "line-through" } : {}
            }
          >
            {name}
          </span>
        )}
      </div>
      <div className="todo-right">
      {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <i
          class="fa-regular fa-pen-to-square edit-icon"
          onClick={handleEditButtonClicked}
        ></i>
        )}
        
        <i
          class="fa-solid fa-trash-can"
          onClick={handleRemoveButtonClicked}
        ></i>
      </div>
    </div>
  );
};

export default Todo;
