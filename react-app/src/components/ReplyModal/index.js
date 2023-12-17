import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import {
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { allTheReplies, createAReply } from "../../store/replyReducer";

function ReplyFormModal({ threadId, render, setRender }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [replyText, setReplyText] = useState("");
  const [errors, setErrors] = useState({});

  function checkCredentials() {
    const errObj = {};
    if (!replyText || replyText.length < 4)
      errObj.replyText = "Reply must be at least 4 characters";
    setErrors(errObj);
  }
  const newReply = {
    user_id: sessionUser?.id,
    thread_id: threadId,
    reply: replyText,
  };
  if (!sessionUser) {
    history.push("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkCredentials();
    if (!Object.values(errors).length) {
      await dispatch(createAReply(threadId, newReply)).then(() => closeModal());
    }
    setRender(!render);
  };

  useEffect(() => {
    allTheReplies();
  }, [threadId]);

  return (
    <div className="add-review-container">
      {sessionUser == null ? (
        <h1>PLEASE SIGN IN</h1>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="title">Reply to this Thread</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label style={{ width: "100%" }}>
              <textarea
                className="textarea"
                rows="5"
                cols="20"
                placeholder="Leave your reply here"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </label>
            <span className="span-error-cr">
              {errors.replyText && <p className="errors">{errors.replyText}</p>}
            </span>
            <button
              type="submit"
              id="add-review"
              onClick={checkCredentials}
              style={{
                // backgroundColor: "tan",
                maxWidth: "100%",
                width: "300px",
              }}
            >
              Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReplyFormModal;
