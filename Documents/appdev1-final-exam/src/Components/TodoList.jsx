import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../Reducer/todosSlice";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((s) => s.todos.items);
  // optional: you can derive loading state from slice if you add it later
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (!todos) return <div>Loading...</div>;
  if (todos.length === 0) return <div className="todo-list empty">No todos yet.</div>;

  return (
    <div id="myUnOrdList">
      <ul className="todo-list">
        {todos.map((t) => (
          <TodoItem key={t.id ?? t.title} todo={t} />
        ))}
      </ul>
    </div>
  );
}