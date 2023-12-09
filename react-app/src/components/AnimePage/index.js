import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/postReducer";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../CreateReviewModal";
import "./animePage.css";
import { Redirect, useParams, Navigate } from "react-router-dom";
import Reviews from "../Reviews";
import DeletePost from "../DeleteModal/deleteModalPost";
import { allTheReviews } from "../../store/reviewReducer";

const AnimePage = ({ posts }) => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const target = Object.values(posts).find((ele) => ele.id == postId);
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review.reviews);
  const [isLoaded, setIsLoaded] = useState(false);
  // const reviewsLength = Object.values(
  //   useSelector((state) => state.review.reviews)
  // ).length;
  // let sum = 0;
  // if (target && target.reviews.length >= 1) {
  //   sum = target.reviews?.reduce((acc, review) => review?.rating + acc, 0);
  // }
  // let avg;
  // if (sum > 0) {
  //   avg = sum / target.reviews.length;
  // }
  const closeMenu = () => setShowMenu(false);
  const editPost = () => history.push(`/posts/${target.id}/edit`);
  useEffect(async () => {
    const response = await fetch(`/api/reviews/post/${postId}`);
    // dispatch(getAllPosts(sessionUser))
    //   .then(() => allTheReviews())
    //   .then(() => allTheReviews())
    //   .then(() => {
    //     setIsLoaded(true);
    //   })
    //   .then(() => history.push(`/posts/${postId}`));
    setIsLoaded(true);
  }, [dispatch, isLoaded]);
  if (!target) {
    return (
      <>
        <h1>YUUUUURRRRRRRRRR!!!</h1>
        <h2>THERES NO ANIME AT THIS SPOT</h2>
      </>
    );
  }

  if (target) {
    return (
      <>
        <div id="post-page">
          <div className="wrapper">
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h3 className="h3">
              <span className="dot"></span>
            </h3>
            <h1>{target.title}</h1>
            <div className="individual-post">
              <img
                src={target.image}
                alt="anime art"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
            <h3>{target.description}</h3>
            {(sessionUser && target.userId == sessionUser.id) ||
            (sessionUser && sessionUser.adminKey == "roderick0318") ? (
              <button onClick={editPost}>Edit Post</button>
            ) : null}
            {(sessionUser && target.userId == sessionUser.id) ||
            (sessionUser && sessionUser.adminKey == "roderick0318") ? (
              <OpenModalButton
                buttonText="Delete Post"
                modalClasses={["add-delete-button-container"]}
                onButtonClick={closeMenu}
                modalComponent={<DeletePost postId={postId} />}
              />
            ) : null}
            <Reviews list={target.reviews} posts={posts} theId={postId} />
          </div>
        </div>
      </>
    );
  }
};

export default AnimePage;
