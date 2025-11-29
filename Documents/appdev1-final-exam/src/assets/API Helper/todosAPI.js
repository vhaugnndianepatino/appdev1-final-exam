import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// GET todos (limit 10)
export const getTodosAPI = async () => {
  const res = await api.get("/todos", {
    params: { _limit: 10 },
  });
  return res.data;
};

// ADD todo
export const addTodoAPI = async (todo) => {
  const res = await api.post("/todos", todo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// UPDATE todo
export const updateTodoAPI = async (todo) => {
  const res = await api.put(`/todos/${todo.id}`, todo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// DELETE todo
export const deleteTodoAPI = async (id) => {
  await api.delete(`/todos/${id}`);
  return id; // keeps same behavior as your fetch version
};