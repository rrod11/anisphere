import { normalizeObj } from "./helpers";

const ADD_CATEGORY = "categories/ADD_CATEGORY";
const GET_CATEGORIES = "categories/GET_CATEGORIES";
const DELETE_CATEGORY = "categories/DELETE_CATEGORY";
const EDIT_CATEGORY = "categories/EDIT_CATEGORY";

const initialState = { categories: {} };
// const initialState = {};

const addCategory = (payload) => {
  return {
    type: ADD_CATEGORY,
    payload,
  };
};

export const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories,
  };
};
const deleteCategory = (payload, categoryId) => {
  return {
    type: DELETE_CATEGORY,
    payload: categoryId,
  };
};
const editCategory = (payload) => {
  return {
    type: EDIT_CATEGORY,
    payload,
  };
};

export const allCategories = () => async (dispatch) => {
  const response = await fetch(`/api/categories/all`);
  if (response.ok) {
    const { categories } = await response.json();
    dispatch(getCategories(categories));
  } else {
    console.log("there was an error getting all categories");
  }
};

export const addACategory = (payload) => async (dispatch) => {
  const response = await fetch(`/api/categories/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const category = await response.json();
  dispatch(addCategory(category));
  return category;
};
export const deleteACategory = (categoryId) => async (dispatch) => {
  const response = await fetch(`/api/categories/${categoryId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteCategory(categoryId));
    return response;
  } else {
    console.log("There was an error trying to delete review");
  }
};
export const editACategory = (categoryId, payload) => async (dispatch) => {

  const response = await fetch(`/api/categories/${categoryId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });


  if (response.ok) {
    const category = await response.json();


    dispatch(editCategory(category));
    return category;
  } else {
    console.log("there was and issue updating your category");
  }
};
const categoryReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_CATEGORIES:
      newState = { ...state };
      newState.categories = normalizeObj(action.categories);
      return newState;
    case ADD_CATEGORY:
      newState = { ...state };
      newState.categories[action.payload.id] = action.payload;
      return newState;
    case EDIT_CATEGORY:
      newState = { ...state };
      newState.categories[action.payload.id] = action.payload;
      return newState;
    case DELETE_CATEGORY:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.categoryId];
      return deleteState;
    default:
      return state;
  }
};

export default categoryReducer;
