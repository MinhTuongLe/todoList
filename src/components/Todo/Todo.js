import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./Todo.css";
import todoListSlice from "../../redux/TodoListSlice";

const Todo = ({ name, completed, id }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoName, setUpdatedTodoName] = useState(name);

  // Check/uncheck task
  const toggleCheckbox = () => {
    try {
      setChecked(!checked);
      dispatch(todoListSlice.actions.toggleStatus(id));
      toast.success("Checked/Unchecked successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Checked/Unchecked failed!", { autoClose: 1000 });
    }
  };

  // Remove task
  const handleRemoveButtonClicked = () => {
    try {
      dispatch(todoListSlice.actions.removeTodo(id));
      toast.success("Remove successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Remove failed!", { autoClose: 1000 });
    }
  };

  // Edit task
  const handleEditButtonClicked = () => {
    setIsEditing(true);
  };

  // Save task
  const handleSave = () => {
    try {
      dispatch(
        todoListSlice.actions.updateTodo({
          id: id,
          name: updatedTodoName,
        })
      );
      setIsEditing(false);
      toast.success("Save successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Save failed!", { autoClose: 1000 });
    }
  };

  return (
    <div className="todo-section">
      <div className="todo-left">
        <input
          type="checkbox"
          onChange={toggleCheckbox}
          checked={checked}
          style={{ cursor: "pointer", width: 16, height: 16 }}
        />
        {isEditing ? (
          <input
            className="edit-input"
            type="text"
            value={updatedTodoName}
            onChange={(event) => setUpdatedTodoName(event.target.value)}
            autoFocus
          />
        ) : (
          <span
            style={
              checked ? { opacity: 0.5, textDecoration: "line-through" } : {}
            }
            className="task-content"
          >
            {name}
          </span>
        )}
      </div>
      <div className="todo-right">
        {isEditing ? (
          <i
            className="fa-solid fa-floppy-disk save-icon"
            onClick={handleSave}
          ></i>
        ) : (
          <i
            className="fa-regular fa-pen-to-square edit-icon"
            onClick={handleEditButtonClicked}
          ></i>
        )}

        <i
          className="fa-solid fa-trash-can remove-icon"
          style={{ marginLeft: 16 }}
          onClick={handleRemoveButtonClicked}
        ></i>
      </div>
    </div>
  );
};

export default Todo;
