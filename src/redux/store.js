import { configureStore } from "@reduxjs/toolkit";

import todoListSlice from "./TodoListSlice";

const store = configureStore({
  reducer: {
    todoList: todoListSlice.reducer
  },
});

export default store;
