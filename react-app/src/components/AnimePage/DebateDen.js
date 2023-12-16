import React, { useState } from "react";

const DebateDen = () => {
  const [thread, setThread] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ thread });
    setThread("");
  };
  return (
    <>
      <main className="debateDen">
        <h2 className="debateDenTitle">Create a Thread</h2>
        <form className="debateDenForm" onSubmit={handleSubmit}>
          <div className="debateDen__container">
            <label htmlFor="thread">Title / Description</label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <button className="debateDenBtn">CREATE THREAD</button>
        </form>
      </main>
    </>
  );
};

export default DebateDen;
