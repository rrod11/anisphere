import { normalizeObj } from "./helpers";

const ADD_THREADLIKE = "threadlikes/ADD_THREADLIKE";
const GET_THREADLIKES = "threadlikes/GET_THREADLIKES";
const DELETE_THREADLIKE = "threadlikes/DELETE_THREADLIKE";
const EDIT_THREADLIKE = "threadlikes/EDIT_THREADLIKE";

const initialState = { threadlikes: {} };
// const initialState = {};

const addThreadlike = (payload) => {
  return {
    type: ADD_THREADLIKE,
    payload,
  };
};

export const getThreadlikes = (threadlikes) => {
  return {
    type: GET_THREADLIKES,
    threadlikes,
  };
};
const deleteThreadlike = (payload, threadlikeId) => {
  return {
    type: DELETE_THREADLIKE,
    payload: threadlikeId,
  };
};
const editThreadlike = (payload) => {
  return {
    type: EDIT_THREADLIKE,
    payload,
  };
};

export const allThreadlikes = () => async (dispatch) => {
  const response = await fetch(`/api/threadlikes/all`);
  if (response.ok) {
    const { threadlikes } = await response.json();
    dispatch(getThreadlikes(threadlikes));
  } else {
    console.log("there was an error getting all threadlikes");
  }
};

export const addAThreadlike = (threadId, payload) => async (dispatch) => {
  const response = await fetch(`/api/threadlikes/${threadId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const threadlike = await response.json();
  dispatch(addThreadlike(threadlike));
  return threadlike;
};
export const deleteAThreadlike = (threadlikeId) => async (dispatch) => {
  const response = await fetch(`/api/threadlikes/${threadlikeId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    const response = await dispatch(deleteThreadlike(threadlikeId));
    return response;
  } else {
    console.log("There was an error trying to delete threadlikes");
  }
};
export const editAThreadlike =
  (threadlikeId, payload, postId) => async (dispatch) => {
    console.log("DO I HIT THE EDIT A LIKE THUNK");
    const response = await fetch(`/api/threadlikes/${threadlikeId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(
      "🚀 ~ file: threadlikesReducer.js:73 ~ editAThreadlike ~ response:",
      response
    );

    if (response.ok) {
      const threadlike = await response.json();
      console.log(
        "🚀 ~ file: threadlikesReducer.js:81 ~ editAThreadlike ~ threadlike:",
        threadlike
      );

      dispatch(editThreadlike(threadlike));
      return threadlike;
    } else {
      console.log("there was and issue updating your LIKE");
    }
  };
const threadlikeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_THREADLIKES:
      newState = { ...state };
      newState.threadlikes = normalizeObj(action.threadlikes);
      return newState;
    case ADD_THREADLIKE:
      newState = { ...state };
      newState.threadlikes[action.payload.id] = action.payload;
      return newState;
    case EDIT_THREADLIKE:
      newState = { ...state };
      console.log("IN EDIT THREADLIKES REDUCER AND TRYING TO SEE ID", action);
      newState.threadlikes[action.payload.id] = action.payload;
      return newState;
    case DELETE_THREADLIKE:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.threadlikeId];
      return deleteState;
    default:
      return state;
  }
};

export default threadlikeReducer;
