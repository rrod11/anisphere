import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userReducer";
import { NavLink } from "react-router-dom";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteModal/deleteModalReview";
import { allTheReviews } from "../../store/reviewReducer";
import EditReview from "../EditReviewModal/editModalReview";
// import ReviewFormModal from "../CreateReviewModal";
// import DeleteReview from "../DeleteModal/deleteModalReview";
// import EditReview from "../EditReviewModal/editModalReview";

function Reviews({ list }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const orderedReviews = orderReviews(list);
  console.log(
    "🚀 ~ file: index.js:21 ~ Reviews ~ orderReviews:",
    orderedReviews
  );
  function orderReviews(list) {
    let newbie = [];
    for (let i = list.length - 1; i >= 0; i--) {
      newbie.push(list[i]);
    }
    return newbie;
  }
  useEffect(() => {
    dispatch(getAllUsers())
      .then(() => {
        setIsLoaded(true);
      })
      .then(() => dispatch(allTheReviews()))
      .then(() => {
        history.push(`/posts/${postId}`);
      });
  }, [dispatch, isLoaded]);
  const history = useHistory();
  const usersObj = useSelector((state) => state.user.users);
  const sessionUser = useSelector((state) => state.session.user);

  if (!usersObj) {
    return (
      <>
        <h1>Reviews Aren't Ready</h1>
      </>
    );
  }
  const usersArr = Object.values(usersObj);
  function addUsers(list, users) {
    let newbie = [];
    for (let i = 0; i < list.length; i++) {
      list[i].user = users?.find((ele) => ele.id == list[i].userId);
      newbie.push(list[i]);
    }
    return newbie;
  }
  const reviewsFinal = addUsers(orderedReviews, usersArr);

  return (
    <>
      <h1>In Reviews</h1>
      {isLoaded && reviewsFinal?.length >= 1 ? (
        reviewsFinal?.map(({ id, userId, review, rating, user }) => (
          <div
            style={{ borderBottom: "1px solid grey", padding: "5px" }}
            key={id}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {review}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "darkgray",
                  }}
                >
                  {`${user.firstname} ${user.lastname}`}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <label>
                  <div
                    className="rating"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <i
                      className={
                        rating >= 1 || rating > 1
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        rating >= 2 || rating > 2
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        rating >= 3 || rating > 3
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        rating >= 4 || rating > 3
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                    <i
                      className={
                        rating >= 5 || rating > 4
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </div>
                </label>
              </div>
            </div>
            {userId == sessionUser?.id ||
            sessionUser?.adminKey == "roderick0318" ? (
              <OpenModalButton
                modalClasses={["delete-button-container"]}
                buttonText="Delete Review"
                modalComponent={<DeleteReview reviewId={id} postId={postId} />}
              />
            ) : // <h1>READY TO DELETE</h1>
            null}
            {userId == sessionUser?.id ? (
              <OpenModalButton
                modalClasses={["edit-button-container"]}
                buttonText="Edit Review"
                modalComponent={<EditReview reviewId={id} postId={postId} />}
              />
            ) : // <h1>READY TO EDIT??</h1>
            null}
          </div>
        ))
      ) : (
        <h1>REVIEWS DON'T EXIST</h1>
      )}
    </>
  );
}

export default Reviews;
