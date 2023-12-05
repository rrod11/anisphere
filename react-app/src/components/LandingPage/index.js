import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./landingpage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log(
    "🚀 ~ file: index.js:10 ~ LandingPage ~ sessionUser:",
    sessionUser
  );
  const post = useSelector((state) => state);
  console.log("🚀 ~ file: index.js:12 ~ LandingPage ~ post:", post);

  //   if (sessionUser) return <Redirect to="/" />;

  return (
    <div id="landing-page">
      <div className="landing-container">
        <img src={logo} alt="logo" style={{ width: "80%", height: "auto" }} />
        <Link to="/home">
          <button id="landing-btn" onClick={{}}>
            COOL KIDS ENTER HERE
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
