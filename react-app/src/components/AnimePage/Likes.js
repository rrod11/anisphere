import React from "react";

const Likes = ({ numberOfLikes, threadId }) => {
  return (
    <div className="likes__container">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 likesBtn"
      > */}
      <i class="fa-solid fa-thumbs-up"></i>
      {/* </svg> */}
      <p style={{ color: "#434242" }}>
        {numberOfLikes === 0 ? "" : numberOfLikes}
      </p>
    </div>
  );
};

export default Likes;
