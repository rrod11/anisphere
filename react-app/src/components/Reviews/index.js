// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../../store/userReducer";
// import { NavLink } from "react-router-dom";
// import {
//   useHistory,
//   useParams,
// } from "react-router-dom/cjs/react-router-dom.min";
// import OpenModalButton from "../OpenModalButton";
// import DeleteReview from "../DeleteModal/deleteModalReview";
// import { allTheReviews } from "../../store/reviewReducer";
// import ReviewFormModal from "../CreateReviewModal";
// import EditReview from "../EditReviewModal/editModalReview";

// function Reviews({ list, posts }) {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const closeMenu = () => setShowMenu(false);
//   const { postId } = useParams();
//   const dispatch = useDispatch();
//   const orderedReviews = orderReviews(list);
//   // const reviews = useSelector((state) => state.review.reviews);
//   // console.log("🚀 ~ file: index.js:23 ~ Reviews ~ reviews HURRR:", reviews);
//   // const rArr = Object.values(reviews);
//   const target = Object.values(posts).find((ele) => ele.id == postId);
//   let sum = 0;
//   if (target && target.reviews.length >= 1) {
//     sum = target.reviews?.reduce((acc, review) => review?.rating + acc, 0);
//   }
//   let avg;
//   if (sum > 0) {
//     avg = sum / target.reviews.length;
//   }

//   function orderReviews(list) {
//     let newbie = [];
//     for (let i = list.length - 1; i >= 0; i--) {
//       newbie.push(list[i]);
//     }
//     return newbie;
//   }
//   useEffect(() => {
//     dispatch(getAllUsers())
//       .then(() => dispatch(allTheReviews()))
//       .then(() => {
//         setIsLoaded(true);
//       })
//       .then(() => {
//         history.push(`/posts/${postId}`);
//       });
//   }, [dispatch, isLoaded]);
//   const history = useHistory();
//   const usersObj = useSelector((state) => state.user);
//   const sessionUser = useSelector((state) => state.session.user);

//   if (!orderReviews.length || !Object.values(usersObj).length) {
//     return (
//       <>
//         <h1>Reviews Aren't Ready</h1>
//       </>
//     );
//   }
//   const usersArr = Object.values(usersObj.users);
//   function addUsers(list, users) {
//     let newbie = [];
//     for (let i = 0; i < list.length; i++) {
//       list[i].user = users?.find((ele) => ele.id == list[i].userId);
//       newbie.push(list[i]);
//     }
//     return newbie;
//   }
//   const reviewsFinal = addUsers(orderedReviews, usersArr);
//   return (
//     <>
//       <div className="overallReviews">
//         {target && target.reviews?.length < 1 ? (
//           <span>
//             <h1>
//               {target.reviews?.length} Reviews {avg?.toFixed(2)}
//             </h1>
//           </span>
//         ) : (
//           <span>
//             <h1>{target.reviews?.length} Reviews</h1>
//           </span>
//         )}
//         <div
//           className="insideman"
//           style={{ display: "flex", justifyContent: "space-around" }}
//         >
//           <h1 style={{ padding: "0 5px 0 5px" }}>{avg?.toFixed(2)}</h1>
//           <label style={{ display: "flex", alignItems: "center" }}>
//             <div
//               className="rating"
//               style={{ display: "flex", flexDirection: "row" }}
//             >
//               <i
//                 className={
//                   avg >= 1 || avg > 0.5
//                     ? "fa-solid fa-star"
//                     : "fa-regular fa-star"
//                 }
//               ></i>
//               <i
//                 className={
//                   avg >= 2 || avg >= 1.5
//                     ? "fa-solid fa-star"
//                     : "fa-regular fa-star"
//                 }
//               ></i>
//               <i
//                 className={
//                   avg >= 3 || avg >= 2.5
//                     ? "fa-solid fa-star"
//                     : "fa-regular fa-star"
//                 }
//               ></i>
//               <i
//                 className={
//                   avg >= 4 || avg >= 3.5
//                     ? "fa-solid fa-star"
//                     : "fa-regular fa-star"
//                 }
//               ></i>
//               <i
//                 className={
//                   avg >= 5 || avg >= 4.5
//                     ? "fa-solid fa-star"
//                     : "fa-regular fa-star"
//                 }
//               ></i>
//             </div>
//           </label>
//         </div>
//       </div>
//       <OpenModalButton
//         buttonText="Add Review"
//         modalClasses={["add-edit-button-container"]}
//         onButtonClick={closeMenu}
//         modalComponent={<ReviewFormModal postId={postId} />}
//       />
//       {isLoaded && reviewsFinal?.length >= 1 ? (
//         reviewsFinal?.map(({ id, userId, review, rating, user }) => (
//           <div
//             style={{ borderBottom: "1px solid grey", padding: "5px" }}
//             key={id}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 width: "90%",
//               }}
//             >
//               <div>
//                 <p
//                   style={{
//                     fontSize: "20px",
//                   }}
//                 >
//                   {review}
//                 </p>
//                 <p
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "16px",
//                     color: "darkgray",
//                   }}
//                 >
//                   {`${user?.firstname} ${user?.lastname}`}
//                 </p>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-around" }}>
//                 <label>
//                   <div
//                     className="rating"
//                     style={{ display: "flex", flexDirection: "row" }}
//                   >
//                     <i
//                       className={
//                         rating >= 1 || rating > 1
//                           ? "fa-solid fa-star"
//                           : "fa-regular fa-star"
//                       }
//                     ></i>
//                     <i
//                       className={
//                         rating >= 2 || rating > 2
//                           ? "fa-solid fa-star"
//                           : "fa-regular fa-star"
//                       }
//                     ></i>
//                     <i
//                       className={
//                         rating >= 3 || rating > 3
//                           ? "fa-solid fa-star"
//                           : "fa-regular fa-star"
//                       }
//                     ></i>
//                     <i
//                       className={
//                         rating >= 4 || rating > 3
//                           ? "fa-solid fa-star"
//                           : "fa-regular fa-star"
//                       }
//                     ></i>
//                     <i
//                       className={
//                         rating >= 5 || rating > 4
//                           ? "fa-solid fa-star"
//                           : "fa-regular fa-star"
//                       }
//                     ></i>
//                   </div>
//                 </label>
//               </div>
//             </div>
//             {userId == sessionUser?.id ||
//             sessionUser?.adminKey == "roderick0318" ? (
//               <OpenModalButton
//                 modalClasses={["delete-button-container"]}
//                 buttonText="Delete Review"
//                 modalComponent={<DeleteReview reviewId={id} postId={postId} />}
//               />
//             ) : null}
//             {userId == sessionUser?.id ? (
//               <OpenModalButton
//                 modalClasses={["edit-button-container"]}
//                 buttonText="Edit Review"
//                 modalComponent={<EditReview reviewId={id} postId={postId} />}
//               />
//             ) : null}
//           </div>
//         ))
//       ) : (
//         <h1>REVIEWS DON'T EXIST</h1>
//       )}
//     </>
//   );
// }

// export default Reviews;
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
import { allTheReviews, getReviews } from "../../store/reviewReducer";
import ReviewFormModal from "../CreateReviewModal";
import EditReview from "../EditReviewModal/editModalReview";

function Reviews({ list, posts }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  const { postId } = useParams();
  const dispatch = useDispatch();
  // const reviewResponse = () => async (dispatch) => {
  //   const response = await fetch("/api/reviews/all");
  //   const data = await response.json();
  //   dispatch(getReviews(data));
  //   console.log(
  //     "🚀 ~ file: index.js:271 ~ reviewResponse ~ response:",
  //     response
  //   );
  //   return response;
  // };
  // console.log(
  //   "🚀 ~ file: index.js:272 ~ reviewResponse ~ reviewResponse:",
  //   reviewResponse
  // );
  const reviewObj = useSelector((state) => state.review.reviews);
  // const reviewArr = Object.values(reviewObj);
  // console.log("🚀 ~ file: index.js:282 ~ Reviews ~ reviewArr:", reviewArr);
  const postObj = useSelector((state) => state.post.posts);
  // console.log("🚀 ~ file: index.js:282 ~ Reviews ~ postObj:", postObj);
  // console.log("🚀 ~ file: index.js:23 ~ Reviews ~ reviews HURRR:", reviews);
  const postArr = Object.values(postObj);
  // console.log("🚀 ~ file: index.js:285 ~ Reviews ~ postArr:", postArr);
  const target = Object.values(postArr).find((ele) => ele.id == postId);
  const orderedReviews = orderReviews(target.reviews);
  console.log(
    "🚀 ~ file: index.js:287 ~ Reviews ~ target:",
    target.reviews.length
  );
  let sum = 0;
  if (target && target.reviews.length >= 1) {
    sum = target.reviews?.reduce((acc, review) => review?.rating + acc, 0);
  }
  let avg;
  if (sum > 0) {
    avg = sum / target.reviews.length;
  }

  function orderReviews(arr) {
    let newbie = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newbie.push(arr[i]);
    }
    return newbie;
  }
  useEffect(() => {
    dispatch(getAllUsers())
      .then(() => dispatch(allTheReviews()))
      .then(() => {
        setIsLoaded(true);
      })
      .then(() => {
        history.push(`/posts/${postId}`);
      });
  }, [dispatch, isLoaded]);
  const history = useHistory();
  const usersObj = useSelector((state) => state.user);
  const sessionUser = useSelector((state) => state.session.user);

  if (!orderReviews.length || !Object.values(usersObj).length) {
    return (
      <>
        <h1>Reviews Aren't Ready</h1>
      </>
    );
  }
  const usersArr = Object.values(usersObj.users);
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
      <div className="overallReviews">
        {target && target.reviews?.length < 1 ? (
          <span>
            <h1>
              {target.reviews?.length} Reviews {avg?.toFixed(2)}
            </h1>
          </span>
        ) : (
          <span>
            <h1>{target.reviews?.length} Reviews</h1>
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
      <OpenModalButton
        buttonText="Add Review"
        modalClasses={["add-edit-button-container"]}
        onButtonClick={closeMenu}
        modalComponent={<ReviewFormModal postId={postId} />}
      />
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
                  {`${user?.firstname} ${user?.lastname}`}
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
            ) : null}
            {userId == sessionUser?.id ? (
              <OpenModalButton
                modalClasses={["edit-button-container"]}
                buttonText="Edit Review"
                modalComponent={<EditReview reviewId={id} postId={postId} />}
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
