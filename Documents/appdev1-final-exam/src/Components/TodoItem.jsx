import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../Reducer/todosSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    try {
      setLoading(true);
      await dispatch(updateTodo({ ...todo, completed: !todo.completed })).unwrap();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this todo?")) return;
    try {
      setLoading(true);
      await dispatch(deleteTodo(todo.id)).unwrap();
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`todo ${todo.completed ? "completed" : ""}`}>
      <li className="todo-item">{todo.title ?? todo.text ?? "(no title)"}</li>
      <button className="check-btn" onClick={toggle} disabled={loading} aria-label="toggle">
        <i className="fas fa-check" />
      </button>
      <button className="delete-btn" onClick={remove} disabled={loading} aria-label="delete">
        <i className="fas fa-trash" />
      </button>
    </div>
  );
}