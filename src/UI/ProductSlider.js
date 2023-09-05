import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { cart, wishlistBtn } from "../utils/design";

const ProductSlider = ({
  product,
  handleAddToCart,
  handleWishlist,
  handleDetails,
}) => {
  return (
    <Box className="slick-list" key={product._id}>
      <Box
        onClick={() => handleDetails(product._id)}
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

        {product?.discount ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              minHeight: "47px",
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
                fontSize: "16px",
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
                fontSize: "16px",
              }}
            >
              Tk. {+product.price - (+product.price * +product.discount) / 100}
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
  );
};

export default ProductSlider;
