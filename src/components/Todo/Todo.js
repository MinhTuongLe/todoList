import React, { useState } from "react";
import { useDispatch } from "react-redux";
import todoListSlice from "../../redux/TodoListSlice";
import "./Todo.css";
import { toast } from "react-toastify";

const Todo = ({ name, completed, id }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoName, setUpdatedTodoName] = useState(name);

  const toggleCheckbox = () => {
    try {
      setChecked(!checked);
      dispatch(todoListSlice.actions.toggleStatus(id));
      toast.success("Checked/Unchecked Successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Checked/Unchecked failed!", { autoClose: 1000 });
    }
  };

  const handleRemoveButtonClicked = () => {
    try {
      dispatch(todoListSlice.actions.removeTodo(id));
      toast.success("Remove Successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Remove failed!", { autoClose: 1000 });
    }
  };

  const handleEditButtonClicked = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    try {
      dispatch(
        todoListSlice.actions.updateTodo({
          id: id,
          name: updatedTodoName,
        })
      );
      setIsEditing(false);
      toast.success("Save Successfully!", { autoClose: 1000 });
      window.location.reload();
    } catch (error) {
      toast.error("Save Failed!", { autoClose: 1000 });
    }
  };

  return (
    <div className="todo-section">
      <div className="todo-left">
        <input type="checkbox" onChange={toggleCheckbox} checked={checked} />
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
          >
            {name}
          </span>
        )}
      </div>
      <div className="todo-right">
        {isEditing ? (
          <button className="button-save" onClick={handleSave}>Save</button>
        ) : (
          <i
            class="fa-regular fa-pen-to-square edit-icon"
            onClick={handleEditButtonClicked}
          ></i>
        )}

        <i
          class="fa-solid fa-trash-can remote-icon"
          onClick={handleRemoveButtonClicked}
        ></i>
      </div>
    </div>
  );
};

export default Todo;