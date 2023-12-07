import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./notFound.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import video404 from "../../assets/video404.mp4";

function NotFound() {
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
          <h1>You MUST be LOST</h1>
          <button onClick={goBack}>CLICK TO GET UNLOST</button>
        </div>
      </div>
    </>
  );
}

export default NotFound;
