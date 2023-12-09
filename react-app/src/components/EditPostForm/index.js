import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createPost, editPost } from "../../store/postReducer";
import { useHistory } from "react-router-dom";
import "./editPost.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditPostForm = () => {
  // form state
  const { postId } = useParams();
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = Object.values(useSelector((state) => state.post.posts));
  const target = posts.find((ele) => ele.id == postId);
  const dispatch = useDispatch();
  const history = useHistory();
  let disabled = false;

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
    console.log("🚀 ~ file: index.js:36 ~ handleSubmit ~ formData:", formData);

    await dispatch(editPost(formData, postId));

    setDescription("");
    setImage("");
    setValidationErrors([]);
    setHasSubmitted(false);
    history.push(`/posts/${postId}`);
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

  return (
    <div className="form-page">
      <div className="form-container">
        <h1 className="form-header"> Edit Your New Post</h1>
        {hasSubmitted && validationErrors.length > 0 && (
          <div className="errors-info">
            <h2>The following errors were found:</h2>
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
          <h3 className="form-label">
            User: {sessionUser.firstname} {sessionUser.lastname}
          </h3>
          <div className="form-input-box">
            <label className="form-label" htmlFor="title">
              Update Title:
            </label>
            <input
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
          </div>
          <div className="form-input-box">
            <label className="form-label" htmlFor="description">
              Update Description:
            </label>
            <input
              id="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></input>
          </div>
          <div className="form-input-box">
            <label className="form-label" htmlFor="image">
              Update Image:
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <button className="button" disabled={disabled} onClick={disable}>
            Update Post
          </button>
          <button className="button" onClick={cancelButton}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;
