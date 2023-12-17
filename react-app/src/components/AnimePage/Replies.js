import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import ReplyFormModal from "../ReplyModal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Replies = ({ numberOfReplies, threadId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [render, setRender] = useState(false);
  const closeMenu = () => setShowMenu(false);
  // const { threadId } = useParams();

  const handleAddReply = () => {
    console.log("HITTIng IT");
    // <div className="add-review-button-outside-container">
    //   <div className="add-review-button-container">

    //   </div>
    // </div>;
  };

  return (
    <div
      className="likes__container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 likesBtn"
      > */}
      <i class="fa-solid fa-comment" onClick={handleAddReply}></i>
      <OpenModalButton
        buttonText="Add Reply"
        modalClasses={["add-reply-button"]}
        onButtonClick={closeMenu}
        modalComponent={
          <ReplyFormModal
            threadId={threadId}
            render={render}
            setRender={setRender}
          />
        }
      />
      {/* </svg> */}
      <p style={{ color: "#434242" }}>
        {numberOfReplies === 0 ? "" : numberOfReplies}
      </p>
    </div>
  );
};

export default Replies;
