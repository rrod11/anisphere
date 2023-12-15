import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteAccount from "../DeleteModal/deleteModalUser";
import { getAllUsers } from "../../store/userReducer";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import UserPosts from "./userPosts";
import UserReviews from "./userReviews";
import "./Profile.css";

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const { userId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPosts, setLoadPosts] = useState(true);
  const [loadReviews, setLoadReviews] = useState(false);

  useEffect(() => {
    if (!user) {
      return history.push("/");
    } else {
      // dispatch(getUser(userId)).then(() => setIsLoaded(true));
    }
  }, [dispatch]);

  if (user && user.id == userId) {
    return (
      <div className="profileContainer">
        <h1>
          Hello, {user.firstname} {user.lastname}
        </h1>
        <div className="profileButtonContainer">
          <NavLink to="/newpost">
            <button>Create New Post</button>
          </NavLink>
          <div className="delete-profile">
            <OpenModalButton
              modalClasses={["delete-button-container"]}
              buttonText="Delete your Account"
              modalComponent={<DeleteAccount />}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            margin: "30px",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <div>
            <h3
              className="profileTab"
              id={loadPosts ? "selected" : null}
              onClick={() => {
                setLoadPosts(true);
                setLoadReviews(false);
              }}
            >
              Your Posts
            </h3>
          </div>
          <div>
            <h3
              className="profileTab"
              id={loadReviews ? "selected" : null}
              onClick={() => {
                setLoadPosts(false);
                setLoadReviews(true);
              }}
            >
              Your Reviews
            </h3>
          </div>
        </div>
        <div className="profileTabDisplay">
          {loadPosts && <UserPosts user={user} />}
          {loadReviews && <UserReviews user={user} />}
        </div>
      </div>
    );
  } else {
    return <div>AINT NOTHING OVER HERE FOR YOU</div>;
  }
}