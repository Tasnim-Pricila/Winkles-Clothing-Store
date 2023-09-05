import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../shared/Footer";
import Article from "./Article";
import Banner from "./Banner";
import Brand from "./Brand";
import Categories from "./Categories";
import Delivery from "./Delivery";
import Products from "./Products";
import Trending from "./Trending";
import {
  fetchProducts,
  setCategory,
  trendingProducts,
} from "../../../Redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import {
  AddToCart,
  AddToWishlist,
  goToTop,
} from "../../../utils/commonFunction";
import { useCallback } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts: products, trending } = useSelector(
    (state) => state.allProducts
  );
  const { user } = useSelector((state) => state.allUsers);

  const handleCollections = useCallback(
    (value) => {
      dispatch(setCategory(value));
      navigate("/shop");
      goToTop();
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(trendingProducts());
  }, [dispatch]);

  let newCart = user?.cart?.product;
  const handleAddToCart = useCallback(
    (id) => {
      AddToCart(user, id, products, newCart, dispatch, navigate);
    },
    [user, products, newCart, dispatch, navigate]
  );

  let wishlist = user?.wishlist?.product;
  const handleWishlist = useCallback(
    (id) => {
      AddToWishlist(user, id, wishlist, dispatch, navigate);
    },
    [user, wishlist, dispatch, navigate]
  );

  const handleDetails = useCallback(
    (id) => {
      navigate(`/product/${id}`);
    },
    [navigate]
  );

  return (
    <>
      <Banner></Banner>
      <Categories handleCollections={handleCollections}></Categories>
      <Products products={products} handleWishlist={handleWishlist}
        handleAddToCart={handleAddToCart} handleDetails={handleDetails}/>
      <Trending
        trending={trending}
        handleWishlist={handleWishlist}
        handleAddToCart={handleAddToCart}
        handleDetails={handleDetails}
      />
      <Delivery></Delivery>
      <Article></Article>
      <Brand></Brand>
      <Footer />
    </>
  );
};

export default Home;
