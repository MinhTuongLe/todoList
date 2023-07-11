import { createSlice } from "@reduxjs/toolkit";

const getDataFromLocalStorage = () => {
  const initialState = localStorage.getItem("todoList");
  return initialState ? JSON.parse(initialState) : [];
};

export default createSlice({
  name: "todoList",
  initialState: getDataFromLocalStorage(),
  reducers: {
    addTodo: (state, action) => {
      state.unshift(action.payload);
      localStorage.setItem("todoList", JSON.stringify(state));
    },
    toggleStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
        localStorage.setItem("todoList", JSON.stringify(state));
      }
    },
    removeTodo: (state, action) => {
      const updatedState = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todoList", JSON.stringify(updatedState));
      return updatedState;
    },
    updateTodo: (state, action) => {
      const {name, id} = action.payload;
      const currentTodo = state.find((todo) => todo.id === id);
      if (currentTodo) {
        currentTodo.name = name;
        localStorage.setItem("todoList", JSON.stringify(state));
      }
    },
    completedAllTask: (state) => {
      const updatedTodoList = state.map((todo) => {
        if (!todo.completed) {
          return { ...todo, completed: true };
        } else {
          return todo;
        }
      });
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
      return updatedTodoList;
    },
    removeCompletedTasks: (state) => {
      const updatedState = state.filter((todo) => !todo.completed);
      localStorage.setItem("todoList", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});
