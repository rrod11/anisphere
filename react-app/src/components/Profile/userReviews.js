import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTheReviews } from "../../store/reviewReducer";
import { editAReview } from "../../store/reviewReducer";
import { getAllUsers } from "../../store/userReducer";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllPosts } from "../../store/postReducer";
import EditReview from "../EditReviewModal/editModalReview";
import DeleteReview from "../DeleteModal/deleteModalReview";

export default function UserReviews({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [render, setRender] = useState(false);

  // const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review.reviews);
  const posts = useSelector((state) => state.post.posts);

  let reviewArr;
  if (reviews) {
    reviewArr = Object.values(reviews);
  }

  let userReviews;
  if (reviewArr) {
    userReviews = reviewArr.filter((ele) => ele.userId == user.id);
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    // const user = user.id;
    dispatch(getAllPosts());

    dispatch(allTheReviews()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      {isLoaded && (
        <>
          {userReviews.length > 0 ? (
            <div className="userReviewsContainer">
              {userReviews.map((ele) => (
                <div className="indvUserReviews">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "20px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {posts[ele.postId].title}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        fontSize: "20px",
                      }}
                    >
                      <label>
                        <div
                          className="rating"
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <p>{ele.rating}</p>
                          <i
                            className={
                              ele.rating >= 1 || ele.rating > 1
                                ? "fa-solid fa-star"
                                : "fa-regular fa-star"
                            }
                          ></i>
                          <i
                            className={
                              ele.rating >= 2 || ele.rating > 2
                                ? "fa-solid fa-star"
                                : "fa-regular fa-star"
                            }
                          ></i>
                          <i
                            className={
                              ele.rating >= 3 || ele.rating > 3
                                ? "fa-solid fa-star"
                                : "fa-regular fa-star"
                            }
                          ></i>
                          <i
                            className={
                              ele.rating >= 4 || ele.rating > 3
                                ? "fa-solid fa-star"
                                : "fa-regular fa-star"
                            }
                          ></i>
                          <i
                            className={
                              ele.rating >= 5 || ele.rating > 4
                                ? "fa-solid fa-star"
                                : "fa-regular fa-star"
                            }
                          ></i>
                        </div>
                      </label>
                    </div>
                    <p style={{ width: "80%", padding: "5px" }}>{ele.review}</p>
                    <div
                      className="reviews-buttons-container"
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        margin: "10px 0",
                      }}
                    >
                      <div
                        className="edit-review"
                        style={{ width: "50%", margin: "0 2px" }}
                      >
                        <OpenModalButton
                          modalClasses={["edit-button-container"]}
                          buttonText="Edit Review"
                          modalComponent={
                            <EditReview
                              reviewId={ele.id}
                              postId={ele.postId}
                              render={render}
                              setRender={setRender}
                              reviewsArr={userReviews}
                            />
                          }
                        />
                      </div>
                      <div
                        className="delete-review"
                        style={{ width: "50%", margin: "0 2px" }}
                      >
                        <OpenModalButton
                          modalClasses={["delete-review-button-container"]}
                          buttonText="Delete Review"
                          modalComponent={
                            <DeleteReview
                              reviewId={ele.id}
                              postId={ele.postId}
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {" "}
              <h1 style={{ color: "white", fontSize: "50px" }}>
                You Have NOO Reviews!!
              </h1>
              {/* {user.id == user.id ? (
                <h3>You don't have any listed products yet.</h3>
              ) : (
                <h3>{user.username} doesn't have any listed products yet.</h3>
              )} */}
            </>
          )}
        </>
      )}
    </div>
  );
}
