import React from "react";
import { Box, Typography } from "@mui/material";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import ProductSlider from "../../../UI/ProductSlider";

const Trending = ({
  handleAddToCart,
  handleWishlist,
  trending,
  handleDetails
}) => {
  const userLoading = useSelector((state) => state.allUsers.loading);
  const productLoading = useSelector((state) => state.allProducts.loading);

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
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
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

  if (userLoading || productLoading) {
    return <Loading />;
  }

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
      {trending.length > 0 ? (
        <Slider {...settings}>
          {trending?.map((product) => (
            <ProductSlider
              key={product._id}
              product={product}
              handleWishlist={handleWishlist}
              handleAddToCart={handleAddToCart}
              handleDetails={handleDetails}
            />
          ))}
        </Slider>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default React.memo(Trending);
