import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import "./deleteModal.css";

import { useEffect } from "react";
import { deleteAPost, getAllPosts } from "../../store/postReducer";

//PLEASE CHANGE names/variables

function DeletePost({ postId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // const reviewer = useSelector((state) => state.review.reviews);

  const postLength = Object.values(
    useSelector((state) => state.post.posts)
  ).length;

  const deletePost = async (e) => {
    e.preventDefault();

    await dispatch(deleteAPost(postId))
      .then(closeModal)
      .then(() => history.push(`/home`));
  };
  useEffect(() => {
    getAllPosts();
  }, [postLength]);

  return (
    <div className="delete-button-container">
      <h2 id="delPostModalTitle">Confirm Delete</h2>
      <p id="delPostModalText">
        Are you sure you want to permanently DELETE this Post?
      </p>
      <div id="delPostModalButtons">
        <button id="delete-post-btn" onClick={deletePost}>
          Yes (Delete Post)
        </button>
        <button id="keep-post-btn" onClick={closeModal}>
          No (Keep Post)
        </button>
      </div>
    </div>
  );
}

export default DeletePost;
