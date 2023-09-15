import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import Todo from "../Todo/Todo";
import TodoListSlice from "../../redux/TodoListSlice";
import "./TodoList.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState("");
  const todoList = useSelector((state) => state.todoList);
  const todoNameInputRef = useRef(null);

  // Add new task
  const handleAddTodoButtonClicked = () => {
    try {
      dispatch(
        TodoListSlice.actions.addTodo({
          id: uuidv4(),
          name: todoName,
          completed: false,
        })
      );
      setTodoName("");
      todoNameInputRef.current.focus();
      toast.success("Add successfully!", { autoClose: 1000 });
    } catch (err) {
      toast.error("Add failed!", { autoClose: 1000 });
    }
  };

  // Inputing
  const handleInputChaged = (e) => {
    setTodoName(e.target.value);
  };

  // Complete all tasks
  const handleCompletedAllTasks = () => {
    try {
      dispatch(TodoListSlice.actions.completedAllTask());
      window.location.reload();
      toast.success("Checked tasks successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Checked tasks failed!", { autoClose: 1000 });
    }
  };

  // Remove all complete tasks
  const handleRemoveCompletedTasks = () => {
    try {
      dispatch(TodoListSlice.actions.removeCompletedTasks());
      toast.success("Remove tasks successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Remove tasks failed!", { autoClose: 1000 });
    }
  };

  // Enter to add new task
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodoButtonClicked();
    }
  };

  // Get data from localstorage when loading
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    todoNameInputRef.current.focus();
  }, [todoList]);

  // Focus to input when loading
  useEffect(() => {
    todoNameInputRef.current.focus();
  }, []);

  return (
    <div className="todolist-section">
      <div className="todolist-title">
        <i className="fa-solid fa-clipboard" style={{ color: "#609dbf" }}></i>
        <h1>Todo List</h1>
      </div>
      <div className="add-section">
        <div className="input-section">
          <i className="fa-sharp fa-solid fa-list-check"></i>
          <input
            type="text"
            name="input"
            value={todoName}
            placeholder="Add your todo"
            onChange={handleInputChaged}
            ref={todoNameInputRef}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <button onClick={handleAddTodoButtonClicked}>Add</button>
      </div>
      <div className="alltasks-choice">
        <div className="complete-alltasks">
          <i className="fa-solid fa-check-double"></i>
          <span onClick={handleCompletedAllTasks}>Complete all tasks</span>
        </div>
        <div className="delete-alltasks">
          <span onClick={handleRemoveCompletedTasks} style={{ color: "#f00" }}>
            Delete completed tasks
          </span>
        </div>
      </div>
      <div className="list-section">
        {todoList.map((todo, index) => (
          <Todo
            name={todo.name}
            completed={todo.completed}
            id={todo.id}
            key={todo.id}
            isFirst={index === 0}
          />
        ))}
      </div>
      <div className="bottom-group">
        <span>
          {" "}
          Completed: {todoList.filter((todo) => todo.completed).length}{" "}
        </span>
        <span className="total-tasks">Total tasks: {todoList.length}</span>
      </div>
    </div>
  );
};

export default TodoList;
