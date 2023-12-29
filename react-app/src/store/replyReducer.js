import { normalizeObj } from "./helpers";

const CREATE_REPLY = "replies/CREATE_REPLY";
const GET_REPLIES = "replies/GET_REPLIES";
const DELETE_REPLY = "replies/DELETE_REPLY";
const EDIT_REPLY = "replies/EDIT_REPLY";
// const initialState = { replies: {} };
const initialState = { replies: {} };

const createReply = (payload) => {
  return {
    type: CREATE_REPLY,
    payload,
  };
};

export const getReplies = (replies) => {
  return {
    type: GET_REPLIES,
    replies,
  };
};
const deleteReply = (payload, replyId) => {
  return {
    type: DELETE_REPLY,
    payload: replyId,
  };
};
const editReply = (payload) => {
  return {
    type: EDIT_REPLY,
    payload,
  };
};

export const allTheReplies = () => async (dispatch) => {
  const response = await fetch(`/api/replies/all`);
  if (response.ok) {
    const { replies } = await response.json();
    dispatch(getReplies(replies));
  } else {
    console.log("there was an error getting all replies");
  }
};

export const createAReply = (threadId, payload) => async (dispatch) => {
  const response = await fetch(`/api/replies/${threadId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const reply = await response.json();
  dispatch(createReply(reply));
  return reply;
};
export const deleteAReply = (replyId) => async (dispatch) => {
  const response = await fetch(`/api/replies/${replyId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReply(replyId));
    return response;
  } else {
    console.log("There was an error trying to delete reply");
  }
};
export const editAReply = (replyId, payload, threadId) => async (dispatch) => {
  const response = await fetch(`/api/replies/${replyId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const reply = await response.json();

    dispatch(editReply(reply));
    return reply;
  } else {
    console.log("there was and issue updating your reply");
  }
};
const replyReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REPLIES:
      newState = { ...state };
      newState.replies = normalizeObj(action.replies);
      return newState;
    case CREATE_REPLY:
      newState = { ...state };
      newState.replies[action.payload.id] = action.payload;
      return newState;
    case EDIT_REPLY:
      newState = { ...state };

      newState.replies[action.payload.id] = action.payload;
      return newState;
    case DELETE_REPLY:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.replyId];
      return deleteState;
    default:
      return state;
  }
};

export default replyReducer;
