import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userReducer";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteModal/deleteModalReview";
import { allTheReviews, getReviews } from "../../store/reviewReducer";
import ReviewFormModal from "../CreateReviewModal";
import EditReview from "../EditReviewModal/editModalReview";
import "./reviews.css";

function Reviews({ list, posts, theId }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const orderedReviews = orderReviews(list);
  const [render, setRender] = useState(false);
  const [postReviews, setPostReviews] = useState([]);

  // const reviewObj = useSelector((state) => state.review.reviews);
  // const postObj = useSelector((state) => state.post.posts);
  // const postArr = Object.values(postObj);
  // const target = Object.values(postArr).find((ele) => ele.id == postId);
  // const orderedReviews = orderReviews(target.reviews);
  const target = Object.values(posts).find((ele) => ele.id == postId);

  let sum = 0;
  if (target && target.reviews.length >= 1) {
    sum = target.reviews?.reduce((acc, review) => review?.rating + acc, 0);
  }
  let avg;
  if (sum > 0) {
    avg = sum / target.reviews.length;
  }

  function orderReviews(arr) {
    let newbie = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newbie.push(arr[i]);
    }
    return newbie;
  }

  const history = useHistory();
  const usersObj = useSelector((state) => state.user);
  // const usersArr = Object.values(usersObj.users);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(async () => {
    let usersArr;
    dispatch(getAllUsers());
    // .then(() => dispatch(allTheReviews()))
    // .then(() => {
    //   setIsLoaded(true);
    // })
    // .then(() => {
    //   history.push(`/posts/${postId}`);
    // });

    const res = await fetch(`/api/reviews/post/${theId}`);
    const users = await fetch(`/api/users/all`);
    if (res.ok) {
      const reviews = await res.json();
      const orderedReviews = orderReviews(reviews);
      if (users) {
        const userRes = await users.json();
        usersArr = Object.values(userRes.users);
      }
      const finalReviews = addUsers(orderedReviews, usersArr);
      setPostReviews(finalReviews);
    }
    setIsLoaded(true);
  }, [dispatch, isLoaded, render]);

  if (!orderReviews.length || !Object.values(usersObj).length) {
    return (
      <>
        <h1>Reviews Aren't Ready</h1>
      </>
    );
  }
  // console.log("🚀 ~ file: index.js:328 ~ Reviews ~ usersArr:", usersArr);
  function addUsers(list, users) {
    let newbie = [];
    for (let i = 0; i < list.length; i++) {
      list[i].user = users?.find((ele) => ele.id == list[i].userId);
      newbie.push(list[i]);
    }
    return newbie;
  }
  // const reviewsFinal = addUsers(orderedReviews, usersArr);
  return (
    <>
      <div className="add-review-button-outside-container">
        <div className="add-review-button-container">
          <OpenModalButton
            buttonText="Add Review"
            modalClasses={["add-review-button"]}
            onButtonClick={closeMenu}
            modalComponent={
              <ReviewFormModal
                postId={postId}
                render={render}
                setRender={setRender}
              />
            }
          />
        </div>
      </div>
      <div className="overallReviews">
        {target && target.reviews?.length < 1 ? (
          <span className="numberReviews">
            <h1>
              {target.reviews?.length} Reviews {avg?.toFixed(2)}
            </h1>
          </span>
        ) : (
          <span className="numberReviews">
            <h1>{target.reviews?.length} Reviews</h1>
          </span>
        )}
        <div
          className="insideman"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <h1 style={{ padding: "0 5px 0 5px" }}>{avg?.toFixed(2)}</h1>
          <label style={{ display: "flex", alignItems: "center" }}>
            <div
              className="rating"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <i
                className={
                  avg >= 1 || avg > 0.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  avg >= 2 || avg >= 1.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  avg >= 3 || avg >= 2.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  avg >= 4 || avg >= 3.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
              <i
                className={
                  avg >= 5 || avg >= 4.5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
              ></i>
            </div>
          </label>
        </div>
      </div>
      {/* <div className="reviews-object"> */}
      {isLoaded && postReviews?.length >= 1 ? (
        postReviews?.map(({ id, userId, review, rating, user }) => (
          <div
            className="reviews-object"
            style={{
              borderBottom: "1px solid grey",
              padding: "5px",
              color: "white",
            }}
            key={id}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <div style={{ width: "85%" }}>
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {review}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "darkgray",
                  }}
                >
                  {`${user?.firstname} ${user?.lastname}`}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "13%",
                }}
              >
                <label>
                  <div
                    className="rating"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <i
                      className={
                        rating >= 1 || rating > 1
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        rating >= 2 || rating > 2
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        rating >= 3 || rating > 3
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        rating >= 4 || rating > 3
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        rating >= 5 || rating > 4
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                </label>
              </div>
            </div>
            <div className="reviews-buttons-container">
              <div className="edit-review">
                {userId == sessionUser?.id ? (
                  <OpenModalButton
                    // modalClasses={["edit-button-container"]}
                    buttonText="Edit Review"
                    modalComponent={
                      <EditReview
                        reviewId={id}
                        postId={postId}
                        render={render}
                        setRender={setRender}
                        reviewsArr={postReviews}
                      />
                    }
                  />
                ) : null}
              </div>
              <div className="delete-review">
                {userId == sessionUser?.id ||
                sessionUser?.adminKey == "roderick0318" ? (
                  <OpenModalButton
                    // modalClasses={["delete-review-button-container"]}
                    buttonText="Delete Review"
                    modalComponent={
                      <DeleteReview reviewId={id} postId={postId} />
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>REVIEWS DON'T EXIST</h1>
      )}
      {/* </div> */}
    </>
  );
}

export default Reviews;
