import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createPost, editPost } from "../../store/postReducer";
import { useHistory } from "react-router-dom";
import "./editPost.css";
import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditPostForm = () => {
  // form state
  const { postId } = useParams();
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = Object.values(useSelector((state) => state.post.posts));
  const target = posts.find((ele) => ele.id == postId);
  console.log("🚀 ~ file: index.js:16 ~ EditPostForm ~ target:", target);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  // My need to delete this code
  const maxFileError = "Selected image exceeds the maximum file size of 5Mb";
  const [imageURL, setImageURL] = useState(target.image);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  let disabled = false;

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    // Check for max image size of 5Mb
    if (tempFile.size > 5000000) {
      setFilename(maxFileError); // "Selected image exceeds the maximum file size of 5Mb"
      return;
    }

    const newImageURL = URL.createObjectURL(tempFile);
    setImage(e.target.files[0]); // Generate a local URL to render the image file inside of the <img> tag.
    setImageURL(newImageURL);
    setFile(tempFile);
    setFilename(tempFile.name);
  };

  function checkForm() {
    const errObj = {};
    if (!description.length) {
      errObj.description = "Description is required";
    }
    if (image) {
      if (image.name.includes(".webp")) {
        errObj.image = "Image type is not supported";
      }
      if (image?.name.includes(".avif")) {
        errObj.image = "Image type is not supported";
      }
    }

    if (!title) {
      errObj.title = "Title is required";
    }
    setErrors(errObj);
    console.log("YOUR CURRENT ERRORS", Object.values(errors));
  }

  const stock = {
    id: postId,
    description: target.description,
    user_id: sessionUser.id,
    title: target.title,
    image: target.image,
  };

  const [description, setDescription] = useState(stock.description);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState(stock.title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkForm();
    if (Object.values(errors).length == 0) {
      const formData = new FormData();
      formData.append("id", stock.id);
      formData.append("description", description);
      formData.append("title", title);
      if (image) {
        formData.append("image", image);
      } else {
        formData.append("image", stock.image);
      }
      formData.append("user_id", sessionUser.id);
      formData.append("id", postId);
      console.log(
        "🚀 ~ file: index.js:36 ~ handleSubmit ~ formData:",
        formData
      );

      await dispatch(editPost(formData, postId));

      setDescription("");
      setImage("");
      setValidationErrors([]);
      setHasSubmitted(false);
      history.push(`/posts/${postId}`);
    }
  };
  const cancelButton = () => {
    history.push(`/posts/${postId}`);
  };
  useEffect(() => {
    const errors = [];
    if (!description.length) errors.push("Please enter a post description!");
    // if (!image) errors.push("Please provide an image!");
    if (!title) errors.push("Please provide a title");
    setValidationErrors(errors);
  }, [description, image, title]);

  const disable = () => {
    disabled = true;
  };
  if (sessionUser) {
    return (
      <div className="post-form-page">
        {/* <div className="post-form-container"> */}
        <h1 className="post-form-header"> Update Your Post</h1>
        {/* {hasSubmitted && validationErrors.length > 0 && (
          <div className="errors-info">
            <h2>The following errors were found:</h2>
          </div>
        )} */}
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <h3 className="form-label">
            User: {sessionUser?.firstname} {sessionUser?.lastname}
          </h3>
          <div className="title-input-box">
            <div
              className="floating-fillers-post"
              style={
                title
                  ? {
                      top: "-1.5px",
                      borderRadius: "25px",
                      background: "rgb(0, 255, 42)",
                    }
                  : null
              }
            >
              <label>Update Post Title</label>
            </div>
            <input
              id="title"
              type="text"
              value={title}
              className="post-inputs"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {errors.title && <p className="errors">{errors.title}</p>}
          <div className="description-input-box">
            <div
              className="floating-fillers-post"
              style={
                description
                  ? {
                      top: "-10.5px",
                      borderRadius: "25px",
                      background: "rgb(0, 255, 42)",
                    }
                  : null
              }
            >
              <label>Update Post Description</label>
            </div>
            <textarea
              id="description"
              type="textarea"
              rows="10"
              cols="45"
              onChange={(e) => setDescription(e.target.value)}
              className="post-inputs-description"
              value={description}
            />
          </div>
          {errors.description && <p className="errors">{errors.description}</p>}
          {/* <div className="image-input-box">
            <div>
              <label>ChoosePost Image</label>
            </div>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div> */}
          <div style={{ color: "red", fontSize: "22px" }}>
            ** .webp, .avif file types not supported. **
          </div>
          <div className="file-inputs-container">
            <input
              type="file"
              accept="image/*"
              id="post-image-input"
              onChange={fileWrap}
            ></input>
            <div
              className="file-inputs-filename"
              style={{ color: filename === maxFileError ? "red" : "#B7BBBF" }}
            >
              {filename}
            </div>
            <label htmlFor="post-image-input" className="file-input-labels">
              Choose File
            </label>
            <div style={{ position: "absolute", top: "-10px", left: "39px" }}>
              <img src={imageURL} className="thumbnails"></img>
            </div>
          </div>
          {errors.image && <p className="errors">{errors.image}</p>}
          <button
            className="new-post-button"
            disabled={disabled}
            onClick={checkForm}
          >
            Update Post
          </button>
        </form>
        {/* </div> */}
      </div>
    );
  } else {
    return <Redirect to="/home" />;
  }
};

export default EditPostForm;
