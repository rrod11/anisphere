import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
      .then(() => closeMenu())
      .then(() => history.push("/home"));
  };
  const createAPost = (e) => {
    e.preventDefault();
    closeMenu();
    history.push("/newpost");
  };
  const viewProfile = (e) => {
    e.preventDefault();
    closeMenu();
    history.push(`/profile/${user.id}`);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <div className="prof-module">
      <button
        onClick={openMenu}
        style={{ fontSize: "30px", padding: "10px", borderRadius: " 50%" }}
      >
        <i className="fas fa-user-circle" style={{ fontSize: "40px" }} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>
              Hello {user.firstname} {user.lastname}
            </li>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <div className="profile-buttons">
              <li style={{ width: "50%" }}>
                <button className="logout" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
              <li style={{ width: "50%" }}>
                <button className="create-post" onClick={createAPost}>
                  Create A Post
                </button>
              </li>
            </div>
            <div className="view-profile">
              <button className="profileB" onClick={viewProfile}>
                View Profile
              </button>
            </div>
          </>
        ) : (
          <div className="profile-enter">
            <div className="button-login">
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                style={{ backgroundColor: "blue" }}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="button-signup">
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
