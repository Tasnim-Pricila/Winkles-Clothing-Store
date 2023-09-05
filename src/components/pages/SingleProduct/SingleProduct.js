import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import RelatedProducts from "./RelatedProducts";
import Reviews from "./Reviews";
import { toast } from "react-toastify";
import {
  AddToCart,
  AddToWishlist,
  decreaseQty,
  increaseQty,
} from "../../../utils/commonFunction";
import {
  addToCart,
  fetchProduct,
  fetchProducts,
  removeSelectedProduct,
  searchByFilter,
} from "../../../Redux/actions/productActions";
import { getMe } from "../../../Redux/actions/userActions";
import { fetchReviewbyProductId } from "../../../Redux/actions/reviewActions";
import ProductDetails from "./ProductDetails";
import "./carousel.min.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [avgRating, setAvgRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useSelector((state) => state.allUsers);
  const {
    allProducts: products,
    products: categoryWiseProducts,
    product,
    loading,
  } = useSelector((state) => state.allProducts);
  let { quantity } = product;
  const getCart = user?.cart?.product?.find((cart) => cart._id === id);
  const reviews = useSelector((state) => state.reviews.review);
  const { qty } = getCart ? getCart : {};

  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchReviewbyProductId(id));
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    const url = `/products?category=${product?.category}`;
    dispatch(searchByFilter(url));
  }, [dispatch, product?.category]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let newCart = user?.cart?.product;
  const handleAddToCart = (id) => {
    AddToCart(user, id, products, newCart, dispatch, navigate);
  };

  let wishlist = user?.wishlist?.product;
  const handleWishlist = (id) => {
    AddToWishlist(user, id, wishlist, dispatch, navigate);
  };

  const increase = async () => {
    const selectedProduct = products?.find((p) => p._id === id);
    const exists = newCart?.find((c) => c._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.qty = 1;
      newCart = [...newCart, selectedProduct];
      const cartData = { cart: { product: newCart } };
      await dispatch(addToCart(user._id, cartData));
      toast.success("Product added to cart", {
        theme: "colored",
      });
    } else {
      increaseQty(dispatch, qty, product, quantity);
    }
    await dispatch(getMe());
  };

  const decrease = () => {
    decreaseQty(dispatch, qty, product);
  };

  let allImg = [];
  const mainImg = [product?.image];
  const galleryImg = product?.imageGallery?.filter((image) => image);

  if (mainImg && galleryImg) {
    allImg = [...mainImg, ...galleryImg];
  }

  const handleDetails = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    let sum = 0;
    reviews?.length > 0 && reviews?.forEach((r) => (sum = sum + r.rating));
    setAvgRating(sum / reviews?.length);
  }, [avgRating, reviews]);

  const discount = (+product.price * +product.discount) / 100;
  const discountedPrice = parseFloat(+product.price - discount).toFixed(0);

  if (loading || userLoading) {
    return <Loading />;
  }

  return (
    <>
      {product?.length !== 0 ? (
        <>
          <ProductDetails
            product={product}
            allImg={allImg}
            avgRating={avgRating}
            reviews={reviews}
            discountedPrice={discountedPrice}
            qty={qty}
            increase={increase}
            decrease={decrease}
            handleWishlist={handleWishlist}
            handleAddToCart={handleAddToCart}
          />
          <RelatedProducts
            categoryWiseProducts={categoryWiseProducts}
            handleWishlist={handleWishlist}
            handleAddToCart={handleAddToCart}
            handleDetails={handleDetails}
          />
          <Reviews reviews={reviews} id={id} user={user} />
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};

export default SingleProduct;
