import { normalizeObj } from "./helpers";

const ADD_DISLIKE = "review/ADD_DISLIKE";
const GET_DISLIKES = "reviews/GET_DISLIKES";
const DELETE_DISLIKE = "reviews/DELETE_DISLIKE";
const EDIT_DISLIKE = "reviews/EDIT_DISLIKE";

const initialState = { dislikes: {} };
// const initialState = {};

const addDislike = (payload) => {
  return {
    type: ADD_DISLIKE,
    payload,
  };
};

export const getDislikes = (dislikes) => {
  return {
    type: GET_DISLIKES,
    dislikes,
  };
};
const deleteDislike = (payload, dislikeId) => {
  return {
    type: DELETE_DISLIKE,
    payload: dislikeId,
  };
};
const editDislike = (payload) => {
  return {
    type: EDIT_DISLIKE,
    payload,
  };
};

export const allDislikes = () => async (dispatch) => {
  const response = await fetch(`/api/dislikes/all`);
  if (response.ok) {
    const { dislikes } = await response.json();
    dispatch(getDislikes(dislikes));
  } else {
    console.log("there was an error getting all dislikes");
  }
};

export const addADislike = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/dislikes/${postId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const dislike = await response.json();
  dispatch(addDislike(dislike));
  return dislike;
};
export const deleteADislike = (dislikeId) => async (dispatch) => {
  const response = await fetch(`/api/dislikes/${dislikeId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteDislike(dislikeId));
    return response;
  } else {
    console.log("There was an error trying to delete Dislike");
  }
};
export const editADislike =
  (dislikeId, payload, postId) => async (dispatch) => {
    const response = await fetch(`/api/dislikes/${dislikeId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const dislike = await response.json();

      dispatch(editDislike(dislike));
      return dislike;
    } else {
      console.log("there was and issue updating your DISLIKE");
    }
  };
const dislikeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_DISLIKES:
      newState = { ...state };
      newState.dislikes = normalizeObj(action.dislikes);
      return newState;
    case ADD_DISLIKE:
      newState = { ...state };
      newState.dislikes[action.payload.id] = action.payload;
      return newState;
    case EDIT_DISLIKE:
      newState = { ...state };

      newState.dislikes[action.payload.id] = action.payload;
      return newState;
    case DELETE_DISLIKE:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.dislikeId];
      return deleteState;
    default:
      return state;
  }
};

export default dislikeReducer;
