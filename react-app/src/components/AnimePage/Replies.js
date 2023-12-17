import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import ReplyFormModal from "../ReplyModal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./animePage.css";
const Replies = ({ threadId }) => {
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
      <i class="fa-solid fa-comment" onClick={handleAddReply}></i>
      <div className="add-reply-button">
        <OpenModalButton
          buttonText="Add Reply"
          modalClasses={["add-reply-button", "button-reply"]}
          onButtonClick={closeMenu}
          modalComponent={
            <ReplyFormModal
              threadId={threadId}
              render={render}
              setRender={setRender}
            />
          }
        />
      </div>
    </div>
  );
};

export default Replies;
