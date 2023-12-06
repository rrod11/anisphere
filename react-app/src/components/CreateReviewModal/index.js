import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import {
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { createAReview } from "../../store/reviewReducer";
import "./createReview.css";

function ReviewFormModal({ postId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(0);
  const [errors, setErrors] = useState({});
  const disabled = reviewText.length < 4;
  const reviews = useSelector((state) => state.review);
  let passed = false;
  console.log("🚀 ~ file: index.js:21 ~ ReviewFormModal ~ rating:", rating);

  function checkCredentials() {
    const errObj = {};
    if (!rating) errObj.rating = "Rating is required";
    if (!reviewText || reviewText.length < 4)
      errObj.reviewText = "Review must be at least 4 characters";
    setErrors(errObj);
  }
  const newReview = {
    user_id: sessionUser?.id,
    post_id: postId,
    review: reviewText,
    rating,
  };
  console.log(
    "🚀 ~ file: index.js:41 ~ ReviewFormModal ~ newReview:",
    newReview
  );
  if (!sessionUser) {
    history.push("/login");
  }

  const handleSubmit = async (e) => {
    checkCredentials();
    e.preventDefault();
    // if (!Object.values(errors).length) {
    await dispatch(createAReview(postId, newReview))
      .then(() => closeModal())
      .then(() => history.push(`/posts/${postId}`));
    // return Redirect(`/posts/${postId}`);
    // } else {
    //   console.log(`You have ${Object.values(errors).length} errors`);
    // }
  };

  return (
    <div className="add-review-button-container">
      {sessionUser == null ? (
        <h1>PLEASE SIGN IN</h1>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <h1 className="title">{`Thoughts on ${title}`}</h1> */}
          <h1 className="title">Thoughts on This Anime</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label style={{ width: "100%" }}>
              <textarea
                className="textarea"
                rows="10"
                cols="45"
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </label>
            {errors.reviewText && <p className="errors">{errors.reviewText}</p>}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <label>
                <div
                  class="rating"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div
                    onMouseEnter={() => {
                      //   if (!disabled) setActiveRating(1);
                      setActiveRating(1);
                    }}
                    onMouseLeave={() => {
                      //   if (!disabled) setActiveRating(rating);
                      setActiveRating(rating);
                    }}
                    onClick={() => {
                      //   if (!disabled) setRating(1);
                      setRating(1);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 1 || rating >= 1
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <div
                    onMouseEnter={() => {
                      //   if (!disabled) setActiveRating(2);
                      setActiveRating(2);
                    }}
                    onMouseLeave={() => {
                      //   if (!disabled) setActiveRating(rating);
                      setActiveRating(rating);
                    }}
                    onClick={() => {
                      //   if (!disabled) setRating(2);
                      setRating(2);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 2 || rating >= 2
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <div
                    onMouseEnter={() => {
                      //   if (!disabled) setActiveRating(3);
                      setActiveRating(3);
                    }}
                    onMouseLeave={() => {
                      //   if (!disabled) setActiveRating(rating);
                      setActiveRating(rating);
                    }}
                    onClick={() => {
                      //   if (!disabled) setRating(3);
                      setRating(3);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 3 || rating >= 3
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <div
                    onMouseEnter={() => {
                      //   if (!disabled) setActiveRating(4);
                      setActiveRating(4);
                    }}
                    onMouseLeave={() => {
                      //   if (!disabled) setActiveRating(rating);
                      setActiveRating(rating);
                    }}
                    onClick={() => {
                      //   if (!disabled) setRating(4);
                      setRating(4);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 4 || rating >= 4
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <div
                    onMouseEnter={() => {
                      //   if (!disabled) setActiveRating(5);
                      setActiveRating(5);
                    }}
                    onMouseLeave={() => {
                      //   if (!disabled) setActiveRating(rating);
                      setActiveRating(rating);
                    }}
                    onClick={() => {
                      //   if (!disabled) setRating(5);
                      setRating(5);
                    }}
                  >
                    <i
                      className={
                        activeRating >= 5 || rating >= 5
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                  <span>stars</span>
                </div>
              </label>
            </div>
            {/* {disabled && (
              <p className="errors">Please write at least a 4 character review before Rating</p>
            )} */}
            {errors.rating && <p className="errors">{errors.rating}</p>}
            <button
              type="submit"
              id="add-review"
              onClick={checkCredentials}
              //   disabled={disabled}
              style={{
                // backgroundColor: "tan",
                maxWidth: "100%",
                width: "300px",
              }}
            >
              Submit Your Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReviewFormModal;
