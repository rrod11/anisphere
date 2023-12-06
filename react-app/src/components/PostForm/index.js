import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createPost } from "../../store/postReducer";
import { useHistory } from "react-router-dom";
import "./postForm.css";

const PostForm = () => {
  // form state
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length)
      return alert("Your Post has errors, cannot submit!");

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
    history.push("/newpost");
  };

  useEffect(() => {
    const errors = [];
    if (!description.length) errors.push("Please enter a post description!");
    if (!image) errors.push("Please provide an image!");
    if (!title) errors.push("Please provide a title");
    setValidationErrors(errors);
  }, [description, image, title]);

  // useEffect(() => {
  //   dispatch(getAllPosts());
  // }, [dispatch]);

  return (
    <div className="form-page">
      <div className="form-container">
        <h1 className="form-header"> Create A New Post</h1>
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
              Post Title:
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
              Post Description:
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
              Post Image:
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <button className="button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
