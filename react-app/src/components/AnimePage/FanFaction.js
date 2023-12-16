import React, { useState } from "react";

const FanFaction = () => {
  const [thread, setThread] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ thread });
    setThread("");
  };
  return (
    <>
      <main className="fanFaction">
        <h2 className="fanFactionTitle">Create a Thread</h2>
        <form className="fanFactionForm" onSubmit={handleSubmit}>
          <div className="fanFaction__container">
            <label htmlFor="thread">Title / Description</label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <button className="fanFactionBtn">CREATE THREAD</button>
        </form>
      </main>
    </>
  );
};

export default FanFaction;
