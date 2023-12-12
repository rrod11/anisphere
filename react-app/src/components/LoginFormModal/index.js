import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credentials, password));
    if (data) {
      const errObj = {};
      errObj.credentials = "***Please Check Your Credentials***";
      setErrors(errObj);
    } else {
      closeModal();
    }
  };
  function DemoUser() {
    setCredentials("demo@aa.io");
    setPassword("password");
  }

  return (
    <div className="login-modal" style={{ zIndex: "10000" }}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <span className="span-error-l">
          {errors.credentials && <p className="errors">{errors.credentials}</p>}
        </span>
        <div className="credential-box">
          <div
            className="floating-fillers"
            style={
              credentials
                ? { top: "-10.5px", background: "rgb(0, 179, 255)" }
                : null
            }
          >
            <label>Credentials</label>
          </div>
          <input
            type="text"
            className="post-inputs"
            style={{ width: "95%" }}
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
          />
        </div>
        <div className="password-box">
          <div
            className="floating-fillers"
            style={
              password
                ? { top: "-10.5px", background: "rgb(0, 179, 255)" }
                : null
            }
          >
            <label>Password</label>
          </div>
          <input
            type="password"
            className="post-inputs"
            style={{ width: "95%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-form-button">
          <button type="submit">Log In</button>
        </div>
        <div className="demo-user-button">
          <button type="submit" onClick={DemoUser} className="demoButton">
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
