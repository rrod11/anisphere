import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { allTheReviews } from "../../store/review";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../CreateReviewModal";
import DeleteReview from "../DeleteModal/deleteModalReview";
import EditReview from "../EditReviewModal/editModalReview";
import { getAllUsers } from "../../store/otherUsers";

function Reviews({ product }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { productId } = useParams();
  const products = useSelector((state) => state.products);
  const target = Object.values(products).find((ele) => ele.id == productId);
  const user = useSelector((state) => state.session.user);
  const users = Object.values(useSelector((state) => state.allUsers));
  const unorderedReviews = useSelector((state) => state.review);
  const review = orderReviews(Object.values(unorderedReviews));
  const reviews = addUsers(review, users);
  const [isLoaded, setIsLoaded] = useState(false);
  const reviewsLength = reviews?.length;
  function orderReviews(list) {
    let newbie = [];
    for (let i = list.length - 1; i >= 0; i--) {
      newbie.push(list[i]);
    }
    return newbie;
  }
  function addUsers(list, users) {
    let newbie = [];
    for (let i = 0; i < list.length; i++) {
      list[i].User = users?.find((ele) => ele.id == list[i].user_id);
      list[i].commented = false;
      newbie.push(list[i]);
    }
    console.log("This is newbie", newbie);
    return newbie;
  }
  let sum = 0;
  if (reviewsLength >= 1) {
    // reviews?.forEach((ele) => {
    //   sum = sum + ele.rating;
    // });
    sum = reviews?.reduce((acc, review) => review?.rating + acc, 0);
  }
  let avg;
  if (sum > 0) {
    avg = sum / reviewsLength;
  }

  let commented = false;
  const exists = (element) => element?.user_id == user.id;
  if (user && reviewsLength >= 1) {
    commented = reviews?.some(exists);
  }

  const owns = (ele) => ele.seller_id == user.id;

  const closeMenu = () => setShowMenu(false);
  useEffect(() => {
    dispatch(allTheReviews(productId))
      .then(() => dispatch(getAllUsers()))
      .then(() => setIsLoaded(true));
  }, [dispatch, reviewsLength]);
  const commentedat = "commented at";
  return (
    <>
      {isLoaded && reviewsLength >= 1 ? (
        reviews?.map(({ id, user_id, review, rating, created_at, User }) => (
          <div style={{ borderBottom: "1px solid grey", padding: "5px" }}>
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
                  {`${User.firstName}, ${User.username}`}
                  <span style={{ fontWeight: "bolder", fontSize: "12px" }}>
                    {" "}
                    commented at{" "}
                  </span>
                  {`${created_at}`}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <label>
                  <div
                    class="rating"
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
            {user?.id == user_id ? (
              <OpenModalButton
                modalClasses={["delete-button-container"]}
                buttonText="Delete Review"
                modalComponent={
                  <DeleteReview reviewId={id} productId={productId} />
                }
              />
            ) : null}
            {user?.id == user_id ? (
              <OpenModalButton
                modalClasses={["edit-button-container"]}
                buttonText="Edit Review"
                modalComponent={
                  <EditReview reviewId={id} productId={productId} />
                }
              />
            ) : null}
          </div>
        ))
      ) : (
        <h1>REVIEWS DON'T EXIST</h1>
      )}
    </>
  );
}

export default Reviews;
