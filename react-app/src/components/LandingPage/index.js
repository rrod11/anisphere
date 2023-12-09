import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./landingpage.css";
import { getAllPosts } from "../../store/postReducer";

function LandingPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const post = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllPosts(sessionUser));
  }, [dispatch]);

  return (
    <div id="landing-page">
      <div className="landing-container">
        <img src={logo} alt="logo" style={{ width: "80%", height: "auto" }} />
        <Link to="/home">
          <button className="btn btn-home" id="landing-btn">
            COOL KIDS ENTER HERE
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
