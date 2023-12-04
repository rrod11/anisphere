// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import { createPost } from "../../store/postReducer";
// import { useHistory } from "react-router-dom";
// import "./postForm.css";

// const PostForm = () => {
//   // form state
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [validationErrors, setValidationErrors] = useState([]);
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   // current user state
//   const currentUser = useSelector((state) => state.session);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const submitForm = async (e) => {
//     e.preventDefault();

//     setHasSubmitted(true);
//     if (validationErrors.length)
//       return alert("Your Post has errors, cannot submit!");

//     const formData = new FormData();
//     formData.append("description", description);
//     formData.append("categories", currentUser.id);
//     formData.append("image", image);
//     // const newPost = {
//     //     description,
//     //     categories: currentUser.id,
//     //     image,
//     // };
//     await dispatch(createPost(formData));

//     setDescription("");
//     setImage("");
//     setValidationErrors([]);
//     setHasSubmitted(false);
//     history.push("/feed");
//   };

//   useEffect(() => {
//     const errors = [];
//     if (!description.length) errors.push("Please enter a post description!");
//     if (!image) errors.push("Please provide an image!");
//     setValidationErrors(errors);
//   }, [description, image]);

//   return (
//     <div className="form-page">
//       <div className="form-container">
//         <h1 className="form-header"> Create New Post</h1>
//         {hasSubmitted && validationErrors.length > 0 && (
//           <div className="errors-info">
//             <h2>The following errors were found:</h2>
//             <ul>
//               {validationErrors.map((error) => (
//                 <li key={error}>{error}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <form onSubmit={(e) => submitForm(e)} encType="multipart/form-data">
//           <h3 className="form-label">User: {currentUser.username}</h3>
//           <div className="form-input-box">
//             <label className="form-label" htmlFor="description">
//               Post description:
//             </label>
//             <input
//               id="description"
//               type="text"
//               onChange={(e) => setDescription(e.target.value)}
//               value={description}
//             ></input>
//           </div>
//           <div className="form-input-box">
//             <label className="form-label" htmlFor="image">
//               Post Image:
//             </label>
//             <input
//               id="image"
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//             ></input>
//           </div>
//           <button className="button">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostForm;
