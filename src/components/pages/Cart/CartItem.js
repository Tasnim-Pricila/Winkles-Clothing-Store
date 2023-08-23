import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { decreaseQty, increaseQty } from "../../../utils/commonFunction";
import { Img } from "../../../utils/design";
import { getMe } from "../../../Redux/actions/userActions";
import { addToCart } from "../../../Redux/actions/productActions";
import { toast } from "react-toastify";

const CartItem = ({ cartItem }) => {
  const { _id, title, price, qty, quantity, image, discount } = cartItem;
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.allUsers);
  const cart = user?.cart?.product;

  const discountAmount = discount && (+price * +discount) / 100;
  const discountedPrice =
    discount && parseFloat(+price - discountAmount).toFixed(0);

  const handleRemove = async (id) => {
    const newCart = cart?.filter((c) => c._id !== id);
    const cartData = {
      cart: {
        product: newCart,
      },
    };
    await dispatch(addToCart(user?._id, cartData));
    await dispatch(getMe());
    toast.success("Product Removed from Cart", {
      theme: "colored",
    });
  };

  const increase = async () => {
    increaseQty(dispatch, qty, cartItem, quantity)
  };

  const decrease = () => {
    decreaseQty(dispatch, qty, cartItem);
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
        <IconButton
          disabled={qty === quantity}
          onClick={increase}
          sx={{ color: "#4b38b3" }}
        >
          <AddIcon />
        </IconButton>
        <input
          type="number"
          value={qty}
          readOnly
          style={{ width: "40px", textAlign: "center", height: "25px" }}
        />
        <IconButton onClick={decrease} sx={{ color: "#4b38b3" }}>
          <RemoveIcon />
        </IconButton>
      </TableCell>

      <TableCell align="center" sx={{ p: 0 }}>
        {discount ? discountedPrice : price}
      </TableCell>
      <TableCell align="center" sx={{ p: 0 }}>
        {discount ? qty * discountedPrice : qty * price}
      </TableCell>
      <TableCell align="center" sx={{ p: 0 }}>
        <Button onClick={() => handleRemove(_id)}>
          <Cancel />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
