import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AboutMe.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AboutMe() {
  const dispatch = useDispatch();
  const history = useHistory();

  const goBack = () => {
    history.push("/home");
  };
  return (
    <>
      <div className="main-about-container">
        <h1>About Me!</h1>
        <p>
          Hello there! 👋 I'm Roderick, a passionate, dedicated, and motivated
          individual with a love for technology and a keen interest in video,
          game, and website development. Let me give you a glimpse into who I am
          and what I bring to the table.
        </p>
        <h2>Who Am I??</h2>
        <p>
          I am a Full Stack Junior Developer based in Charlotte, North Carolina.
          With a background in the pre-Medical sciences with a Bachelor of
          Science in Biology, I've cultivated a strong foundation in Software
          Engineering. My journey in Software Engineering has been fueled by a
          curiosity-driven mindset and a relentless pursuit of knowledge that
          stems from my love of computers and my uncompromising pursuit of
          "Why?".
        </p>
        <h2>What I Do</h2>
        <p>
          Currently, I am a recent graduate of App Academy, where I cultivated
          and nurtured my understanding and experience in the field of Software
          Engineering. My work revolves around creating functions to satisfy a
          plethora of situations and needs and applying that knowledge to create
          and deploy a website from the ground up, and I take pride in my work
          and creations and especially the creation that you are currently
          perusing.
        </p>
        <h2>What Drives Me</h2>
        <p>
          I am fueled by a passion for progress and development, especially as
          that passion pushes us closer to the creation of true virtual reality
          gaming. Whether it's Sports, music, technology, medicine, art, or
          helping the less fortunate, I believe in equality and equity, and I
          strive to make a positive impact in both my professional and personal
          spheres.
        </p>
        <h2>Let's Connect!!</h2>
        <p>
          I am always open to connecting with like-minded professionals,
          enthusiasts, and anyone passionate about Software Engineering or
          Medicine. Feel free to reach out to me on:
          <ul>
            <li>
              LinkedIn:{" "}
              <a href="https://www.linkedin.com/in/roderick-j-995394bb/">
                Roderick Johnson
              </a>
            </li>
            <li>
              GitHub: <a href="https://github.com/rrod11">Roderick Johnson</a>
            </li>
          </ul>
        </p>
        <div className="return-home-button">
          <h1>ALL DONE READING?</h1>
          <button onClick={goBack}>CLICK ME!!</button>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
