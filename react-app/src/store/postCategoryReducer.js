import { normalizeObj } from "./helpers";

const ADD_POSTCATEGORY = "postcategories/ADD_POSTCATEGORY";
const GET_POSTCATEGORIES = "postcategories/GET_POSTCATEGORIES";
const DELETE_POSTCATEGORY = "postcategories/DELETE_POSTCATEGORY";
const EDIT_POSTCATEGORY = "postcategories/EDIT_POSTCATEGORY";

const initialState = { likes: {} };
// const initialState = {};

const addPostCategory = (payload) => {
  return {
    type: ADD_POSTCATEGORY,
    payload,
  };
};

export const getPostCategories = (likes) => {
  return {
    type: GET_POSTCATEGORIES,
    likes,
  };
};
const deletePostCategory = (payload, likeId) => {
  return {
    type: DELETE_POSTCATEGORY,
    payload: likeId,
  };
};
const editPostCategory = (payload) => {
  return {
    type: EDIT_POSTCATEGORY,
    payload,
  };
};

export const allPostCategories = () => async (dispatch) => {
  const response = await fetch(`/api/postcategories/all`);
  if (response.ok) {
    const { likes } = await response.json();
    dispatch(getLikes(likes));
  } else {
    console.log("there was an error getting all reviews");
  }
};

export const addALike = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/likes/${postId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const like = await response.json();
  dispatch(addLike(like));
  return like;
};
export const deleteALike = (likeId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${likeId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteLike(likeId));
    return response;
  } else {
    console.log("There was an error trying to delete review");
  }
};
export const editALike = (likeId, payload, postId) => async (dispatch) => {
  console.log("DO I HIT THE EDIT A LIKE THUNK");
  const response = await fetch(`/api/likes/${likeId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log("🚀 ~ file: likes.js:73 ~ editALike ~ response:", response);

  if (response.ok) {
    const like = await response.json();
    console.log("🚀 ~ file: likes.js:80 ~ editALike ~ like:", like);

    dispatch(editLike(like));
    return like;
  } else {
    console.log("there was and issue updating your LIKE");
  }
};
const likeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_LIKES:
      newState = { ...state };
      newState.likes = normalizeObj(action.likes);
      return newState;
    case ADD_LIKE:
      newState = { ...state };
      newState.likes[action.payload.id] = action.payload;
      return newState;
    case EDIT_LIKE:
      newState = { ...state };
      console.log("IN EDIT LIKE REDUCER AND TRYING TO SEE ID", action);
      newState.likes[action.payload.id] = action.payload;
      return newState;
    case DELETE_LIKE:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.likeId];
      return deleteState;
    default:
      return state;
  }
};

export default likeReducer;
