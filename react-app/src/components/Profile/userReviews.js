import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTheReviews } from "../../store/reviewReducer";
import { editAReview } from "../../store/reviewReducer";
import { getAllUsers } from "../../store/userReducer";

export default function UserReviews() {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const userId = user.id;
    dispatch(getAllUsers())
      //   .then(() => {
      //     let revArr = [];
      //     Object.values(post).map((product) => {
      //       Object.values(product.reviews).map((prodRev) => {
      //         revArr.push(prodRev);
      //       });
      //     });
      //     setReviews(revArr);
      //   })
      .then(() => setIsLoaded(true));
    console.log(post);
  }, [dispatch]);

  return (
    <div>
      {isLoaded && (
        <>
          REviEWS HERE
          {/* {reviews.length > 0 ? (
            <div className="userReviewsContainer">
              {reviews.map((review) => (
                <div key={review.id} className="indvUserReviews">
                  <div>
                    <h4>{post[review.product_id].name}</h4>
                    <p>{review.rating} Stars</p>
                    <p className="userProductReview">{review.review}</p>
                    <p>Author: {users[review.user_id].username}</p>
                    {!review.seller_commented &&
                      currUser &&
                      currUser.id == user.id && (
                        <button disabled>Respond</button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3>You have no reviews yet</h3>
          )} */}
          {/* {Object.values(reviews).length > 0 ? (
            <div className="userReviewsContainer">
              {Object.values(reviews).map((review) => (

              ))}
            </div>
          ) : (
            // {Object.values{post}.map(product => (
            //   {Object.values{post.reviews}}
            // ))}
            <h3>You have no reviews</h3>
          )} */}
        </>
      )}
    </div>
  );
}
