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
    // body: JSON.stringify(payload),
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const postcategory = await response.json();
    dispatch(addPostCategory(postcategory));
    return postcategory;
  } else {
    console.log("THERE WAS AN ERROR CREATING THE POST CATEGORY");
  }
};
export const deleteAPostcategory = (postcategoryId) => async (dispatch) => {
  const response = await fetch(`/api/postcategories/${postcategoryId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deletePostCategory(postcategoryId));
    return response;
  } else {
    console.log("There was an error trying to delete postcategory");
  }
};
export const editAPostcategory = (payload, postId) => async (dispatch) => {
  const response = await fetch(`/api/postcategories/${postId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const postcategory = await response.json();

    dispatch(editPostCategory(postcategory));
    return postcategory;
  } else {
    console.log("there was and issue updating your POSTCATEGORY");
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
    case EDIT_POSTCATEGORY:
      newState = { ...state };
      newState.postcategories[action.payload.id] = action.payload;
      return newState;
    case DELETE_POSTCATEGORY:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.postcategoryId];
      return deleteState;
    default:
      return state;
  }
};

export default postcategoriesReducer;
