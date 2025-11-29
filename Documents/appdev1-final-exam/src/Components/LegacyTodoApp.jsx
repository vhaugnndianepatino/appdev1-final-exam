import React, { useEffect, useState } from "react";
import TimeDisplay from "./TimeDisplay";

const LOCAL_KEY = "todos";
const THEME_KEY = "savedTheme";

export default function LegacyTodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("standard");

  useEffect(() => {
    // load todos
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) setTodos(JSON.parse(raw));
    const saved = localStorage.getItem(THEME_KEY) || "standard";
    setTheme(saved);
    document.body.className = saved;
    if (saved === "darker") {
      document.getElementById("title")?.classList.add("darker-title");
    } else {
      document.getElementById("title")?.classList.remove("darker-title");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.body.className = theme;
    if (theme === "darker") {
      document.getElementById("title")?.classList.add("darker-title");
    } else {
      document.getElementById("title")?.classList.remove("darker-title");
    }
  }, [theme]);

  function addTodo(e) {
    e.preventDefault();
    const v = text.trim();
    if (!v) {
      alert("You must write something!");
      return;
    }
    const obj = { text: v, completed: false };
    setTodos((s) => [...s, obj]);
    setText("");
  }

  function toggleCompleted(index) {
    setTodos((s) =>
      s.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  }

  function removeTodo(index) {
    setTodos((s) => s.filter((_, i) => i !== index));
  }

  function changeTheme(color) {
    setTheme(color);
  }

  return (
    <div>
      <div id="header">
        <div className="flexrow-container">
          <div
            className="standard-theme theme-selector"
            onClick={() => changeTheme("standard")}
          />
          <div
            className="light-theme theme-selector"
            onClick={() => changeTheme("light")}
          />
          <div
            className="darker-theme theme-selector"
            onClick={() => changeTheme("darker")}
          />
        </div>
        <h1 id="title">
          Just do it.
          <div id="border" />
        </h1>
      </div>

      <div id="form">
        <form onSubmit={addTodo}>
          <input
            className={`${theme}-input todo-input`}
            type="text"
            placeholder="Add a task."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className={`todo-btn ${theme}-button`} type="submit">
            I Got This!
          </button>
        </form>
      </div>

      <div className="version">
        <div className="demo version-section">
          <a
            href="https://github.com/lordwill1/todo-list"
            className="github-corner"
            aria-label="repo"
          >
            {/* keep the SVG in index.html or copy it here if you want it rendered by React */}
          </a>
        </div>
        <div>
          <p>
            <TimeDisplay />
          </p>
        </div>
      </div>

      <div id="myUnOrdList">
        <ul className="todo-list">
          {todos.map((todo, idx) => (
            <div
              key={idx}
              className={`todo ${theme}-todo ${todo.completed ? "completed" : ""}`}
            >
              <li className="todo-item">{todo.text}</li>
              <button
                className={`check-btn ${theme}-button`}
                onClick={() => toggleCompleted(idx)}
                aria-label={`toggle-${idx}`}
                type="button"
              >
                <i className="fas fa-check" />
              </button>
              <button
                className={`delete-btn ${theme}-button`}
                onClick={() => removeTodo(idx)}
                aria-label={`delete-${idx}`}
                type="button"
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}