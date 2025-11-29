import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./reduxStore/store";
import "./CSS/main.css";
import "./CSS/corner.css";
// Legacy JS converted to React components (TimeDisplay + LegacyTodoApp)
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);