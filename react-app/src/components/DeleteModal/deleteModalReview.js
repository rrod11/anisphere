import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { allTheReviews, deleteAReview } from "../../store/reviewReducer";

import "./deleteModal.css";

import { useEffect } from "react";

//PLEASE CHANGE names/variables

function DeleteReview({ reviewId, postId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const reviewer = useSelector((state) => state.review.reviews);

  // const reviewsLength = Object.values(
  //   useSelector((state) => state.review.reviews)
  // ).length;

  const deleteReview = async (e) => {
    e.preventDefault();

    await dispatch(deleteAReview(reviewId))
      .then(closeModal)
      .then(() => history.push(`/reviews/${postId}`))
      .then(() => history.push(`/posts/${postId}`));

    // history.push(`/reviews/${user.id}`);
    // return Redirect(`/products/${user.id}`);
  };
  useEffect(() => {
    dispatch(allTheReviews(postId));
  }, [dispatch]);

  return (
    <div className="delete-button-container">
      <h2 id="delReviewModalTitle">Confirm Delete</h2>
      <p id="delReviewModalText">
        Are you sure you want to permanently DELETE this Review?
      </p>
      <div id="delReviewModalButtons">
        <button id="delete-review-btn" onClick={deleteReview}>
          Yes (Delete Review)
        </button>
        <button id="keep-review-btn" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}

export default DeleteReview;
