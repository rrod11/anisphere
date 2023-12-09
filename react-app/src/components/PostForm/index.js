import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createPost, getAllPosts } from "../../store/postReducer";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./postFormStyles.css";
const PostForm = () => {
  // form state
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  // if (!sessionUser) return <Redirect to="/" />;
  let disabled = false;
  const disable = () => {
    disabled = true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ file: index.js:14 ~ PostForm ~ errors:", errors);

    setHasSubmitted(true);
    if (validationErrors.length) return console.log("YOU HAVE ERRORS!!!");

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
  };

  useEffect(() => {
    dispatch(getAllPosts());
    const errors = [];
    const errObj = {};
    if (!description.length) {
      errors.push("Please enter a post description!");
      errObj.description = "Description is required";
    }
    if (!image) {
      errors.push("Please provide an image!");
      errObj.image = "Image is required";
    }

    if (!title) {
      errors.push("Please provide a title");
      errObj.title = "Title is required";
    }
    setErrors(errObj);
    setValidationErrors(errors);
  }, [dispatch, description, image, title]);

  if (sessionUser) {
    return (
      <div className="post-form-page">
        <div className="post-form-container">
          <h1 className="post-form-header"> Create A New Post</h1>
          {hasSubmitted && validationErrors.length > 0 && (
            <div className="errors-info">
              <h2>The following errors were found:</h2>
            </div>
          )}
          <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <h3 className="form-label">
              User: {sessionUser?.firstname} {sessionUser?.lastname}
            </h3>
            <div className="title-input-box">
              <div
                className="floating-fillers"
                style={
                  title
                    ? {
                        top: "-35.5px",
                        background: "rgb(83, 225, 47)",
                        borderRadius: "25px",
                      }
                    : null
                }
              >
                <label className="form-label">Post Title:</label>
              </div>
              <input
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></input>
            </div>
            {errors.title && <p className="errors">{errors.title}</p>}
            <div className="description-input-box">
              <div
                className="floating-fillers-post"
                style={
                  description
                    ? {
                        top: "-10.5px",
                        background: "rgb(83, 225, 47)",
                        borderRadius: "25px",
                      }
                    : null
                }
              >
                <label className="form-label">Post Description:</label>
              </div>
              <textarea
                id="description"
                type="textarea"
                rows="10"
                cols="45"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            {errors.description && (
              <p className="errors">{errors.description}</p>
            )}
            <div className="form-input-box">
              <div>
                <label className="form-label">Post Image:</label>
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
            </div>
            {errors.image && <p className="errors">{errors.image}</p>}
            <button className="button" disabled={disabled} onClick={disable}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/home" />;
  }
};

export default PostForm;
