import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../Reducer/todosSlice";

export default function AddTodoForm() {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    try {
      setSaving(true);
      await dispatch(addTodo(title)).unwrap();
      setText("");
    } catch (err) {
      console.error("Failed to add todo:", err);
      alert("Could not add todo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} id="add-todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="Add a task."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={saving}
      />
      <button className="todo-btn" type="submit" disabled={saving}>
        {saving ? "Saving..." : "I Got This!"}
      </button>
    </form>
  );
}