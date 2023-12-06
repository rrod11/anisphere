import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userReducer";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
// import ReviewFormModal from "../CreateReviewModal";
// import DeleteReview from "../DeleteModal/deleteModalReview";
// import EditReview from "../EditReviewModal/editModalReview";

function Reviews({ list }) {
  console.log("🚀 ~ file: index.js:13 ~ Reviews ~ list:", list);
  const dispatch = useDispatch();
  const usersObj = useSelector((state) => state.user.users);
  const sessionUser = useSelector((state) => state.session.user);
  const usersArr = Object.values(usersObj);
  console.log("🚀 ~ file: index.js:14 ~ Reviews ~ users:", usersArr);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  function addUsers(list, users) {
    let newbie = [];
    for (let i = 0; i < list.length; i++) {
      list[i].user = users?.find((ele) => ele.id == list[i].userId);
      newbie.push(list[i]);
    }
    console.log("This is newbie", newbie);
    return newbie;
  }
  const reviewsFinal = addUsers(list, usersArr);

  useEffect(() => {
    dispatch(getAllUsers()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, isLoaded]);
  return (
    <>
      <h1>In Reviews</h1>
      {isLoaded && list?.length >= 1 ? (
        list?.map(({ userId, review, rating, user }) => (
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
                  {`${user.firstname} ${user.lastname}`}
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
            {userId == sessionUser?.id ||
            sessionUser?.adminKey == "roderick0318" ? (
              // <OpenModalButton
              //   modalClasses={["delete-button-container"]}
              //   buttonText="Delete Review"
              //   modalComponent={
              //     <DeleteReview reviewId={id} productId={productId} />
              //   }
              // />
              <h1>READY TO DELETE</h1>
            ) : null}
            {userId == sessionUser?.id ? (
              // <OpenModalButton
              //   modalClasses={["edit-button-container"]}
              //   buttonText="Edit Review"
              //   modalComponent={
              //     <EditReview reviewId={id} productId={productId} />
              //   }
              // />
              <h1>READY TO EDIT??</h1>
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
