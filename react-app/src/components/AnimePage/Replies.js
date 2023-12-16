import React from "react";
// import { useNavigate } from "react-router-dom";

const Replies = ({ numberOfReplies, threadId }) => {
  //   const navigate = useNavigate();

  const handleAddReply = () => {
    // history.push(`/${threadId}/replies`);
    console.log("HITTIng IT");
  };

  return (
    <div className="likes__container">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 likesBtn"
      > */}
      <i class="fa-solid fa-comment" onClick={handleAddReply}></i>
      {/* </svg> */}
      <p style={{ color: "#434242" }}>
        {numberOfReplies === 0 ? "" : numberOfReplies}
      </p>
    </div>
  );
};

export default Replies;
