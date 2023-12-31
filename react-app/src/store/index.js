import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import reviewReducer from "./reviewReducer";
import likeReducer from "./likes";
import dislikeReducer from "./dislikes";
import categoryReducer from "./categoryReducer";
import postcategoriesReducer from "./postCategoryReducer";
import threadReducer from "./threadReducer";
import threadlikeReducer from "./threadlikesReducer";
import replyReducer from "./replyReducer";

const rootReducer = combineReducers({
  session,
  user: userReducer,
  post: postReducer,
  review: reviewReducer,
  like: likeReducer,
  dislike: dislikeReducer,
  category: categoryReducer,
  postcategory: postcategoriesReducer,
  thread: threadReducer,
  threadlike: threadlikeReducer,
  reply: replyReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
