import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/postReducer";

import "./HomePage.css";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allPosts = useSelector((state) => state.post);
  console.log("🚀 ~ file: index.js:13 ~ HomePage ~ allPosts:", allPosts);
  const postArr = Object.values(allPosts);
  console.log("🚀 ~ file: index.js:15 ~ HomePage ~ postArr:", postArr);
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("user", user);
  // console.log("products state", products);
  // console.log("favorite", favorite)
  // console.log("local storage fav", storedFavorite)
  // console.log("user wish", userWish);

  useEffect(() => {
    dispatch(getAllPosts(sessionUser)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return isLoaded ? (
    <div id="posts-page">
      <h1>All Anime</h1>
    </div>
  ) : null;
};

export default HomePage;
