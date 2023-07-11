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
    completedAllTask: (state) => {
      state.forEach((todo) => {
        if (!todo.completed) {
          todo.completed = true;
        }
      });
      localStorage.setItem("todoList", JSON.stringify(state));
    },
    removeCompletedTasks: (state) => {
      const updatedState = state.filter((todo) => todo.completed !== true);
      localStorage.setItem("todoList", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});
