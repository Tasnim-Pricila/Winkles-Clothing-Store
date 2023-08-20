import { toast } from "react-toastify";
import { addToCart, addToWishlist, adjustQty, getMe, removeFromCart } from "../Redux/actions";

export const AddToCart = (user, id, products, newCart, dispatch, navigate) => {
  if (user?.length !== 0) {
    dispatch(getMe());
    const selectedProduct = products?.find((p) => p._id === id);
    const exists = newCart?.find((c) => c._id === selectedProduct._id);

    if (!exists) {
      selectedProduct.qty = 1;
      newCart = [...newCart, selectedProduct];
      toast.success("Product added to your cart ", {
        theme: "colored",
      });
    } else {
      exists.qty = exists.qty + 1;
      const rest = newCart.filter((c) => c._id !== exists._id);
      newCart = [...rest, exists];
      toast.success("Product added to your cart ", {
        theme: "colored",
      });
    }

    const cartData = {
      cart: {
        product: newCart,
      },
    };

    dispatch(addToCart(user._id, cartData, id));
    dispatch(getMe());
  } else {
    navigate("/login");
  }
};

export const AddToWishlist = (user, id, wishlist, dispatch, navigate) => {
  if (user?.length !== 0) {
    dispatch(getMe());
    const exists = wishlist?.find((w) => w._id === id);

    if (!exists) {
      wishlist = [...wishlist, id];
      toast.success("Product added to your wishlist ", {
        theme: "colored",
      });
    } else {
      toast.warning("Already in your Wishlist ", {
        theme: "colored",
      });
    }

    const wishlistData = {
      wishlist: {
        product: wishlist,
      },
    };

    dispatch(addToWishlist(user._id, wishlistData));
    dispatch(getMe());
  } else {
    navigate("/login");
  }
};

export const decreaseQty = (dispatch, setQty, purchaseQuantity, id, product) => {
  dispatch(getMe());
  setQty(parseInt(purchaseQuantity) - 1);
  if (purchaseQuantity === 1) {
    dispatch(removeFromCart(id));
  }
  const cartData = {
    ...product,
    qty: purchaseQuantity - 1,
  };
  dispatch(adjustQty(product._id, id, purchaseQuantity - 1, cartData));
  dispatch(getMe());
};
