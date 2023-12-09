import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import {
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { createAReview, allTheReviews } from "../../store/reviewReducer";

import { createPostImage } from "../../store/postImage";

function ChangePostImageForm({ postId, render, setRender }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.post.posts);
  console.log(
    "🚀 ~ file: createPostImage.js:20 ~ ChangePostImageForm ~ posts:",
    posts
  );
  const [image, setImage] = useState(0);
  const [errors, setErrors] = useState({});

  function checkCredentials() {
    const errObj = {};
    if (!image) errObj.image = "Image is required";
    setErrors(errObj);
  }
  const newPostImage = {
    post_id: postId,
    image,
  };
  if (!sessionUser) {
    history.push("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkCredentials();
    if (!Object.values(errors).length) {
      const formData = new FormData();
      formData.append("url", image);
      formData.append("post_id", postId);
      await dispatch(createPostImage(formData, postId)).then(() =>
        closeModal()
      );
    }
    // setRender(!render);
    history.push(`/posts/${postId}`);
  };

  useEffect(() => {
    allTheReviews(postId);
  }, [postId]);

  return (
    <div className="add-post-image-button-container">
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <h1>SO YOU WANNA CHANGE THE IMAGE NOW??</h1>
        <h3 className="form-label">
          Post #: {postId} {}
        </h3>
        <div className="form-input-box">
          <label className="form-label" htmlFor="image">
            Post Image:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </div>
        {errors.image && <p className="errors">{errors.image}</p>}
        <button className="button">Submit</button>
      </form>
    </div>
  );
}

export default ChangePostImageForm;
