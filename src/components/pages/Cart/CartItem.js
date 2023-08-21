import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { decreaseQty } from "../../../utils/commonFunction";
import { toast } from "react-toastify";
import { Img } from "../../../utils/design";
import { getMe } from "../../../Redux/actions/userActions";
import { addToCart, adjustQty } from "../../../Redux/actions/productActions";

const CartItem = ({ cartItem }) => {
  const { _id, title, price, qty, quantity, image, discount } = cartItem;
  // console.log(cartItem);
  const dispatch = useDispatch();
  const [purchaseQuantity, setQty] = useState(qty);
  const user = useSelector((state) => state.allUsers.user);
  const cart = user?.cart?.product;

  const discountAmount = discount && (+price * +discount) / 100;
  const discountedPrice =
    discount && parseFloat(+price - discountAmount).toFixed(0);

  const handleRemove = (id) => {
    dispatch(getMe());
    const newCart = cart?.filter((c) => c._id !== id);
    const cartData = {
      cart: {
        product: newCart,
      },
    };
    dispatch(addToCart(user?._id, cartData));
    dispatch(getMe());
  };

  const increase = async () => {
    setQty(qty + 1);
    const cartData = {
      ...cartItem,
      qty: qty + 1,
    };
    await dispatch(adjustQty(_id, cartData));
    await dispatch(getMe());
    toast.success("Quantity Increased", {
      theme: "colored",
    });
    if (qty + 1 === quantity) {
      toast.warning("Stock is empty now. Can not add this item anymore.", {
        theme: "colored",
      });
    }
   
  };
  // const increase = async () => {
  //   setQty(parseInt(purchaseQuantity) + 1);
  //   const cartData = {
  //     ...cartItem,
  //     qty: purchaseQuantity + 1,
  //   };
  //   await dispatch(adjustQty(cartItem._id, _id, purchaseQuantity + 1, cartData));
  //   await dispatch(getMe());
  //   toast.success("Increased", {
  //     theme: "colored",
  //   });
  //   const q = quantity - 1;
  //   console.log(purchaseQuantity, quantity);
  //   if (purchaseQuantity === q) {
  //     toast.warning("Stock is empty now. Can not add this item anymore.", {
  //       theme: "colored",
  //     });
  //   }
   
  // };
  // console.log(cartItem);
  // console.log(purchaseQuantity);

  const decrease = () => {
    // decreaseQty(dispatch, setQty, purchaseQuantity, _id, cartItem)
    decreaseQty(dispatch, setQty, qty, _id, cartItem)
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

      {/* Quantity  */}
      <TableCell align="center" sx={{ p: 0 }}>
        <IconButton
          disabled={purchaseQuantity === quantity}
          onClick={increase}
          sx={{ color: "#4b38b3" }}
        >
          <AddIcon />
        </IconButton>
        <input
          type="number"
          // value={purchaseQuantity}
          value={qty}
          readOnly
          style={{ width: "40px", textAlign: "center", height: "25px" }}
          onChange={(e) => setQty(e.target.value)}
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
