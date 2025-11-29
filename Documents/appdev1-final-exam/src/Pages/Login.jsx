import React, { useEffect, useState } from "react";
import { fetchUsersLimit3 } from "../assets/API Helper/todosAPI";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUsersLimit3();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const envPassword = import.meta.env.VITE_APP_SECRET_PASSWORD;
    if (!selectedUserId) {
      setError("Select a user");
      return;
    }
    if (password !== envPassword) {
      setError("Invalid password");
      return;
    }
    // Save login (simple)
    localStorage.setItem("loggedUserId", selectedUserId);
    navigate("/todos"); // useNavigate per requirement
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Login (use any of the 3 users below with the env password)</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          User:
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Select user --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </label>

        <div style={{ marginTop: 8 }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginTop: 8 }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}