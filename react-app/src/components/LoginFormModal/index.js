import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credentials, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };
  function DemoUser() {
    setCredentials("demo@aa.io");
    setPassword("password");
  }

  return (
    <div style={{ zIndex: "10000" }}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Credentials
          <input
            type="text"
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button type="submit" onClick={DemoUser} className="demoButton">
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
