// eslint-disable-next-line
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import Loading from "../Loading/Loading";
import { cart, wishlistBtn } from "../../../utils/design";
import { useLocation } from "react-router-dom";

const Product = ({
  product,
  handleAddToCart,
  handleWishlist,
  handleDetails,
}) => {
  const location = useLocation();
  const { loading: userLoading } = useSelector((state) => state.allUsers);
  const loading = useSelector((state) => state.allProducts.loading);
  const [avgRating, setAvgRating] = useState(0);

  const discount = (+product.price * +product.discount) / 100;
  const discountedPrice = parseFloat(+product.price - discount).toFixed(0);

  useEffect(() => {
    let sum = 0;
    product?.reviews?.forEach((r) => (sum = sum + r.rating));
    setAvgRating(sum / product.reviews?.length);
  }, [avgRating, product.reviews]);

  if (loading || userLoading) {
    return <Loading />;
  }

  return (
    <Grid item xs={12} sm={6} lg={location?.pathname === "/shop" ? 4 : 3}>
      <Card sx={{ border: 0 }}>
        <CardMedia
          onClick={() => handleDetails(product._id)}
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
            onClick={() => handleDetails(product._id)}
            sx={{
              textAlign: "center",
              textTransform: "capitalize",
              cursor: "pointer",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {product.title}
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
