import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import "./RelatedProducts.css";
import { searchByFilter } from "../../../Redux/actions/productActions";

const RelatedProducts = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryWiseProducts = useSelector(
    (state) => state.allProducts.products
  );

  useEffect(() => {
    const url = `/products?category=${product?.category}`;
    dispatch(searchByFilter(url));
  }, [dispatch, product?.category]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow:
      categoryWiseProducts?.result?.length === 1
        ? 1
        : categoryWiseProducts?.result?.length > 4
        ? 4
        : categoryWiseProducts?.result?.length,
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
    <Box py={6} mb={8} sx={{ mx: { md: 16, xs: 4 } }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          py: 10,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "bold",
        }}
      >
        Related Products
      </Typography>

      <Slider {...settings}>
        {categoryWiseProducts?.result?.length > 0 ? (
          categoryWiseProducts?.result?.map((product, i) => (
            <Box className="slick-list" key={product._id}>
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
              <Box sx={{ pt: 2, px: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  onClick={() => navigate(`/product/${product._id}`)}
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    mb: 0,
                    cursor: "pointer",
                  }}
                >
                  {product.title.length > 20
                    ? `${product.title.slice(0, 20)}...`
                    : product.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  Tk. {product.price}
                </Typography>
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

export default RelatedProducts;
