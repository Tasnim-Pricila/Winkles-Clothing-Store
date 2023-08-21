import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { AddToCart, AddToWishlist } from "../../../utils/commonFunction";
import { cart, wishlistBtn } from "../../../utils/design";
import { trendingProducts } from "../../../Redux/actions/productActions";
import { getMe } from "../../../Redux/actions/userActions";

const Trending = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allUsers.user);
  const trending = useSelector((state) => state.allProducts.trending);

  useEffect(() => {
    dispatch(trendingProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  let newCart = user?.cart?.product;
  const handleAddToCart = (id) => {
    AddToCart(user, id, products, newCart, dispatch, navigate);
  };

  let wishlist = user?.wishlist?.product;
  const handleWishlist = (id) => {
    AddToWishlist(user, id, wishlist, dispatch, navigate);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ mx: { md: 16, xs: 4 }, mb: 10 }}>
      <Typography
        sx={{
          textAlign: "center",
          pb: 10,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "bold",
          fontSize: "26px",
        }}
      >
        Trending Now
      </Typography>
      <Slider {...settings}>
        {trending?.length > 0 ? (
          trending?.map((product, i) => (
            <Box className="slick-list">
              <Box
                onClick={() => navigate(`/product/${product._id}`)}
                sx={{
                  backgroundImage: `url(${product?.image})`,
                  backgroundSize: "cover",
                  height: "60vh",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                  backgroundPosition: "center",
                }}
              />
              <Box sx={{ pt: 2 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  onClick={() => navigate(`/product/${product._id}`)}
                  sx={{
                    textAlign: "center",
                    textTransform: "capitalize",
                    cursor: "pointer",
                  }}
                >
                  {product.title.length > 20
                    ? `${product.title.slice(0, 20)}...`
                    : product.title}
                </Typography>

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
                        textAlign: "center",
                        fontWeight: "bold",
                        pt: 1,
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
                        textAlign: "center",
                        fontWeight: "bold",
                        pt: 1,
                      }}
                    >
                      Tk.{" "}
                      {+product.price -
                        (+product.price * +product.discount) / 100}
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      pt: 1,
                    }}
                  >
                    Tk. {product.price}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  py: 2,
                  display: "flex",
                  justifyContent: "space-around",
                  gap: 1,
                }}
              >
                <Button
                  size="small"
                  onClick={() => handleWishlist(product._id)}
                  sx={wishlistBtn}
                  startIcon={<FavoriteBorder />}
                >
                  Add To Wishlist
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={cart}
                  onClick={() => handleAddToCart(product._id)}
                  startIcon={<ShoppingCart />}
                >
                  Add To Cart
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Loading />
        )}
      </Slider>
    </Box>
  );
};

export default Trending;