import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PostForm from "./components/PostForm";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { getAllPosts } from "./store/postReducer";
import AnimePage from "./components/AnimePage";
import EditPostForm from "./components/EditPostForm";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(authenticate())
      .then(() => dispatch(getAllPosts(sessionUser)))
      .then(() => setIsLoaded(true));
  }, [dispatch]);
  const goBack = () => {
    history.go(-1);
  };
  return (
    <>
      {location.pathname === "/" ? null : <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/home">
            <HomePage posts={posts} />
          </Route>
          <Route path="/newpost">
            <PostForm />
          </Route>
          <Route path="/posts/:postId/edit">
            <EditPostForm />
          </Route>
          <Route exact path="/posts/:postId">
            <AnimePage posts={posts} />
          </Route>
          <Route>
            <h1>Page Not Found</h1>
            <button onClick={goBack}>Go Back</button>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
