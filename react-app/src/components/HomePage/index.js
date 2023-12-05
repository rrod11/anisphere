import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/postReducer";

import "./HomePage.css";

const ProductPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allPosts = useSelector((state) => state.post);
  //   const postArr = Object.values(allPosts);
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("user", user);
  // console.log("products state", products);
  // console.log("favorite", favorite)
  // console.log("local storage fav", storedFavorite)
  // console.log("user wish", userWish);

  useEffect(() => {
    dispatch(getAllPosts()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  const handleClick = (e, prod) => {
    e.preventDefault();
    if (cart[prod.id]) {
      dispatch(updateQuantity(prod.id, "inc", 1));
    } else if (prod.unit_available > 0) {
      dispatch(addItemToCart(prod.id));
      window.alert("Added to Cart");
    }
  };

  return isLoaded ? (
    <div id="posts-page">
      <h1>All Anime</h1>
      {/* <div className="posts-main-contianer">
        {prodArr.map((product) => (
          <div key={product.id} className="products-card">
            <a key={product.id} href={`/products/${product.id}`}>
              <div>
                <img
                  className="products-img"
                  src={product.preview}
                  alt={`Product #${product.id} - ${product.name}`}
                />

                <div className="products-detail">
                  <div>{product.name}</div>
                  <span id="price">
                    {"  "}${product.price}
                    {"  "}
                  </span>
                </div>
                <span>By {product.seller}</span>
              </div>
            </a>

            <div style={{ margin: 20 }} className="prod-btns-container">
              {user && user.id != product.seller_id && (
                <div id="prod-page-btn-container">
                  {/* {(userWish.products && userWish.products[product.id] == undefined) && ( */}
      {/* <div
                    className="add-wish-btn"
                    onClick={(e) => addToWish(e, product)}
                  >
                    {user &&
                    userWish.products &&
                    userWish.products[product.id] ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </div> */}
      {/* // )} */}
      {/* <button
                    value={product.id}
                    disabled={!product.units_available}
                    onClick={(e) => handleClick(e, product)}
                    className="add-to-cart-btn"
                  >
                    Add to cart
                  </button>
                </div> */}
      {/* )}
            </div>
          </div>
        ))} */}
      {/* </div> */} */}
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default ProductPage;
