import React, {useState} from "react";
import { useDispatch } from "react-redux";
import todoListSlice from "../../redux/TodoListSlice";
import "./Todo.css"
const Todo = ({name, completed, id}) => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(completed)

  const toggleCheckbox = () => {
    setChecked(!checked)
    dispatch(todoListSlice.actions.toggleStatus(id))
  }

  const handleRemoveButtonClicked = () => {
    dispatch(todoListSlice.actions.removeTodo(id))
  }

  return (
    <div className="todo-section">
      <div className="todo-left">
        <input type="checkbox" onChange={toggleCheckbox} checked={checked}/>
        <span style={checked ? {opacity: 0.5, textDecoration: "line-through"} : {}}>{name}</span>
      </div>
      <div className="todo-right">
          <i class="fa-regular fa-pen-to-square edit-icon"></i>
          <i class="fa-solid fa-trash-can" onClick={handleRemoveButtonClicked}></i>
      </div>
    </div>
  );
};

export default Todo;
