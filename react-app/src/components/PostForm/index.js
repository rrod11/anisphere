import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createPost, getAllPosts } from "../../store/postReducer";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./postFormStyles.css";
const PostForm = () => {
  // form state
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  // My need to delete this code
  const maxFileError = "Selected image exceeds the maximum file size of 5Mb";
  const [imageURL, setImageURL] = useState(
    "https://res.cloudinary.com/dpdvw1sam/image/upload/v1702416959/Screenshot_2023-12-12_at_1.29.46_PM_pdmqtq.jpg"
  );
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  // if (!sessionUser) return <Redirect to="/" />;
  let disabled = false;
  const disable = () => {
    disabled = true;
  };

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];
    console.log("🚀 ~ file: index.js:33 ~ fileWrap ~ tempFile:", tempFile);

    // Check for max image size of 5Mb
    if (tempFile.size > 5000000) {
      setFilename(maxFileError); // "Selected image exceeds the maximum file size of 5Mb"
      return;
    }

    const newImageURL = URL.createObjectURL(tempFile);
    setImage(e.target.files[0]); // Generate a local URL to render the image file inside of the <img> tag.
    setImageURL(newImageURL);
    console.log("🚀 ~ file: index.js:33 ~ fileWrap ~ imagefile:", image);
    setFile(tempFile);
    setFilename(tempFile.name);
  };

  function checkForm() {
    const errObj = {};
    if (!description.length) {
      errObj.description = "Description is required";
    }
    if (!image) {
      errObj.image = "Image is required";
    }
    if (image) {
      if (image.name.includes(".webp")) {
        errObj.image = "Image type is not supported";
      }
      if (image.name.includes(".avif")) {
        errObj.image = "Image type is not supported";
      }
    }

    if (!title) {
      errObj.title = "Title is required";
    }
    setErrors(errObj);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkForm();

    if (Object.values(errors).length == 0) {
      setHasSubmitted(true);
      const formData = new FormData();
      formData.append("description", description);
      formData.append("title", title);
      formData.append("image", image);
      formData.append("user_id", sessionUser.id);
      // const newPost = {
      //     description,
      //     categories: currentUser.id,
      //     image,
      // };
      // await dispatch(createPost(formData));
      await dispatch(createPost(formData));

      setDescription("");
      setImage("");
      setValidationErrors([]);
      setHasSubmitted(false);
      history.push("/home");
    }
  };

  useEffect(() => {
    dispatch(getAllPosts());
    const errors = [];
    const errObj = {};
    if (!description.length) {
      errors.push("Please enter a post description!");
      // errObj.description = "Description is required";
    }
    if (!image) {
      errors.push("Please provide an image!");
      // errObj.image = "Image is required";
    }

    if (!title) {
      errors.push("Please provide a title");
      // errObj.title = "Title is required";
    }
    // setErrors(errObj);
    setValidationErrors(errors);
  }, [dispatch, description, image, title]);

  if (sessionUser) {
    return (
      <div className="post-form-page">
        {/* <div className="post-form-container"> */}
        <h1 className="post-form-header"> Create A New Post</h1>
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
              <label>Post Title</label>
            </div>
            <input
              id="title"
              type="text"
              value={title}
              className="post-inputs"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <span className="span-error-post">
            {errors.title && <p className="errors">{errors.title}</p>}
          </span>
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
              <label>Post Description</label>
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
          <span className="span-error-post">
            {errors.description && (
              <p className="errors">{errors.description}</p>
            )}
          </span>
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
          <span className="span-error-post">
            {errors.image && <p className="errors">{errors.image}</p>}
          </span>
          <button
            className="new-post-button"
            // disabled={disabled}
            // onClick={disable}
            onClick={checkForm}
          >
            Submit Post
          </button>
        </form>
        {/* </div> */}
      </div>
    );
  } else {
    return <Redirect to="/home" />;
  }
};

export default PostForm;
