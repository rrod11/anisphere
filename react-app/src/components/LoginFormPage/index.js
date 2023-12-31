import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginFormPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // if (sessionUser) return <Redirect to="/" />;
  if (sessionUser) return history.go(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credentials, password));
    if (data) {
      const errObj = {};
      errObj.credentials = "***Please Check Your Credentials***";
      setErrors(errObj);
    } else {
      history.go(-1);
    }
  };

  function DemoUser() {
    setCredentials("demo@aa.io");
    setPassword("password");
  }

  return (
    <div className="login-page" style={{ zIndex: "10000" }}>
      <h1 style={{ fontSize: "50px" }}>Log In</h1>
      <form onSubmit={handleSubmit}>
        <span className="span-error-lpage">
          {errors.credentials && <p className="errors">{errors.credentials}</p>}
        </span>
        <div className="credential-box-page">
          <div
            className="floating-fillers-page"
            style={
              credentials
                ? {
                    top: "-35.5px",
                    background: "rgb(83, 225, 47)",
                    borderRadius: "25px",
                  }
                : null
            }
          >
            <label>Credentials</label>
          </div>
          <input
            type="text"
            className="post-inputs-page"
            style={{ width: "90%" }}
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
          />
        </div>
        <div className="password-box-page">
          <div
            className="floating-fillers-page"
            style={
              password
                ? {
                    top: "-30.5px",
                    background: "rgb(83, 225, 47)",
                    borderRadius: "25px",
                  }
                : null
            }
          >
            <label>Password</label>
          </div>
          <input
            type="password"
            className="post-inputs-page"
            style={{ width: "90%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-form-button-page">
          <button type="submit">Log In</button>
        </div>
        <div className="demo-user-button-page">
          <button type="submit" onClick={DemoUser} className="demoButton">
            Demo User
          </button>
        </div>
      </form>
      <div className="other-options">Don't Have An Account Yet??</div>
      <a
        href="/signup"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <button className="sign-up-link">CREATE AN ACCOUNT</button>
      </a>
    </div>
  );
}

export default LoginFormPage;
