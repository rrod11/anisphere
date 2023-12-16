import { normalizeObj } from "./helpers";

const CREATE_THREAD = "threads/CREATE_THREAD";
const GET_THREADS = "threads/GET_THREADS";
const DELETE_THREAD = "threads/DELETE_THREAD";
const EDIT_THREAD = "threads/EDIT_THREAD";
// const initialState = { threads: {} };
const initialState = { threads: {} };

const createThread = (payload) => {
  return {
    type: CREATE_THREAD,
    payload,
  };
};

export const getThreads = (threads) => {
  return {
    type: GET_THREADS,
    threads,
  };
};
const deleteThread = (payload, threadId) => {
  return {
    type: DELETE_THREAD,
    payload: threadId,
  };
};
const editThread = (payload) => {
  return {
    type: EDIT_THREAD,
    payload,
  };
};

export const allTheThreads = () => async (dispatch) => {
  const response = await fetch(`/api/threads/all`);
  if (response.ok) {
    const { threads } = await response.json();
    dispatch(getThreads(threads));
  } else {
    console.log("there was an error getting all threads");
  }
};

export const createAThread = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/threads/${postId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const thread = await response.json();
  dispatch(createThread(thread));
  return thread;
};
export const deleteAThread = (threadId) => async (dispatch) => {
  const response = await fetch(`/api/threads/${threadId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteThread(threadId));
    return response;
  } else {
    console.log("There was an error trying to delete thread");
  }
};
export const editAtTread = (threadId, payload, postId) => async (dispatch) => {
  console.log("DO I HIT THE EDIT A thread THUNK");
  const response = await fetch(`/api/threads/${threadId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log(
    "🚀 ~ file: threadReducer.js:72 ~ editAtTread ~ response:",
    response
  );
  if (response.ok) {
    const thread = await response.json();
    console.log(
      "🚀 ~ file: threadReducer.js:89 ~ editAThread ~ thread:",
      thread
    );
    dispatch(editThread(thread));
    return thread;
  } else {
    console.log("there was and issue updating your thread");
  }
};
const threadReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_THREADS:
      newState = { ...state };
      newState.threads = normalizeObj(action.threads);
      return newState;
    case CREATE_THREAD:
      newState = { ...state };
      newState.threads[action.payload.id] = action.payload;
      return newState;
    case EDIT_THREAD:
      newState = { ...state };
      console.log("IN EDIT thread REDUCER AND TRYING TO SEE ID", action);
      newState.threads[action.payload.id] = action.payload;
      return newState;
    case DELETE_THREAD:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.threadId];
      return deleteState;
    default:
      return state;
  }
};

export default threadReducer;
