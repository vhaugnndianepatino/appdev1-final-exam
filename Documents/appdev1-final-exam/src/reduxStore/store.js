import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../Reducer/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});