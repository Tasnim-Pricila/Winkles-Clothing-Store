import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { cart, wishlistBtn } from "../../../utils/design";

const ListView = ({ product, handleAddToCart, handleWishlist }) => {
  const navigate = useNavigate();
  const [avgRating, setAvgRating] = useState(0);
  const loading = useSelector((state) => state.allProducts.loading);

  useEffect(() => {
    let sum = 0;
    product?.reviews?.forEach((r) => (sum = sum + r.rating));
    setAvgRating(sum / product.reviews?.length);
    // console.log(avgRating)
  }, [avgRating, product.reviews]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Grid container columnSpacing={{ xs: 2, md: 4 }} pb={4}>
      <Grid item xs={4}>
        <img
          src={product?.image}
          alt=""
          width="100%"
          height="100%"
          style={{ objectFit: "cover", cursor: "pointer" }}
          onClick={() => navigate(`/product/${product._id}`)}
        />
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          gutterBottom
          variant="h5"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.title}
        </Typography>
        <Rating
          name="read-only"
          size="medium"
          value={avgRating}
          precision={0.5}
          readOnly
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#FF8E78", pt: 1 }}
        >
          Tk. {product.price}
        </Typography>

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

        <Typography
          variant="body2"
          gutterBottom
          sx={{
            textAlign: "justify",
            marginBottom: "4px",
            display: "inline-block",
            fontSize: "14px",
            paddingBottom: "10px",
          }}
          dangerouslySetInnerHTML={{
            __html:
              product.description.length > 220
                ? product.description.slice(0, 220) + "........."
                : product.description,
          }}
        ></Typography>
        <Box sx={{ display: "flex", my: 2, gap: "10px" }}>
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
      </Grid>
    </Grid>
  );
};

export default ListView;
