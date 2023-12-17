import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userReducer";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { allTheThreads, createAThread } from "../../store/threadReducer";
import Likes from "./Likes";
import Replies from "./Replies";

const FanFaction = () => {
  const { postId } = useParams();
  console.log("🚀 ~ file: FanFaction.js:8 ~ FanFaction ~ postId:", postId);
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const userArr = Object.values(useSelector((state) => state.user.users));
  const threads = Object.values(useSelector((state) => state.thread.threads));
  console.log("🚀 ~ file: FanFaction.js:17 ~ FanFaction ~ threads:", threads);
  const collected = threads?.filter((ele) => {
    if (ele.postId == postId) {
      return ele;
    }
  });
  const fanThreads = addUsers(orderReviews(collected), userArr);
  console.log(
    "🚀 ~ file: FanFaction.js:20 ~ FanFaction ~ fanThread:",
    fanThreads
  );
  function orderReviews(arr) {
    let newbie = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newbie.push(arr[i]);
    }
    return newbie;
  }
  function addUsers(arr, list) {
    let newbie = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].user = list?.find((ele) => ele.id == arr[i].userId);
      newbie.push(arr[i]);
    }
    return newbie;
  }
  // const [thread, setThread] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  function checkForm() {
    const errObj = {};
    if (!title) {
      errObj.title = "Title is required";
    }
    setErrors(errObj);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const newThread = {
      title,
      description,
      post_id: postId,
      user_id: sessionUser.id,
      fan: true,
      hater: false,
      debate: false,
    };
    const response = await dispatch(createAThread(postId, newThread));
    console.log(
      "🚀 ~ file: FanFaction.js:53 ~ handleSubmit ~ response:",
      response
    );
    // setThread("");
    setTitle("");
    setDescription("");
    setIsLoaded(!isLoaded);
  };
  useEffect(async () => {
    dispatch(getAllUsers());
    dispatch(allTheThreads());
    setIsLoaded(true);
  }, [dispatch, isLoaded]);
  return (
    <>
      <main className="fanFaction">
        <h2
          className="fanFactionTitle"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Create a Thread
        </h2>
        <form className="fanFactionForm" onSubmit={handleSubmit}>
          <div className="title-input-box">
            <div
              className="floating-fillers-post"
              style={
                title
                  ? {
                      top: "-1.5px",
                      borderRadius: "25px",
                      background: "rgb(0, 255, 42)",
                    }
                  : null
              }
            >
              <label>Forum Title</label>
            </div>
            <input
              id="title"
              type="text"
              value={title}
              className="post-inputs"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <span className="span-error-post">
            {errors.title && <p className="errors">{errors.title}</p>}
          </span>
          <div className="description-input-box">
            <div
              className="floating-fillers-post"
              style={
                description
                  ? {
                      top: "-10.5px",
                      borderRadius: "25px",
                      background: "rgb(0, 255, 42)",
                    }
                  : null
              }
            >
              <label>Forum Description</label>
            </div>
            <textarea
              id="description"
              type="textarea"
              rows="5"
              cols="45"
              onChange={(e) => setDescription(e.target.value)}
              className="post-inputs-description"
              value={description}
            />
          </div>
          <button
            onClick={checkForm}
            className="fanFactionBtn"
            style={{
              padding: "10px",
              margin: "10px",
              borderRadius: "15px",
              border: "none",
              background: "gold",
            }}
          >
            CREATE THREAD
          </button>
        </form>
      </main>
      {fanThreads.length ? (
        fanThreads?.map(
          ({ id, description, title, threadlikes, user, replies }) => (
            <div key={id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: " 5px 10px",
                }}
              >
                <div>
                  <h2 style={{ color: "white" }}>{title}</h2>
                  <p>{description}</p>
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
                <div>
                  <div className="react__container" style={{ color: "white" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div>
                        <Likes threadlikes={threadlikes} threadId={id} />
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ margin: "10px" }}>{replies.length}</div>
                      <div style={{ margin: "10px" }}>
                        <Replies
                          // numberOfReplies={replies?.length}
                          threadId={id}
                          title={title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {replies.length > 0 ? (
                <div>
                  <h4>Replies: </h4>
                  {replies.map((ele) => (
                    <div style={{ margin: "20px 30px" }}>{ele.reply}</div>
                  ))}
                </div>
              ) : null}
            </div>
          )
        )
      ) : (
        <h1>THE FANS ARE WEAK HERE</h1>
      )}
    </>
  );
};

export default FanFaction;
