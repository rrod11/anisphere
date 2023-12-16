import { normalizeObj } from "./helpers";

const ADD_LIKE = "likes/ADD_LIKE";
const GET_LIKES = "likes/GET_LIKES";
const DELETE_LIKE = "likes/DELETE_LIKE";
const EDIT_LIKE = "likes/EDIT_LIKE";

const initialState = { likes: {} };
// const initialState = {};

const addLike = (payload) => {
  return {
    type: ADD_LIKE,
    payload,
  };
};

export const getLikes = (likes) => {
  return {
    type: GET_LIKES,
    likes,
  };
};
const deleteLike = (payload, likeId) => {
  return {
    type: DELETE_LIKE,
    payload: likeId,
  };
};
const editLike = (payload) => {
  return {
    type: EDIT_LIKE,
    payload,
  };
};

export const allLikes = () => async (dispatch) => {
  const response = await fetch(`/api/likes/all`);
  if (response.ok) {
    const { likes } = await response.json();
    dispatch(getLikes(likes));
  } else {
    console.log("there was an error getting all likes");
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
    console.log("There was an error trying to delete likes");
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
