import { Cancel, ShoppingCart } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Img, cart } from "../../../utils/design";
import { AddToCart } from "../../../utils/commonFunction";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  fetchProducts,
} from "../../../Redux/actions/productActions";
import { getMe } from "../../../Redux/actions/userActions";
import { toast } from "react-toastify";

const WishlistItem = ({ wishlistItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id, title, price, quantity, image } = wishlistItem;
  const { user } = useSelector((state) => state.allUsers);
  const wishlist = user?.wishlist?.product;
  const products = useSelector((state) => state.allProducts.allProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRemove = async (id) => {
    const newWishlist = wishlist?.filter((w) => w._id !== id);
    const wishlistData = {
      wishlist: {
        product: newWishlist,
      },
    };
    await dispatch(addToWishlist(user?._id, wishlistData));
    await dispatch(getMe());
    toast.success("Product Removed from Cart", {
      theme: "colored",
    });
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
