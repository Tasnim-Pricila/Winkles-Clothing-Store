import { toast } from "react-toastify";
import { getMe } from "../Redux/actions/userActions";
import {
  addToCart,
  addToWishlist,
  adjustQty,
} from "../Redux/actions/productActions";

export const AddToCart = async (
  user,
  id,
  products,
  newCart,
  dispatch,
  navigate
) => {
  if (user?.length !== 0) {
    const selectedProduct = products?.find((p) => p._id === id);
    const exists = newCart?.find((c) => c._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.qty = 1;
      newCart = [...newCart, selectedProduct];
      const cartData = { cart: { product: newCart } };
      await dispatch(addToCart(user._id, cartData));
      await dispatch(getMe());
      toast.success("Product added to your cart ", {
        theme: "colored",
      });
    } else {
      exists.qty = exists.qty + 1;
      if (exists.qty > exists.quantity) {
        exists.qty = exists.quantity;
        toast.warning("Stock is empty.", {
          theme: "colored",
        });
      } else {
        const rest = newCart.filter((c) => c._id !== exists._id);
        newCart = [...rest, exists];
        const cartData = { cart: { product: newCart } };
        await dispatch(addToCart(user._id, cartData));
        await dispatch(getMe());
        toast.success("Product added to your cart ", {
          theme: "colored",
        });
        if (exists.qty === exists.quantity) {
          toast.warning("Stock is empty now. Can not add this item anymore.", {
            theme: "colored",
          });
        }
      }
    }
  } else {
    navigate("/login");
  }
};

export const AddToWishlist = async (user, id, wishlist, dispatch, navigate) => {
  if (user?.length !== 0) {
    const exists = wishlist?.find((w) => w._id === id);
    if (!exists) {
      wishlist = [...wishlist, id];
      const wishlistData = {
        wishlist: {
          product: wishlist,
        },
      };
      await dispatch(addToWishlist(user._id, wishlistData));
      await dispatch(getMe());
      toast.success("Product added to your wishlist ", {
        theme: "colored",
      });
    } else {
      toast.warning("Already in your Wishlist ", {
        theme: "colored",
      });
    }
  } else {
    navigate("/login");
  }
};

export const increaseQty = async (dispatch, qty, product, quantity) => {
  const cartData = {
    ...product,
    qty: qty + 1,
  };
  await dispatch(adjustQty(product._id, cartData));
  await dispatch(getMe());
  toast.success("Quantity Increased", {
    theme: "colored",
  });
  if (qty + 1 === quantity) {
    toast.warning("Stock is empty now. Can not add this item anymore.", {
      theme: "colored",
    });
  } else {
  }
};

export const decreaseQty = async (dispatch, qty, product) => {
  if (qty === 1) {
    const cartData = {
      ...product,
      qty: qty - 1,
    };
    await dispatch(adjustQty(product._id, cartData));
    dispatch(getMe());
    toast.success("Product removed from the cart", {
      theme: "colored",
    });
  } else {
    const cartData = {
      ...product,
      qty: qty - 1,
    };
    await dispatch(adjustQty(product._id, cartData));
    dispatch(getMe());
    toast.success("Quantity decreased", {
      theme: "colored",
    });
  }
};

export const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
