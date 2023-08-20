// eslint-disable-next-line
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import Loading from "../Loading/Loading";
import { AddToCart, AddToWishlist } from "../../../utils/commonFunction";
import { cart, wishlistBtn } from "../../../utils/design";
import { getMe } from "../../../Redux/actions/userActions";

const Product = ({ product, products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allUsers.user);
  const loading = useSelector((state) => state.allProducts.loading);
  const [avgRating, setAvgRating] = useState(0);

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

  const discount = (+product.price * +product.discount) / 100;
  const discountedPrice = parseFloat(+product.price - discount).toFixed(0);

  useEffect(() => {
    let sum = 0;
    product?.reviews?.forEach((r) => (sum = sum + r.rating));
    setAvgRating(sum / product.reviews?.length);
  }, [avgRating, product.reviews]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Card sx={{ border: 0 }}>
        <CardMedia
          onClick={() => navigate(`/product/${product._id}`)}
          sx={{
            backgroundImage: `url(${product?.image})`,
            backgroundSize: "cover",
            height: "50vh",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            cursor: "pointer",
          }}
        />
        <CardContent sx={{ pt: 2 }}>
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
          <Rating
            name="read-only"
            size="medium"
            value={avgRating}
            precision={0.5}
            readOnly
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          />
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
                Tk. {discountedPrice}
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
        </CardContent>

        <CardActions
          sx={{ pb: 2, display: "flex", justifyContent: "space-around" }}
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
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
