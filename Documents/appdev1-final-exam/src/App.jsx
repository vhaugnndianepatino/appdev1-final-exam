import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Todos from "./Pages/Todos";
import Login from "./Pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
