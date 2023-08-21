import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Divider, Rating, TextField } from "@mui/material";
import { CheckCircle, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Carousel } from "react-responsive-carousel";
import "./carousel.min.css";
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
import { cart, instock, outstock, wishlistBtn } from "../../../utils/design";
import {
  addToCart,
  fetchProduct,
  fetchProducts,
  removeSelectedProduct,
} from "../../../Redux/actions/productActions";
import { getMe } from "../../../Redux/actions/userActions";
import { fetchReviewbyProductId } from "../../../Redux/actions/reviewActions";

const SingleProduct = () => {
  const { id } = useParams();
  const [avgRating, setAvgRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.allUsers.user);
  const state = useSelector((state) => state.allProducts);
  const products = state.allProducts;
  let product = state.product;
  let { quantity } = product;
  const getCart = user?.cart?.product?.find((cart) => cart._id === id);
  const reviews = useSelector((state) => state.reviews.review);
  const { qty } = getCart ? getCart : {};

  useEffect(() => {
    dispatch(fetchReviewbyProductId(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchProduct(id));
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  let newCart = user?.cart?.product;
  const handleAddToCart = (id) => {
    AddToCart(user, id, products, newCart, dispatch, navigate);
  };

  const increase = async () => {
    const selectedProduct = products?.find((p) => p._id === id);
    const exists = newCart?.find((c) => c._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.qty = 1;
      newCart = [...newCart, selectedProduct];
      const cartData = {
        cart: {
          product: newCart,
        },
      };
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

  let wishlist = user?.wishlist?.product;
  const handleWishlist = (id) => {
    AddToWishlist(user, id, wishlist, dispatch, navigate);
  };

  useEffect(() => {
    let sum = 0;
    reviews?.length > 0 && reviews?.forEach((r) => (sum = sum + r.rating));
    setAvgRating(sum / reviews?.length);
  }, [avgRating, reviews]);

  const discount = (+product.price * +product.discount) / 100;
  const discountedPrice = parseFloat(+product.price - discount).toFixed(0);
  console.log(qty, quantity);
  return (
    <>
      {product?.length !== 0 ? (
        <>
          <Grid
            container
            direction="row"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ px: { md: 16, xs: 4 }, mt: 10 }}
          >
            <Grid item xs={12} md={4}>
              <Carousel>
                {allImg &&
                  allImg.map((image, i) => {
                    return (
                      <img
                        src={image}
                        alt={image}
                        key={i}
                        style={{
                          objectFit: "fill",
                        }}
                      />
                    );
                  })}
              </Carousel>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                gutterBottom
                variant="h4"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  color: "black",
                  mt: 2,
                }}
              >
                {product.title}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Rating
                  name="read-only"
                  size="medium"
                  value={avgRating}
                  precision={0.5}
                  readOnly
                />
                <span
                  style={{
                    fontSize: "14px",
                    display: "inline-block",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  ({reviews.length} Ratings){" "}
                </span>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {product?.discount ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        py: 2,
                        fontWeight: "bold",
                        textDecoration: "line-through",
                        color: "gray",
                      }}
                    >
                      Tk. {product.price}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        py: 2,
                        fontWeight: "bold",
                        color: "#df6750",
                      }}
                    >
                      Tk. {discountedPrice}
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                      py: 2,
                      fontWeight: "bold",
                      color: "#df6750",
                    }}
                  >
                    Tk. {product.price}
                  </Typography>
                )}
                <Typography
                  variant="subtitle2"
                  sx={product?.stock === "In Stock" ? instock : outstock}
                >
                  {product?.stock === "In Stock" && (
                    <CheckCircle fontSize="small" sx={{ pr: 1 }} />
                  )}

                  {product.stock}
                </Typography>
              </Box>
              <Divider />

              <Typography
                variant="body2"
                sx={{
                  py: 2,
                  fontWeight: "bold",
                  color: "gray",
                  textTransform: "capitalize",
                }}
              >
                Brand: {product.brand}
              </Typography>
              <Divider />
              <Typography
                sx={{
                  mt: 1,
                  display: "inline-block",
                  fontWeight: 600,
                }}
              >
                Description:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  textAlign: "justify",
                }}
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></Typography>
              <Divider />

              <Box
                mt={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Typography fontWeight="bold"> Qty: </Typography>
                <Button
                  disabled={qty === quantity}
                  onClick={increase}
                  variant="outlined"
                  sx={{ border: "2px solid" }}
                >
                  <AddIcon />
                </Button>
                <TextField
                  label={qty === undefined ? 0 : qty}
                  size="small"
                  InputProps={{
                    readOnly: true,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  disabled
                  sx={{
                    textAlign: "center",
                    width: "60px",
                    ".css-1pysi21-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                      {
                        color: "black",
                      },
                  }}
                />
                <Button
                  onClick={decrease}
                  sx={{ border: "2px solid" }}
                  variant="outlined"
                  disabled={qty === undefined}
                >
                  <RemoveIcon />
                </Button>
                <Button
                  size="small"
                  sx={wishlistBtn}
                  startIcon={<FavoriteBorder />}
                  onClick={() => handleWishlist(product._id)}
                >
                  Add To Wishlist
                </Button>
                <Button
                  size="small"
                  sx={cart}
                  onClick={() => handleAddToCart(product._id)}
                  startIcon={<ShoppingCart />}
                >
                  Add To Cart
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              ></Box>
            </Grid>
          </Grid>
          <RelatedProducts product={product} />
          <Reviews reviews={reviews} id={id} user={user} />
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};

export default SingleProduct;
