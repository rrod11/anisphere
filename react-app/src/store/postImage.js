import { normalizeObj } from "./helpers";

const ADD_POST_IMAGE = "posts/ADD_POST_IMAGE";

const addPostImage = (post) => {
  return {
    type: ADD_POST_IMAGE,
    post,
  };
};

export const createPostImage = (post, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/image/new`, {
    method: "POST",
    body: post,
  });
  console.log(
    "🚀 ~ file: postImage.js:15 ~ createPostImage ~ response:",
    response
  );

  if (response.ok) {
    const resPost = await response.json();
    console.log("NEW POST DATA", resPost);
    dispatch(addPostImage(resPost));
  } else {
    console.log("There was an error UPDATING your post Image!");
  }
};

const initialState = {};

const postImageReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_POST_IMAGE:
      newState = { ...state };
      newState.postImages[action.post.id] = action.post;
      return newState;
    default:
      return state;
  }
};

export default postImageReducer;
