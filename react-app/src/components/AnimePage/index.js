import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/postReducer";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../CreateReviewModal";
import "./animePage.css";
import { Redirect, useParams, Navigate } from "react-router-dom";
import Reviews from "../Reviews";
import DeletePost from "../DeleteModal/deleteModalPost";
import { allTheReviews } from "../../store/reviewReducer";

const AnimePage = ({ posts }) => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const target = Object.values(posts).find((ele) => ele.id == postId);
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review.reviews);
  const [isLoaded, setIsLoaded] = useState(false);
  const userObj = useSelector((state) => state.user.users);
  let usersArray;
  if (userObj) {
    usersArray = Object.values(userObj);
  }
  // const reviewsLength = Object.values(
  //   useSelector((state) => state.review.reviews)
  // ).length;

  //OVERVIEW OF FIX FOR REvIEWS NOT LOADING
  let reviewArr;
  if (reviews) {
    reviewArr = orderReviews(
      Object.values(reviews).filter((ele) => {
        return ele.postId === parseInt(postId);
      })
    );
  }
  let orderedFinalReviewArr;
  if (reviewArr) {
    orderedFinalReviewArr = addUsers(reviewArr, usersArray);
  }
  function orderReviews(arr) {
    let newbie = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newbie.push(arr[i]);
    }
    return newbie;
  }
  function addUsers(list, users) {
    let newbie = [];
    for (let i = 0; i < list.length; i++) {
      list[i].user = users?.find((ele) => ele.id == list[i].userId);
      newbie.push(list[i]);
    }
    return newbie;
  }

  let sum = 0;
  if (target && orderedFinalReviewArr?.length >= 1) {
    sum = orderedFinalReviewArr?.reduce(
      (acc, review) => review?.rating + acc,
      0
    );
  }
  let avg;

  if (sum > 0) {
    avg = sum / orderedFinalReviewArr.length;
  }
  //END OF HARD FIX

  // let sum = 0;
  // if (target && target.reviews.length >= 1) {
  //   sum = target.reviews?.reduce((acc, review) => review?.rating + acc, 0);
  // }
  // let avg;
  // if (sum > 0) {
  //   avg = sum / target.reviews.length;
  // }
  const goBack = () => {
    history.push("/home");
  };
  const closeMenu = () => setShowMenu(false);
  const editPost = () => history.push(`/posts/${target.id}/edit`);
  useEffect(async () => {
    const response = await fetch(`/api/reviews/post/${postId}`);
    // dispatch(getAllPosts(sessionUser))
    //   .then(() => allTheReviews())
    //   .then(() => allTheReviews())
    //   .then(() => {
    //     setIsLoaded(true);
    //   })
    //   .then(() => history.push(`/posts/${postId}`));
    setIsLoaded(true);
  }, [dispatch, isLoaded]);
  if (!target) {
    return (
      <div className="no-anime-here">
        <h1>PSSSSSSSSSSSSSTTTTT!!!</h1>
        <h2>THERE'S NOT ANY ANIME AT THIS SPOT</h2>
        <div className="return-back-home-button">
          <h3>ALL DONE READING?</h3>
          <button onClick={goBack}>CLICK ME!!</button>
        </div>
      </div>
    );
  }

  if (target) {
    return (
      <>
        <div id="post-page">
          <div className="wrapper">
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h1 className="post-title">{target.title}</h1>
            <div className="post-image-container">
              <div
                className="individual-post"
                style={
                  target
                    ? {
                        background: ` url(${target.image})`,
                        border: "none",
                        backgroundSize: "cover",
                        zIndex: "100",
                      }
                    : null
                }
              >
                <img
                  className="image-inside"
                  src={target.image}
                  alt="anime art"
                  style={{
                    width: "750px",
                    height: "750px",
                  }}
                />
              </div>
            </div>
            <div className="description-container">
              <h3 className="post-description">{target.description}</h3>
            </div>
            <div className="post-buttons-container">
              <div className="post-edit-button">
                {(sessionUser && target.userId == sessionUser.id) ||
                (sessionUser && sessionUser.adminKey == "roderick0318") ? (
                  <button onClick={editPost}>Edit Post</button>
                ) : null}
              </div>
              <div className="post-delete-button">
                {(sessionUser && target.userId == sessionUser.id) ||
                (sessionUser && sessionUser.adminKey == "roderick0318") ? (
                  <OpenModalButton
                    buttonText="Delete Post"
                    modalClasses={["add-delete-button-container"]}
                    onButtonClick={closeMenu}
                    modalComponent={<DeletePost postId={postId} />}
                  />
                ) : null}
              </div>
            </div>
            <div className="overallReviews">
              {target && reviewArr?.length > 1 ? (
                <span className="numberReviews">
                  <h1>
                    {reviewArr?.length} Reviews {avg?.toFixed(2)}
                  </h1>
                </span>
              ) : (
                <span className="numberReviews">
                  <h1>{reviewArr?.length} Reviews</h1>
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

            <Reviews list={target.reviews} posts={posts} theId={postId} />
          </div>
        </div>
      </>
    );
  }
};

export default AnimePage;
