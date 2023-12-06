import { normalizeObj } from "./helpers";

const GET_POSTS = "posts/GET_POSTS";
const ADD_POST = "posts/ADD_POST";

// ACTIONS
const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts,
  };
};

const addPost = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

// THUNKS
export const getAllPosts = (currentUser) => async (dispatch) => {
  const response = await fetch("/api/posts/all");
  if (response.ok) {
    const { posts } = await response.json();
    dispatch(getPosts(posts));
  } else {
    console.log("There was an error getting all posts!");
  }
};

export const createPost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/new`, {
    method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     "Content-Type": "application/json",
    //   },
    body: post,
  });
  console.log("RESPONSE FROM SERVER", response);

  if (response.ok) {
    const resPost = await response.json();
    // const { resPost } = await response.json();
    console.log("NEW POST DATA", resPost);
    dispatch(addPost(resPost));
  } else {
    console.log("There was an error making your post!");
  }
};
export const editPost = (post, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/edit`, {
    method: "PUT",
    //   headers: {
    //     'Accept': 'application/json',
    //     "Content-Type": "application/json",
    //   },
    body: post,
  });
  console.log("RESPONSE FROM SERVER", response);

  if (response.ok) {
    const resPost = await response.json();
    // const { resPost } = await response.json();
    console.log("NEW POST DATA", resPost);
    dispatch(addPost(resPost));
  } else {
    console.log("There was an error making your post!");
  }
};

const initialState = {};

const postReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = { ...state };
      newState.posts = normalizeObj(action.posts);
      return newState;
    case ADD_POST:
      newState = { ...state };
      console.log(
        "🚀 ~ file: postReducer.js:63 ~ postReducer ~ newState:",
        newState
      );
      newState.posts[action.post.id] = action.post;
      return newState;
    default:
      return state;
  }
};

export default postReducer;
