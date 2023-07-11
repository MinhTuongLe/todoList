import { createSelector } from "@reduxjs/toolkit";

const todoListSelector = (state) => state.todoList;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  ( todoList) => {
    return todoList
  }
);

