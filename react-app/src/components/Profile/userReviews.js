import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../../store/otherUsers";

export default function UserReviews({ user }) {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.allUsers);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const userId = user.id;
    // dispatch(getAllUsers())
    //   .then(() => {
    //     let revArr = [];
    //     Object.values(products).map((product) => {
    //       Object.values(product.reviews).map((prodRev) => {
    //         revArr.push(prodRev);
    //       });
    //     });
    //     setReviews(revArr);
    //   })
    //   .then(() => setIsLoaded(true));
    console.log(products);
  }, [dispatch]);

  return (
    <div>
      {isLoaded && (
        <>
          {reviews.length > 0 ? (
            <div className="userReviewsContainer">
              {reviews.map((review) => (
                <div key={review.id} className="indvUserReviews">
                  <div>
                    <h4>{products[review.product_id].name}</h4>
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
          )}
          {/* {Object.values(reviews).length > 0 ? (
            <div className="userReviewsContainer">
              {Object.values(reviews).map((review) => (

              ))}
            </div>
          ) : (
            // {Object.values{products}.map(product => (
            //   {Object.values{products.reviews}}
            // ))}
            <h3>You have no reviews</h3>
          )} */}
        </>
      )}
    </div>
  );
}
