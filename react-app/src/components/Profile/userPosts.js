import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DeletePost from "../DeleteModal/deleteModalPost";
import { editAReview } from "../../store/reviewReducer";
import "./Profile.css";
import { getAllPosts } from "../../store/postReducer";
import DeleteUserPost from "../DeleteModal/deleteModalUserPosts";

export default function UserPosts({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const posts = useSelector((state) => state.post.posts);

  const postArr = Object.values(posts);
  const userPosts = postArr.filter((ele) => ele.userId == currUser.id);

  const [isLoaded, setIsLoaded] = useState(false);
  const [render, setRender] = useState(false);
  const closeMenu = () => {
    setRender(!render);
    setShowMenu(false);
  };

  const edit = (e, postId) => {
    e.preventDefault();
    return history.push(`/posts/${postId}/edit`);
  };
  // const editPost = () => history.push(`/posts/${ele.id}/edit`);

  useEffect(() => {
    const userId = user.id;
    dispatch(getAllPosts()).then(() => setIsLoaded(true));
  }, [dispatch, render]);

  return (
    <>
      {isLoaded && (
        <>
          {userPosts.length > 0 ? (
            <div className="userPostsContainer">
              {userPosts.map((ele) => (
                <div className="indvUserPosts">
                  <div className="userPostImage">
                    <a href={`/posts/${ele.id}`}>
                      {ele.image ? (
                        <img src={ele.image} className="userIdvPostImage" />
                      ) : (
                        <>
                          <p>Post Image</p>
                          <p>Not Here Yet</p>
                        </>
                      )}
                    </a>
                  </div>
                  <div>
                    <h4>{ele.title}</h4>
                    <p className="userPostDescription">{ele.description}</p>
                    <div className="userPostButtons">
                      <div className="post-edit-button">
                        {(currUser && ele.userId == currUser.id) ||
                        (currUser && currUser.adminKey == "roderick0318") ? (
                          <button
                            onClick={() =>
                              history.push(`/posts/${ele.id}/edit`)
                            }
                          >
                            Edit Post
                          </button>
                        ) : null}
                      </div>
                      <div className="post-delete-button">
                        {(currUser && ele.userId == currUser.id) ||
                        (currUser && currUser.adminKey == "roderick0318") ? (
                          <OpenModalButton
                            buttonText="Delete Post"
                            modalClasses={["add-delete-button-container"]}
                            onButtonClick={closeMenu}
                            modalComponent={
                              <DeletePost
                                postId={ele.id}
                                render={render}
                                setRender={setRender}
                              />
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {currUser.id == user.id ? (
                <h3>You don't have any listed products yet.</h3>
              ) : (
                <h3>{user.username} doesn't have any listed products yet.</h3>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
