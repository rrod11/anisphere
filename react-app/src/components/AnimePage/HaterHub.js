import React, { useState } from "react";

const HaterHub = () => {
  const [thread, setThread] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ thread });
    setThread("");
  };
  return (
    <>
      <main className="haterHub">
        <h2 className="haterHubTitle">Create a Thread</h2>
        <form className="haterHubForm" onSubmit={handleSubmit}>
          <div className="haterHub__container">
            <label htmlFor="thread">Title / Description</label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <button className="haterHubBtn">CREATE THREAD</button>
        </form>
      </main>
    </>
  );
};

export default HaterHub;
