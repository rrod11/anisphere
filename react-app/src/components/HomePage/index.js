import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/postReducer";

import "./HomePage.css";

const HomePage = ({ posts }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  // const allPosts = useSelector((state) => state.post.posts);
  const postArr = Object.values(posts);

  const [filteredData, setFilteredData] = useState(postArr);
  const [search, setSearch] = useState("");

  const filterFunc = (e) => {
    const searchWord = e.target.value;
    setSearch(searchWord);
    const newFilter = postArr.filter((value) => {
      console.log("🚀 ~ file: index.js:23 ~ newFilter ~ value:", value);
      if (
        value.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.categories.find(
          (ele) => ele.name.toLowerCase() == searchWord.toLowerCase()
        )
      ) {
        return value;
      }
    });
    if (searchWord === "") {
      setFilteredData(postArr);
    } else {
      setFilteredData(newFilter);
    }
  };

  useEffect(() => {
    dispatch(getAllPosts())
      .then(() => {
        setIsLoaded(true);
      })
      .then(() => history.push("/home"));
  }, [dispatch, isLoaded]);

  if (isLoaded && postArr.length >= 1) {
    return (
      <div id="post-page" style={{ zIndex: "-1" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            height: "30px",
          }}
        >
          <i
            className="fa fa-search"
            style={{
              position: "absolute",
              top: " 215px",
              left: "50px",
              fontSize: "20px",
            }}
          ></i>
          <input
            style={{ padding: "0 30px", borderRadius: "15px" }}
            type="text"
            placeholder={"Search Our Products..."}
            className="form-input"
            value={search}
            onChange={filterFunc}
          />
        </div>
        <div className="wrapper">
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>
          <h3 className="h3">
            <p className="dot"></p>
          </h3>

          <h1 className="fancy">ALL ANIME</h1>
          <div className="item-selector">
            {filteredData?.map((ele) => (
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
                  <div className="item-overlay">
                    <div className="item-title">{ele.title}</div>
                  </div>
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
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
        </h3>
        <h3 className="h3">
          <p className="dot"></p>
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
