import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupFormPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [admin_key, setAdminKey] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  function checkCredentials() {
    const errObj = {};
    if (!email) errObj.email = "Email is required";
    if (!email.includes("@")) errObj.email = "Email must include '@'";
    if (
      email.includes("@") &&
      !email.includes(".com") &&
      !email.includes(".io") &&
      !email.includes(".net") &&
      !email.includes(".it") &&
      !email.includes(".co") &&
      !email.includes(".es") &&
      !email.includes(".in") &&
      !email.includes(".be") &&
      !email.includes(".fr ")
    )
      errObj.email = "Email must have a valid domain";
    if (!username) errObj.username = "Username is required";
    if (!first_name || first_name.length < 1)
      errObj.first_name = "First Name must be at least 1 character";
    if (!last_name || last_name.length < 1)
      errObj.last_name = "Last Name must be at least 1 character";
    if (!password || password.length < 6)
      errObj.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errObj.same = "Passwords must match";
    setErrors(errObj);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkCredentials();
    if (Object.values(errors).length == 0) {
      await dispatch(
        signUp(username, email, password, first_name, last_name, admin_key)
      ).then(() => history.push("/home"));
    }
  };

  return (
    <div className="signup-page" style={{ zIndex: "10000" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="email-box-page">
          <div
            className="floating-fillers-signup-page"
            style={
              email ? { top: "-10.5px", background: "rgb(0, 179, 255)" } : null
            }
          >
            <label>Email</label>
          </div>
          <input
            type="email"
            className="post-inputs-signup-page"
            style={{ width: "95%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span className="span-error-spage">
          {errors.email && <p className="errors">{errors.email}</p>}
        </span>
        <div className="username-box-page">
          <div
            className="floating-fillers-signup-page"
            style={
              username
                ? { top: "-10.5px", background: "rgb(0, 179, 255)" }
                : null
            }
          >
            <label>Username</label>
          </div>
          <input
            type="text"
            className="post-inputs-signup-page"
            style={{ width: "95%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <span className="span-error-spage">
          {errors.username && <p className="errors">{errors.username}</p>}
        </span>
        <div className="firstname-box-page">
          <div
            className="floating-fillers-signup-page"
            style={
              first_name
                ? { top: "-10.5px", background: "rgb(0, 179, 255)" }
                : null
            }
          >
            <label>First Name</label>
          </div>
          <input
            type="text"
            className="post-inputs-signup-page"
            style={{ width: "95%" }}
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <span className="span-error-spage">
          {errors.first_name && <p className="errors">{errors.first_name}</p>}
        </span>
        <div className="lastname-box-page">
          <div
            className="floating-fillers-signup-page"
            style={
              last_name
                ? { top: "-10.5px", background: "rgb(0, 179, 255)" }
                : null
            }
          >
            <label>Last Name</label>
          </div>
          <input
            type="text"
            className="post-inputs-signup-page"
            style={{ width: "95%" }}
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <span className="span-error-spage">
          {errors.last_name && <p className="errors">{errors.last_name}</p>}
        </span>
        <div className="admin-key-box-page">
          <div
            className="floating-fillers-signup-page"
            style={
              admin_key
                ? { top: "-10.5px", background: "rgb(0, 179, 255)" }
                : null
            }
          >
            <label>Admin Key(Optional)</label>
          </div>
          <input
            type="text"
            className="post-inputs-signup-page"
            style={{ width: "95%" }}
            value={admin_key}
            onChange={(e) => setAdminKey(e.target.value)}
          />
        </div>
        <span className="span-error-spage"></span>
        <div className="signup-password-box-page">
          <div
            className="floating-fillers-signup-page"
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
            className="post-inputs-signup-page"
            style={{ width: "95%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="span-error-spage">
          {errors.password && <p className="errors">{errors.password}</p>}
        </span>
        <div className="confirm-box-page">
          <div
            className="floating-fillers-signup-page"
            style={
              confirmPassword
                ? { top: "-10.5px", background: "rgb(0, 179, 255)" }
                : null
            }
          >
            <label>Confirm Password</label>
          </div>
          <input
            type="password"
            className="post-inputs-signup-page"
            style={{ width: "95%" }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <span className="span-error-spage">
          {errors.same && <p className="errors">{errors.same}</p>}
        </span>
        <button
          type="submit"
          className="sign-up-button-page"
          onClick={checkCredentials}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
