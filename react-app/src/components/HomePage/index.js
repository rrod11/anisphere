import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/postReducer";

import "./HomePage.css";

const HomePage = ({ posts }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const recieved = posts;
  console.log("🚀 ~ file: index.js:12 ~ HomePage ~ recieved:", recieved);
  const sessionUser = useSelector((state) => state.session.user);
  const allPosts = useSelector((state) => state.post.posts);
  console.log("🚀 ~ file: index.js:13 ~ HomePage ~ allPosts:", allPosts);
  // let postArr;
  // if (Object.keys(allPosts).length >= 1) {
  //   postArr = Object.values(allPosts);
  // }
  // const postArrLength = Object.values(allPosts).length;
  const postArr = Object.values(allPosts);
  console.log("🚀 ~ file: index.js:15 ~ HomePage ~ postArr:", postArr.length);
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("user", user);
  // console.log("products state", products);
  // console.log("favorite", favorite)
  // console.log("local storage fav", storedFavorite)
  // console.log("user wish", userWish);

  useEffect(() => {
    dispatch(getAllPosts(sessionUser))
      .then(() => {
        setIsLoaded(true);
      })
      .then(() => history.push("/home"));
  }, [dispatch, isLoaded]);

  if (isLoaded && postArr.length >= 1) {
    return (
      <div id="post-page">
        <h1 className="progress">
          ProGress
          <progress id="completion" max="100" volume="5">
            5%
          </progress>
        </h1>
        <div className="wrapper">
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <h3>
            <span className="dot"></span>
          </h3>
          <div className="scroll-bg">
            <div className="scroll-div">
              <div className="scroll-object">
                This is the beginning of the best anime site to ever exist. I
                want you all to be patient with me as i work to figure out the
                ins and outs of coding. I plan to have a multifacted website
                that brings the best parts of all anime out there. I want to
                have a grading scale for anime as well as suggested communities
                to find other like minded individuals such as yourself with
                similar interests and tastes in the anime cuisine. My algorithm
                should be able to match you to anime that you will most likely
                enjoy or at the very least be able to watch for mild
                entertainment without wanting to rip your hair, eyeballs, or ear
                lobes out/off. I hope that this site is able to give you
                everything that you are looking for out of the site as well as
                introduce you to some newer things that you may never have
                thought that youd see on a website meant for just us dweebs!!..
              </div>
            </div>
          </div>
          <div className="item-selector">
            {postArr?.map((ele) => (
              <a key={ele.id} href={`/posts/${ele.id}`}>
                <div
                  className={`item ${ele.id}`}
                  key={ele.id}
                  style={{
                    color: "white",
                    backgroundImage: `url(${ele.image})`,
                    backgroundSize: "cover",
                  }}
                >
                  {ele.title}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="post-page">
      <h1 className="progress">
        ProGress
        <progress id="completion" max="100" volume="5">
          5%
        </progress>
      </h1>
      <div className="wrapper">
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <h3>
          <span className="dot"></span>
        </h3>
        <div className="scroll-bg">
          <div className="scroll-div">
            <div className="scroll-object">
              This is the beginning of the best anime site to ever exist. I want
              you all to be patient with me as i work to figure out the ins and
              outs of coding. I plan to have a multifacted website that brings
              the best parts of all anime out there. I want to have a grading
              scale for anime as well as suggested communities to find other
              like minded individuals such as yourself with similar interests
              and tastes in the anime cuisine. My algorithm should be able to
              match you to anime that you will most likely enjoy or at the very
              least be able to watch for mild entertainment without wanting to
              rip your hair, eyeballs, or ear lobes out/off. I hope that this
              site is able to give you everything that you are looking for out
              of the site as well as introduce you to some newer things that you
              may never have thought that youd see on a website meant for just
              us dweebs!!..
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
