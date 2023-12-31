import { normalizeObj } from "./helpers";

const CREATE_REVIEW = "review/CREATE_REVIEW";
const GET_REVIEWS = "reviews/GET_REVIEWS";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const GET_REVIEWS_POST = "reviews/POST_REVIEWS";
// const initialState = { reviews: {} };
const initialState = {};

const createReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

export const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};
const deleteReview = (payload, reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
  };
};
const editReview = (payload) => {
  return {
    type: EDIT_REVIEW,
    payload,
  };
};
const postReviews = (postReviews) => {
  return {
    type: GET_REVIEWS_POST,
    postReviews,
  };
};

export const allTheReviews = () => async (dispatch) => {
  const response = await fetch(`/api/reviews/all`);
  if (response.ok) {
    const { reviews } = await response.json();
    dispatch(getReviews(reviews));
  } else {
    console.log("there was an error getting all reviews");
  }
};

export const createAReview = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${postId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const review = await response.json();
  dispatch(createReview(review));
  return review;
};
export const deleteAReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
    return response;
  } else {
    console.log("There was an error trying to delete review");
  }
};
export const editAReview = (reviewId, payload, postId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const review = await response.json();

    dispatch(editReview(review));
    return review;
  } else {
    console.log("there was and issue updating your review");
  }
};
const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state };
      newState.reviews = normalizeObj(action.reviews);
      return newState;
    case CREATE_REVIEW:
      newState = { ...state };
      newState.reviews[action.payload.id] = action.payload;
      return newState;
    case EDIT_REVIEW:
      newState = { ...state };

      newState.reviews[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.reviewId];
      return deleteState;
    default:
      return state;
  }
};

export default reviewReducer;
