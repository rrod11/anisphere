import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [admin_key, setAdminKey] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
  // password === confirmPassword &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkCredentials();
    if (Object.values(errors).length == 0) {
      await dispatch(
        signUp(username, email, password, first_name, last_name, admin_key)
      ).then(() => closeModal());
    }
  };

  return (
    <div className="signup-modal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="email-box">
          <div
            className="floating-fillers"
            style={
              email ? { top: "-10.5px", background: "rgb(0, 179, 255)" } : null
            }
          >
            <label>Email</label>
          </div>
          <input
            type="text"
            className="post-inputs"
            style={{ width: "95%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span className="error-span">
          {errors.email && <p className="errors">{errors.email}</p>}
        </span>
        <div className="username-box">
          <div
            className="floating-fillers"
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
            className="post-inputs"
            style={{ width: "95%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <span className="error-span">
          {errors.username && <p className="errors">{errors.username}</p>}
        </span>
        <div className="firstname-box">
          <div
            className="floating-fillers"
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
            className="post-inputs"
            style={{ width: "95%" }}
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <span className="error-span">
          {errors.first_name && <p className="errors">{errors.first_name}</p>}
        </span>
        <div className="lastname-box">
          <div
            className="floating-fillers"
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
            className="post-inputs"
            style={{ width: "95%" }}
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <span className="error-span">
          {errors.last_name && <p className="errors">{errors.last_name}</p>}
        </span>
        <div className="admin-key-box">
          <div
            className="floating-fillers"
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
            className="post-inputs"
            style={{ width: "95%" }}
            value={admin_key}
            onChange={(e) => setAdminKey(e.target.value)}
          />
        </div>
        <span className="span-error-spage"></span>
        <div className="signup-password-box">
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
        <span className="error-span">
          {errors.password && <p className="errors">{errors.password}</p>}
        </span>
        <div className="confirm-box">
          <div
            className="floating-fillers"
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
            className="post-inputs"
            style={{ width: "95%" }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <span className="error-span">
          {errors.same && <p className="errors">{errors.same}</p>}
        </span>
        <button
          type="submit"
          className="sign-up-button"
          onClick={checkCredentials}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
