import React from "react";
import AddtodoForm from "../Components/AddtodoForm";
import TodoList from "../Components/TodoList";

export default function Todos() {
  return (
    <div>
      <h1>Todos</h1>
      <AddtodoForm />
      <TodoList />
    </div>
  );
}

