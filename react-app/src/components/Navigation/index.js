import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar">
      <div
        className="logo-left"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dpdvw1sam/image/upload/v1701821110/Pngtree_cute_three-dimensional_3d_red_golden_13341839_nboysu.png")`,
        }}
      >
        Anisphere
      </div>
      <div className="nav-right">
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </div>
  );
}

export default Navigation;
