import { normalizeObj } from "./helpers";

const ADD_POSTCATEGORY = "postcategories/ADD_POSTCATEGORY";
const GET_POSTCATEGORIES = "postcategories/GET_POSTCATEGORIES";
const DELETE_POSTCATEGORY = "postcategories/DELETE_POSTCATEGORY";
const EDIT_POSTCATEGORY = "postcategories/EDIT_POSTCATEGORY";

const initialState = { postcategories: {} };
// const initialState = {};

const addPostCategory = (payload) => {
  return {
    type: ADD_POSTCATEGORY,
    payload,
  };
};

export const getPostCategories = (postcategories) => {
  return {
    type: GET_POSTCATEGORIES,
    postcategories,
  };
};
const deletePostCategory = (payload, postcategoryId) => {
  return {
    type: DELETE_POSTCATEGORY,
    payload: postcategoryId,
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
    const { postcategories } = await response.json();
    dispatch(getPostCategories(postcategories));
  } else {
    console.log("there was an error getting all postcategories");
  }
};

export const addAPostcategory = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/postcategories/${postId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const postcategory = await response.json();
  dispatch(addPostCategory(postcategory));
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
const postcategoriesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTCATEGORIES:
      newState = { ...state };
      newState.postcategories = normalizeObj(action.postcategories);
      return newState;
    case ADD_POSTCATEGORY:
      newState = { ...state };
      newState.postcategories[action.payload.id] = action.payload;
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

export default postcategoriesReducer;
