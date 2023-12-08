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
  // if (data) {
  //   setErrors(data);
  // } else {
  //   closeModal();
  // }
  // else {
  //   setErrors([
  //     "Confirm Password field must be the same as the Password field",
  //   ]);
  // }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* <ul> */}
        {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        {/* </ul> */}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
            // required
          />
        </label>
        {errors.first_name && <p className="errors">{errors.first_name}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            // required
          />
        </label>
        {errors.last_name && <p className="errors">{errors.last_name}</p>}
        <label>
          Admin Key(Optional)
          <input
            type="text"
            value={admin_key}
            onChange={(e) => setAdminKey(e.target.value)}
            // required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
        </label>
        {errors.same && <p className="errors">{errors.same}</p>}
        <button type="submit" onClick={checkCredentials}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
