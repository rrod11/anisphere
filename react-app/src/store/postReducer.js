import { normalizeObj } from "./helpers";

const GET_POSTS = "posts/GET_POSTS";
const ADD_POST = "posts/ADD_POST";
const DELETE_POST = "posts/DELETE_POST";

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
const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    payload: postId,
  };
};

// THUNKS
export const getAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/all");
  if (response.ok) {
    const { posts } = await response.json();
    dispatch(getPosts(posts));
  } else {
    console.log("There was an error GETTING all posts!");
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

  if (response.ok) {
    const resPost = await response.json();
    // const { resPost } = await response.json();
    console.log("NEW POST DATA", resPost);
    dispatch(addPost(resPost));
  } else {
    console.log("There was an error CREATING your post!");
  }
};
export const editPost = (post, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/edit`, {
    method: "PUT",
    body: post,
  });
  console.log("🚀 ~ file: postReducer.js:61 ~ editPost ~ response:", response);

  if (response.ok) {
    const resPost = await response.json();
    // const { resPost } = await response.json();
    console.log("NEW POST DATA", resPost);
    dispatch(addPost(resPost));
  } else {
    console.log("There was an error EDITING your post!");
  }
};

export const deleteAPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deletePost(postId));
    return response;
  } else {
    console.log("There was an error trying to DELETE post");
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
      newState.posts[action.post.id] = action.post;
      return newState;
    case DELETE_POST:
      let deleteState;
      deleteState = { ...state };
      delete deleteState[action.postId];
      return deleteState;
    default:
      return state;
  }
};

export default postReducer;
