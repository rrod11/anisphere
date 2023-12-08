import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editAReview } from "../../store/reviewReducer";
import { useEffect, useState } from "react";
import "./editReview.css";

function EditReview({ reviewId, postId }) {
  const dispatch = useDispatch();
  const reviews = Object.values(useSelector((state) => state.review.reviews));
  const target = reviews.find((ele) => ele.id == reviewId);
  const [activeRating, setActiveRating] = useState(0);
  const { closeModal } = useModal();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const stock = {
    user_id: user.id,
    post_id: postId,
    review: target?.review,
    rating: target?.rating,
  };
  const [review, setReview] = useState(stock.review);
  const [rating, setRating] = useState(stock.rating);
  const [errors, setErrors] = useState({});

  function checkCredentials() {
    const errObj = {};
    if (!rating) errObj.rating = "Rating is required";
    if (!review || review.length < 4)
      errObj.review = "Review must be at least 4 characters";
    setErrors(errObj);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkCredentials();
    if (!Object.values(errors).length) {
      const newStock = {
        user_id: user.id,
        post_id: postId,
        review,
        rating,
      };
      await dispatch(editAReview(reviewId, newStock, postId))
        .then(() => closeModal())
        .then(() => history.push(`/posts/${postId}`));
    }
  };

  return (
    <div className="edit-review-container">
      <h1 className="title">Update Your Review</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label style={{ width: "100%" }}>
          <textarea
            className="textarea"
            rows="10"
            cols="45"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        {errors.review && <p className="errors">{errors.review}</p>}

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>
            <div
              class="rating"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                onMouseEnter={() => {
                  setActiveRating(1);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
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
                  setActiveRating(2);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
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
                  setActiveRating(3);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
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
                  setActiveRating(4);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
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
                  setActiveRating(5);
                }}
                onMouseLeave={() => {
                  setActiveRating(rating);
                }}
                onClick={() => {
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
        {errors.rating && <p className="errors">{errors.rating}</p>}
        <button
          id="update-review"
          type="submit"
          onClick={checkCredentials}
          style={{
            // backgroundColor: "tan",
            maxWidth: "100%",
            width: "300px",
          }}
        >
          Update My Review
        </button>
      </form>
    </div>
  );
}

export default EditReview;
