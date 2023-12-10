import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AboutMe.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AboutMe() {
  const dispatch = useDispatch();
  const history = useHistory();

  const goBack = () => {
    history.push("/home");
  };
  return (
    <>
      <div className="main-video">
        <div className="video-overlay"></div>
        <video src={video404} autoPlay loop muted />
        <div className="video-content">
          <h1>ALL DONE READING?</h1>
          <button onClick={goBack}>CLICK ME!!</button>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
