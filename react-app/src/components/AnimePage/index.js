import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/postReducer";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../CreateReviewModal";
import "./animePage.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Reviews from "../Reviews";
import DeletePost from "../DeleteModal/deleteModalPost";

const AnimePage = ({ posts }) => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const target = Object.values(posts).find((ele) => ele.id == postId);
  // if (!target) {
  //   return null;
  // }
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  let sum = 0;
  if (target && target.reviews.length >= 1) {
    sum = target.reviews?.reduce((acc, review) => review?.rating + acc, 0);
  }
  let avg;
  if (sum > 0) {
    avg = sum / target.reviews.length;
  }
  const closeMenu = () => setShowMenu(false);
  const editPost = () => history.push(`/posts/${target.id}/edit`);
  useEffect(() => {
    dispatch(getAllPosts(sessionUser))
      .then(() => {
        setIsLoaded(true);
      })
      // .then(() => history.push("/home"))
      .then(() => history.push(`/posts/${postId}`));
  }, [dispatch, isLoaded]);

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

            <div className="overallReviews">
              {target && target.reviews.length < 1 ? (
                <span>
                  <h1>
                    {target.reviews.length} Reviews {avg?.toFixed(2)}
                  </h1>
                </span>
              ) : (
                <span>
                  <h1>{target.reviews.length} Reviews</h1>
                </span>
              )}
              <div
                className="insideman"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <h1 style={{ padding: "0 5px 0 5px" }}>{avg?.toFixed(2)}</h1>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="rating"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <i
                      className={
                        avg >= 1 || avg > 0.5
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        avg >= 2 || avg >= 1.5
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        avg >= 3 || avg >= 2.5
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        avg >= 4 || avg >= 3.5
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        avg >= 5 || avg >= 4.5
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                </label>
              </div>
            </div>
            {/* {user && user.id != product.seller_id ? ( */}
            <OpenModalButton
              buttonText="Add Review"
              modalClasses={["add-edit-button-container"]}
              onButtonClick={closeMenu}
              modalComponent={<ReviewFormModal postId={postId} />}
            />
            {/* // ) : null} */}
            <Reviews list={target.reviews} />
          </div>
          //{" "}
        </div>
      </>
    );
  }
  return null;
};

export default AnimePage;
