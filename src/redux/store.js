import { configureStore } from "@reduxjs/toolkit";
import TodoListSlice from "./TodoListSlice";

const store = configureStore({
  reducer: {
    todoList: TodoListSlice.reducer
  },
});

export default store;
