import { createSelector } from "@reduxjs/toolkit";

const searchTextSelector = (state) => state.filters.search;
const statusSelector = (state) => state.filters.status;
const prioritiesSelector = (state) => state.filters.priorities;
const todoListSelector = (state) => state.todoList;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  ( todoList) => {
    return todoList
  }
);

