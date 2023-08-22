import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "../../shared/Footer";
import Loading from "../Loading/Loading";
import Payment from "./Payment";
import { getMe } from "../../../Redux/actions/userActions";
import { postOrders } from "../../../Redux/actions/orderActions";
import { addToCart } from "../../../Redux/actions/productActions";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allUsers.user);
  const createdOrder = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.allProducts.loading);
  const cart = user?.cart?.product;

  const stripePromise = loadStripe(
    "pk_test_51L2D2EKZuhtVgyM7S2CeyD5YrpaY7x1Ab3pNWv4hqTyRbvblNQ2KZhgUz71r0JbCZCytaYDey0oYNYlZ1t3QNseW00ZewuwFk9"
  );

  const shipping = 100;
  const [total, setTotal] = useState("");
  const [shippingDetails, setShippingDetails] = useState({
    phone: "",
    address: "",
    notes: "",
    products: "",
    amount: total,
    paymentMethod: "",
    paymentStatus: "",
    deliveryStatus: "Pending",
    orderStatus: "Pending",
  });

  const [error, setError] = useState({
    phone: "",
    address: "",
    paymentMethod: "",
  });

  useEffect(() => {
    let total = 0;

    cart?.forEach((item) => {
      if (item?.discount) {
        const discount = (+item.price * +item.discount) / 100;
        const discountedPrice = parseFloat(+item.price - discount).toFixed(0);
        total = parseFloat(total) + discountedPrice * +item.qty;
        total = total.toFixed(0);
      } else {
        total = parseFloat(total) + parseFloat(item.price) * +item.qty;
        total = total.toFixed(0);
      }
    });
    setTotal(total);
    setShippingDetails({
      ...shippingDetails,
      amount: parseFloat(total) + parseFloat(shipping),
      products: cart,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, total]);

  const subtotal = parseFloat(shipping) + parseFloat(total);

  if (loading) {
    return <Loading></Loading>;
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    const userInfo = {
      name: user?.firstName + " " + user?.lastName,
      email: user?.email,
    };
    if (shippingDetails.phone === "") {
      setError({ phone: "This field is required" });
    } else if (shippingDetails.address === "") {
      setError({ address: "This field is required" });
    } else if (shippingDetails.paymentMethod === "") {
      setError({ paymentMethod: "Please select your payment method" });
    } else {
      const orderData = { ...shippingDetails, ...userInfo };
      await dispatch(postOrders(orderData));
      const cartData = {
        cart: {
          product: [],
        },
      };
      await dispatch(addToCart(user._id, cartData));
      navigate(`/orderComplete`, { state: { shippingDetails } });
      await dispatch(getMe());
    }
  };

  return (
    <>
      <Grid container sx={{ mt: 2, px: { md: 16, xs: 4 } }}>
        <Grid
          xs={12}
          lg={8}
          sx={{ py: { xs: 0, md: 6 }, order: { xs: 1, lg: 0 } }}
        >
          <Card
            variant="outlined"
            sx={{ p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)" }}
          >
            <Typography sx={{ pb: 1, fontWeight: "bold" }} variant="h5">
              Shipping Info
            </Typography>
            <Typography sx={{ pb: 1, color: "GrayText", fontSize: "14px" }}>
              {" "}
              Please fill all information below{" "}
            </Typography>
            <Divider />
            <Typography
              variant="body2"
              pb={1}
              mt={4}
              sx={{ fontWeight: "600" }}
            >
              Your Name
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              hiddenLabel
              id="filled-hidden-label-small"
              size="small"
              required
              value={user?.firstName + " " + user?.lastName}
            />
            <Grid container columnSpacing={{ md: 0 }} sx={{ py: 2 }}>
              <Grid xs={6} md={6} sx={{ pr: 2 }}>
                <Typography variant="body2" pb={1} sx={{ fontWeight: "600" }}>
                  Email
                </Typography>
                <TextField
                  sx={{ width: "100%" }}
                  hiddenLabel
                  required
                  name="email"
                  type="email"
                  id="filled-hidden-label-small"
                  size="small"
                  value={user?.email}
                />
              </Grid>
              <Grid xs={6} md={6} sx={{ pl: 2 }}>
                <Typography variant="body2" pb={1} sx={{ fontWeight: "600" }}>
                  Phone Number
                </Typography>
                <TextField
                  sx={{ width: "100%" }}
                  hiddenLabel
                  required
                  type="number"
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  helperText={error.phone}
                  error={error.phone}
                  id="filled-hidden-label-small"
                  size="small"
                  placeholder="Enter Phone Number"
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      phone: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Typography variant="body2" pb={1} sx={{ fontWeight: "600" }}>
              Shipping Address
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              // hiddenLabel
              id="filled-hidden-label-small"
              multiline
              required
              rows={2}
              error={error.address}
              helperText={error.address}
              placeholder="House Number and street no"
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  address: e.target.value,
                })
              }
            />
            <Typography
              variant="body2"
              pt={2}
              pb={1}
              sx={{ fontWeight: "600" }}
            >
              Order notes (if any)
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              id="filled-multiline-static"
              multiline
              rows={4}
              placeholder="Notes about your order, e.g. special notes for delivery"
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  notes: e.target.value,
                })
              }
            />
          </Card>
          <Card
            variant="outlined"
            sx={{ mt: 3, p: 2, boxShadow: "0 3px 3px rgba(56,65,74,0.1)" }}
          >
            <Typography sx={{ pb: 1, fontWeight: "bold" }} variant="h5">
              Payment Info
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormControl fullWidth>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Card"
                  label="Credit / Debit Card"
                  control={<Radio required />}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      paymentMethod: e.target.value,
                      paymentStatus: "Paid",
                    })
                  }
                  sx={{ mr: 20 }}
                />
                <FormControlLabel
                  value="COD"
                  label="Cash on Delivery"
                  control={<Radio required />}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      paymentMethod: e.target.value,
                      paymentStatus: "Pending",
                    })
                  }
                />
              </RadioGroup>
            </FormControl>
            <Typography sx={{ color: "#d32f2f", fontSize: "13px" }}>
              {" "}
              {error.paymentMethod}{" "}
            </Typography>
            {shippingDetails.paymentMethod === "Card" ? (
              <Box mt={4}>
                <Elements stripe={stripePromise}>
                  <Payment
                    total={total}
                    shippingDetails={shippingDetails}
                    createdOrder={createdOrder}
                    setShippingDetails={setShippingDetails}
                    error={error}
                    setError={setError}
                    cart={cart}
                  />
                </Elements>
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={placeOrder}
                  sx={{ mt: 6 }}
                  disabled={cart?.length === 0}
                >
                  Place Order
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
        <Grid xs={12} lg={4}>
          <CardContent
            sx={{
              mx: { xs: 0, lg: 2 },
              mt: { xs: 2, md: 6 },
              mb: 4,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ borderBottom: 1, pb: 1 }}
            >
              Order Summary
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Product Info
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart?.length > 0 &&
                    cart.map((c) => (
                      <TableRow key={c?._id}>
                        <TableCell>
                          <img
                            src={c.image}
                            alt=""
                            width="50px"
                            height="50px"
                            style={{ objectFit: "cover" }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ textTransform: "capitalize" }}
                          component="th"
                          scope="row"
                        >
                          <Typography fontWeight="600" fontSize="14px">
                            {c.title}
                          </Typography>
                          <Typography variant="body2">
                            Tk.{" "}
                            {c.discount
                              ? c.price - (c.discount * c.price) / 100
                              : c.price}{" "}
                            * {c.qty}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {c.discount
                            ? (c.price - (c.discount * c.price) / 100) * c.qty
                            : c.price * c.qty}
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      Subtotal
                    </TableCell>
                    <TableCell
                      align="right"
                      colSpan={2}
                      sx={{ fontWeight: "bold" }}
                    >
                      TK. {total}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "gray" }}
                    >
                      Shipping
                    </TableCell>
                    <TableCell align="right" colSpan="2" sx={{ color: "gray" }}>
                      TK. {shipping}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "#c62828", fontWeight: "bold" }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      align="right"
                      colSpan={2}
                      sx={{ color: "#c62828", fontWeight: "bold" }}
                    >
                      TK. {subtotal}{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Grid>
      </Grid>
      <Footer></Footer>
    </>
  );
};

export default Checkout;
