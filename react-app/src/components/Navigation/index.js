import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar-container">
      <div
        className="logo-left"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dpdvw1sam/image/upload/v1701821110/Pngtree_cute_three-dimensional_3d_red_golden_13341839_nboysu.png")`,
        }}
      >
        Anisphere
      </div>
      <div className="nav-right">
        <a href="/" style={{ padding: "10px" }}>
          SPLASH!
        </a>
        {/* <li
          style={{ color: "white", padding: " 0 10px", textDecoration: "none" }}
        > */}
        <a href="/home" style={{ padding: "10px" }}>
          Home
        </a>
        {/* </li> */}

        {isLoaded && (
          <li style={{ width: "40px", height: "100%" }}>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </div>
  );
}

export default Navigation;
