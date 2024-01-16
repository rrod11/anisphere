import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar-container" style={{ zIndex: "1000000" }}>
      <a href="/" style={{ padding: "10px", height: "fit-content" }}>
        SPLASH!
      </a>

      <a href="/home" style={{ padding: "10px", height: "fit-content" }}>
        Home
      </a>
      <a
        href="/about"
        style={{
          padding: "10px",
          position: "relative",
          right: "-250px",
          height: "fit-content",
        }}
      >
        About
      </a>
      <a></a>

      {/* {isLoaded && ( */}
      <li
        style={{
          width: "40px",
          height: "fit-content",
          padding: "0 40px 0 0",
          top: "0",
        }}
      >
        <ProfileButton user={sessionUser} />
      </li>
      {/* )} */}
    </div>
  );
}

export default Navigation;
