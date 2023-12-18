import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import ReplyFormModal from "../ReplyModal";
import {
  addAThreadlike,
  editAThreadlike,
} from "../../store/threadlikesReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Likes = ({ threadlikes, threadId, render, setRender }) => {
  console.log("🚀 ~ file: Likes.js:11 ~ Likes ~ threadlikes:", threadlikes);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const [render, setRender] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const closeMenu = () => setShowMenu(false);
  // const threadlikes = Object.values(likes).filter(
  //   (ele) => ele.post_id == target.id
  // );
  const tLikes = threadlikes.filter((ele) => {
    if (ele.likes == true) {
      return ele;
    }
  });
  console.log("🚀 ~ file: Likes.js:27 ~ tLikes ~ tLikes:", tLikes);
  let liked = false;
  if (sessionUser) {
    if (
      threadlikes.find(
        (ele) => ele.user_id == sessionUser.id && ele.likes == true
      )
    )
      liked = true;
  }
  const greenClick = async () => {
    if (!sessionUser) {
      history.push("/login");
    } else if (threadlikes.find((ele) => ele.user_id == sessionUser.id)) {
      console.log("AM I IN THE ELSEIF?");
      const foundLike = threadlikes.find((ele) => {
        return ele.user_id == sessionUser.id;
      });
      const stock = {
        id: foundLike?.id,
        likes: !foundLike?.likes,
        user_id: foundLike?.user_id,
        thread_id: foundLike?.thread_id,
      };
      await dispatch(editAThreadlike(stock.id, stock, stock.thread_id));
      setRender(!render);
    } else {
      const stock = {
        likes: true,
        user_id: sessionUser?.id,
        thread_id: threadId,
      };

      await dispatch(addAThreadlike(threadId, stock));
      setRender(!render);
    }
    setRender(!render);
  };
  return (
    <div
      className="threadlikes__container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <p style={{ margin: "0 10px" }}>{tLikes.length}</p>
      <div className="likes-c" style={{ color: "white", margin: "0 10px" }}>
        {sessionUser && liked ? (
          <button
            onClick={greenClick}
            style={{ background: "none", border: "none" }}
          >
            <i
              class="fa-solid fa-thumbs-up fa-fa-fa"
              style={{
                color: "#195419",
                // fontSize: "30px"
              }}
            ></i>
          </button>
        ) : (
          <button
            onClick={greenClick}
            style={{ background: "none", border: "none" }}
          >
            <i
              class="fa-regular fa-thumbs-up fa-fa-fa"
              style={{
                color: "#195419",
                // fontSize: "30px"
              }}
            ></i>
          </button>
        )}
      </div>
      {/* <i class="fa-solid fa-thumbs-up"></i> */}

      {/* <p style={{ color: "#434242" }}>
        {numberOfLikes === 0 ? "" : numberOfLikes}
      </p> */}
    </div>
  );
};

export default Likes;
