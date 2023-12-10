import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar-container" style={{ zIndex: "1000000" }}>
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

<<<<<<< HEAD
      <a href="/home" style={{ padding: "10px" }}>
        Home
      </a>
      <a
        href="/about"
        style={{ padding: "10px", position: "relative", right: "-250px" }}
      >
        About
      </a>
      <a></a>

      {isLoaded && (
        <li
          style={{
            width: "40px",
            height: "100%",
            padding: "0 40px 0 0",
            top: "0",
          }}
        >
          <ProfileButton user={sessionUser} />
        </li>
      )}
=======
        {isLoaded && (
          <li style={{ width: "40px", height: "100%" }}>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
>>>>>>> parent of 94fb693 (site on the mend)
    </div>
  );
}

export default Navigation;
