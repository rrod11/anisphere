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
import { addALike, allLikes, editALike } from "../../store/likes";
import { addADislike, allDislikes, editADislike } from "../../store/dislikes";
import { allCategories } from "../../store/categoryReducer";
import { allPostCategories } from "../../store/postCategoryReducer";
import DebateDen from "./DebateDen";
import HaterHub from "./HaterHub";
import FanFaction from "./FanFaction";
import { allTheThreads } from "../../store/threadReducer";

const AnimePage = ({ posts }) => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();

  const target = Object.values(posts).find((ele) => ele.id == postId);
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review.reviews);
  const categories = useSelector((state) => state.category.categories);

  const postcategories = useSelector(
    (state) => state.postcategory.postcategories
  );
  const threads = useSelector((state) => state.thread.threads);
  console.log("🚀 ~ file: index.js:36 ~ AnimePage ~ threads:", threads);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadReviews, setLoadReviews] = useState(true);
  const [loadFanFaction, setLoadFanFaction] = useState(false);
  const [loadHaterHub, setLoadHaterHub] = useState(false);
  const [loadDebateDen, setLoadDebateDen] = useState(false);
  const userObj = useSelector((state) => state.user.users);
  const likes = useSelector((state) => state.like.likes);
  const likeArr = Object.values(likes).filter(
    (ele) => ele.post_id == target.id
  );
  const likeTotal = likeArr.filter((ele) => ele.likes == true).length;
  const dislikes = useSelector((state) => state.dislike.dislikes);
  const dislikeArr = Object.values(dislikes).filter(
    (ele) => ele.post_id == target.id
  );
  const dislikeTotal = dislikeArr.filter((ele) => ele.dislikes == true).length;
  const targetCategories = Object.values(postcategories).filter((ele) => {
    if (parseInt(ele.postId) === parseInt(postId)) {
      return ele;
    }
  });

  const targetCats = Object.values(categories).filter((ele) => {
    for (let item of targetCategories) {
      if (parseInt(ele.id) == parseInt(item.categoryId)) {
        return ele;
      }
    }
  });

  const [render, setRender] = useState(false);
  let liked = false;
  let disliked = false;
  let usersArray;
  if (userObj) {
    usersArray = Object.values(userObj);
  }
  if (sessionUser) {
    if (
      likeArr.find((ele) => ele.user_id == sessionUser.id && ele.likes == true)
    )
      liked = true;
    if (
      dislikeArr.find(
        (ele) => ele.user_id == sessionUser.id && ele.dislikes == true
      )
    )
      disliked = true;
  }
  const greenClick = async () => {
    if (!sessionUser) {
      history.push("/login");
    } else if (likeArr.find((ele) => ele.user_id == sessionUser.id)) {
      console.log("AM I IN THE ELSEIF?");
      const foundLike = likeArr.find((ele) => {
        return ele.user_id == sessionUser.id;
      });
      const stock = {
        id: foundLike?.id,
        likes: !foundLike?.likes,
        user_id: foundLike?.user_id,
        post_id: foundLike?.post_id,
      };
      await dispatch(editALike(stock.id, stock, postId));
      setRender(!render);
    } else {
      const stock = {
        likes: true,
        user_id: sessionUser?.id,
        post_id: postId,
      };

      await dispatch(addALike(postId, stock));
      setRender(!render);
    }
    setRender(!render);
  };
  const redClick = async () => {
    setRender(!render);
    if (!sessionUser) {
      history.push("/login");
    } else if (dislikeArr.find((ele) => ele.user_id == sessionUser.id)) {
      const foundDislike = dislikeArr.find((ele) => {
        return ele.user_id == sessionUser.id;
      });
      console.log(
        "🚀 ~ file: index.js:71 ~ foundDislike ~ foundDislike:",
        foundDislike
      );

      const stock = {
        id: foundDislike?.id,
        dislikes: !foundDislike?.dislikes,
        user_id: foundDislike?.user_id,
        post_id: foundDislike?.post_id,
      };
      console.log("🚀 ~ file: index.js:79 ~ redClick ~ stock:", stock);

      await dispatch(editADislike(stock.id, stock, postId));
      setRender(!render);
    } else {
      const stock = {
        dislikes: true,
        user_id: sessionUser?.id,
        post_id: postId,
      };
      console.log("🚀 ~ file: index.js:91 ~ redClick ~ stock:", stock);

      await dispatch(addADislike(postId, stock));
      setRender(!render);
    }
    setRender(!render);
  };
  // const reviewsLength = Object.values(
  //   useSelector((state) => state.review.reviews)
  // ).length;

  //OVERVIEW OF FIX FOR REvIEWS NOT LOADING
  let reviewArr;
  if (reviews) {
    reviewArr = orderReviews(
      Object.values(reviews).filter((ele) => {
        return ele.postId === parseInt(postId);
      })
    );
  }
  let orderedFinalReviewArr;
  if (reviewArr) {
    orderedFinalReviewArr = addUsers(reviewArr, usersArray);
  }
  function orderReviews(arr) {
    let newbie = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newbie.push(arr[i]);
    }
    return newbie;
  }
  function addUsers(list, users) {
    let newbie = [];
    for (let i = 0; i < list.length; i++) {
      list[i].user = users?.find((ele) => ele.id == list[i].userId);
      newbie.push(list[i]);
    }
    return newbie;
  }

  let sum = 0;
  if (target && orderedFinalReviewArr?.length >= 1) {
    sum = orderedFinalReviewArr?.reduce(
      (acc, review) => review?.rating + acc,
      0
    );
  }
  let avg;

  if (sum > 0) {
    avg = sum / orderedFinalReviewArr.length;
  }
  //END OF HARD FIX

  const goBack = () => {
    history.push("/home");
  };
  const closeMenu = () => setShowMenu(false);
  const editPost = () => history.push(`/posts/${target.id}/edit`);
  useEffect(async () => {
    const response = await fetch(`/api/reviews/post/${postId}`);
    const likes = await fetch(`/api/likes/all`);
    const dislikes = await fetch(`/api/dislikes/all`);
    dispatch(allLikes());
    dispatch(allDislikes());
    dispatch(allCategories());
    dispatch(allPostCategories());
    dispatch(allTheThreads());
    setIsLoaded(true);
  }, [dispatch, isLoaded, render]);
  if (!target) {
    return (
      <div className="no-anime-here">
        <h1>PSSSSSSSSSSSSSTTTTT!!!</h1>
        <h2>THERE'S NOT ANY ANIME AT THIS SPOT</h2>
        <div className="return-back-home-button">
          <h3>ALL DONE READING?</h3>
          <button onClick={goBack}>CLICK ME!!</button>
        </div>
      </div>
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
            <h1 className="post-title">{target.title}</h1>
            <div className="post-image-container">
              <div
                className="individual-post"
                style={
                  target
                    ? {
                        background: ` url(${target.image})`,
                        border: "none",
                        backgroundSize: "cover",
                        zIndex: "100",
                      }
                    : null
                }
              >
                <img
                  className="image-inside"
                  src={target.image}
                  alt="anime art"
                  style={{
                    width: "750px",
                    height: "750px",
                  }}
                />
              </div>
            </div>
            <div className="feeling-container">
              <div className="likes-c" style={{ color: "white" }}>
                {likeTotal}
                {sessionUser && liked ? (
                  <button
                    onClick={greenClick}
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      class="fa-solid fa-thumbs-up fa-fa-fa"
                      style={{ color: "#195419", fontSize: "30px" }}
                    ></i>
                  </button>
                ) : (
                  <button
                    onClick={greenClick}
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      class="fa-regular fa-thumbs-up fa-fa-fa"
                      style={{ color: "#195419", fontSize: "30px" }}
                    ></i>
                  </button>
                )}
              </div>
              <div className="dislikes-c" style={{ color: "white" }}>
                {dislikeTotal}
                {sessionUser && disliked ? (
                  <button
                    onClick={redClick}
                    style={{ background: "none", border: "none " }}
                  >
                    <i
                      class="fa-solid fa-thumbs-down fa-fa-fa"
                      style={{ color: "#ff0a0a", fontSize: "30px" }}
                    ></i>
                  </button>
                ) : (
                  <button
                    onClick={redClick}
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      onClick={redClick}
                      class="fa-regular fa-thumbs-down fa-fa-fa"
                      style={{ color: "#ff0a0a", fontSize: "30px" }}
                    ></i>
                  </button>
                )}
              </div>
            </div>
            <div className="description-container">
              <h3 className="post-description">{target.description}</h3>
            </div>
            <div
              className="cat-div"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <h6
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Categories:
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {targetCats.map((ele, index) => (
                    <li style={{ margin: "5px" }}>{`${index + 1}. ${
                      ele.name
                    }`}</li>
                  ))}
                </ul>
              </h6>
            </div>
            <div className="post-buttons-container">
              <div className="post-edit-button">
                {(sessionUser && target.userId == sessionUser.id) ||
                (sessionUser && sessionUser.adminKey == "roderick0318") ? (
                  <button onClick={editPost}>Edit Post</button>
                ) : null}
              </div>
              <div className="post-delete-button">
                {(sessionUser && target.userId == sessionUser.id) ||
                (sessionUser && sessionUser.adminKey == "roderick0318") ? (
                  <OpenModalButton
                    buttonText="Delete Post"
                    modalClasses={["add-delete-button-container"]}
                    onButtonClick={closeMenu}
                    modalComponent={<DeletePost postId={postId} />}
                  />
                ) : null}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "15px",
                margin: "30px",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <div>
                <h3
                  className="animeTab"
                  id={loadReviews ? "selected" : null}
                  onClick={() => {
                    setLoadReviews(true);
                    setLoadFanFaction(false);
                    setLoadHaterHub(false);
                    setLoadDebateDen(false);
                  }}
                >
                  Reviews
                </h3>
              </div>
              <div>
                <h3
                  className="animeTab"
                  id={loadFanFaction ? "selected" : null}
                  onClick={() => {
                    setLoadFanFaction(true);
                    setLoadReviews(false);
                    setLoadHaterHub(false);
                    setLoadDebateDen(false);
                  }}
                >
                  Fan Faction
                </h3>
              </div>
              <div>
                <h3
                  className="animeTab"
                  id={loadHaterHub ? "selected" : null}
                  onClick={() => {
                    setLoadHaterHub(true);
                    setLoadFanFaction(false);
                    setLoadReviews(false);
                    setLoadDebateDen(false);
                  }}
                >
                  Hater Hub
                </h3>
              </div>
              <div>
                <h3
                  className="animeTab"
                  id={loadDebateDen ? "selected" : null}
                  onClick={() => {
                    setLoadDebateDen(true);
                    setLoadFanFaction(false);
                    setLoadReviews(false);
                    setLoadHaterHub(false);
                  }}
                >
                  Debate Den
                </h3>
              </div>
            </div>
            {loadReviews ? (
              <>
                <div className="overallReviews">
                  {target && reviewArr?.length > 1 ? (
                    <span className="numberReviews">
                      <h1>
                        {reviewArr?.length} Reviews {avg?.toFixed(2)}
                      </h1>
                    </span>
                  ) : (
                    <span className="numberReviews">
                      <h1>{reviewArr?.length} Reviews</h1>
                    </span>
                  )}
                  <div
                    className="insideman"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <h1 style={{ padding: "0 5px 0 5px" }}>
                      {avg?.toFixed(2)}
                    </h1>
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

                {/* <Reviews list={target.reviews} posts={posts} theId={postId} /> */}
              </>
            ) : null}
            {loadFanFaction ? (
              <h1 style={{ color: "white" }}>
                WELCOME TO THE FAN FACTION FORUM
              </h1>
            ) : null}
            {loadHaterHub ? (
              <h1 style={{ color: "white" }}>WELCOME TO THE HATER HUB FORUM</h1>
            ) : null}
            {loadDebateDen ? (
              <h1 style={{ color: "white" }}>
                WELCOME TO THE DEBATE DEN FORUM
              </h1>
            ) : null}
            <div className="animeTabDisplay">
              {loadDebateDen && <DebateDen />}
              {loadFanFaction && <FanFaction />}
              {loadHaterHub && <HaterHub />}
              {loadReviews && (
                <Reviews list={target.reviews} posts={posts} theId={postId} />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AnimePage;
