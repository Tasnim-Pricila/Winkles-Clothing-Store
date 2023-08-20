import { Cancel, ShoppingCart } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, fetchProducts, getMe } from "../../../Redux/actions";
import { Img, cart } from "../../../utils/design";
import { AddToCart } from "../../../utils/commonFunction";
import { useNavigate } from "react-router-dom";

const WishlistItem = ({ wishlistItem }) => {
  const navigate = useNavigate();
  const { _id, title, price, quantity, image } = wishlistItem;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allUsers.user);
  const wishlist = user?.wishlist?.product;
  const products = useSelector((state) => state.allProducts.allProducts);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(getMe());
    const newWishlist = wishlist?.filter((w) => w._id !== id);
    const wishlistData = {
      wishlist: {
        product: newWishlist,
      },
    };
    dispatch(addToWishlist(user?._id, wishlistData));
    dispatch(getMe());
  };

  let newCart = user?.cart?.product;
  const handleAddToCart = (id) => {
    AddToCart(user, id, products, newCart, dispatch, navigate);
  };

  return (
    <TableRow sx={{ p: 0 }}>
      <TableCell align="center" sx={{ p: 0 }}>
        <Img alt="complex" src={image} />
      </TableCell>
      <TableCell align="center" sx={{ textTransform: "capitalize", p: 0 }}>
        {title}
      </TableCell>
      <TableCell align="center" sx={{ p: 0 }}>
        {quantity}
      </TableCell>
      <TableCell align="center" sx={{ p: 0 }}>
        {price}
      </TableCell>
      <TableCell align="center" sx={{ p: 0 }}>
        <Button onClick={() => handleRemove(_id)}>
          <Cancel />
        </Button>
      </TableCell>
      <TableCell align="center" sx={{ p: 0 }}>
        <Button
          size="small"
          sx={cart}
          onClick={() => handleAddToCart(_id)}
          startIcon={<ShoppingCart />}
        >
          Add To Cart
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default WishlistItem;
