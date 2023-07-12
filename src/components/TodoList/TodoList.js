import React, { useState, useEffect, useRef } from "react";
import Todo from "../Todo/Todo";
import { useDispatch, useSelector } from "react-redux";
import TodoListSlice from "../../redux/TodoListSlice";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";
import { toast } from "react-toastify";
const TodoList = () => {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState("");
  const todoList = useSelector((state) => state.todoList);
  const todoNameInputRef = useRef(null);

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
      toast.success("Add Successfully!", { autoClose: 1000 });
    } catch (err) {
      toast.error("Add Failed!", { autoClose: 1000 });
    }
  };

  const handleInputChaged = (e) => {
    setTodoName(e.target.value);
  };

  const handleCompletedAllTasks = () => {
    try {
      dispatch(TodoListSlice.actions.completedAllTask());
      // localStorage.setItem("todoList", JSON.stringify(todoList));
      window.location.reload();
      toast.success("Checked tasks Successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Checked tasks Failed!", { autoClose: 1000 });
    }
  };

  const handleRemoveCompletedTasks = () => {
    try {
      dispatch(TodoListSlice.actions.removeCompletedTasks());
      // localStorage.setItem("todoList", JSON.stringify(todoList));
      toast.success("Remove tasks Successfully!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Remove tasks failed!", { autoClose: 1000 });
    }
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    todoNameInputRef.current.focus();
  }, [todoList]);

  useEffect(() => {
    todoNameInputRef.current.focus();
  }, []);

  return (
    <div className="todolist-section">
      <div className="todolist-title">
        <i class="fa-solid fa-clipboard"></i>
        <h1>Todo List</h1>
      </div>
      <div className="add-section">
        <div className="input-section">
          <i class="fa-sharp fa-solid fa-list-check"></i>
          <input
            type="text"
            name="input"
            value={todoName}
            placeholder="Add your todo"
            onChange={handleInputChaged}
            ref={todoNameInputRef}
          />
        </div>
        <button onClick={handleAddTodoButtonClicked}>Add</button>
      </div>
      <div className="alltasks-choice">
        <div className="complete-alltasks">
          <i class="fa-solid fa-check-double"></i>
          <span onClick={handleCompletedAllTasks}>Complete all tasks</span>
        </div>
        <div className="delete-alltasks">
          <span onClick={handleRemoveCompletedTasks}>Delete comp tasks</span>
        </div>
      </div>
      <div className="list-section">
        {todoList.map((todo, index) => (
          <Todo
            name={todo.name}
            completed={todo.completed}
            id={todo.id}
            key={todo.id}
            // onRemoveTodo={handleRemoveTodo}
            isFirst={index === 0}
          />
        ))}
      </div>
      <div className="bottom-group">
        <button>Filter</button>
        <span>
          {" "}
          Completed: {todoList.filter((todo) => todo.completed).length}{" "}
        </span>
        <span className="total-tasks">Total Tasks: {todoList.length}</span>
      </div>
    </div>
  );
};

export default TodoList;
