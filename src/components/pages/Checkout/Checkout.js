import { Button, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useUsers from '../../../Custom Hook/useUsers';
import { getMe, postOrders } from '../../../Redux/actions';
import Footer from '../../shared/Footer';
import Payment from './Payment';

const Checkout = () => {
    const [user] = useUsers();
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useDispatch();
    const { total, cart } = state;

    const createdOrder = useSelector(state => state.orders.orders)

    const stripePromise = loadStripe('pk_test_51L2D2EKZuhtVgyM7S2CeyD5YrpaY7x1Ab3pNWv4hqTyRbvblNQ2KZhgUz71r0JbCZCytaYDey0oYNYlZ1t3QNseW00ZewuwFk9');

    const [shippingDetails, setShippingDetails] = useState({
        phone: '',
        address: '',
        notes: '',
        products: cart,
        amount: total,
        paymentMethod: '',
        paymentStatus: '',
        deliveryStatus: 'Pending',
        orderStatus: 'Pending'
    })
    // console.log(user);

    const shipping = 100;
    const subtotal = parseFloat(shipping) + parseFloat(total);

    const placeOrder = (e) => {
        e.preventDefault();
        const userInfo = {
            name: user?.firstName + ' ' + user?.lastName,
            email: user?.email
        }
        const orderData = { ...shippingDetails, ...userInfo}
        // console.log(orderData);
        dispatch(postOrders(orderData))
        // navigate(`/orderComplete`, { state: { shippingDetails } })
        navigate(`/dashboard`)
    }

    return (
        // <form onSubmit={placeOrder}>
        <>
            <Grid container sx={{ mt: 2, px: 6 }}>
                <Grid xs={6} md={8} sx={{ py: 6, px: 4 }}>
                    <Typography sx={{ pb: 4 }} variant='h5'>Shipping Details</Typography>
                    <Typography variant='body1' pb={1}>Your Name</Typography>
                    <TextField sx={{ width: '100%' }}
                        hiddenLabel
                        id="filled-hidden-label-small"
                        size="small"
                        required
                        value={user?.firstName + ' ' + user?.lastName}
                    />
                    <Grid container columnSpacing={{ md: 0 }} sx={{ py: 4 }} >
                        <Grid xs={6} md={6} sx={{ pr: 2 }}>
                            <Typography variant='body1' pb={1}>Email</Typography>
                            <TextField sx={{ width: '100%' }}
                                hiddenLabel
                                required
                                name="email"
                                type="email"
                                id="filled-hidden-label-small"
                                size="small"
                                value={user?.email}
                            />
                        </Grid>
                        <Grid xs={6} md={6} sx={{ pl: 2 }} >
                            <Typography variant='body1' pb={1}>Phone Number</Typography>
                            <TextField sx={{ width: '100%' }}
                                hiddenLabel
                                required
                                type='number'
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*'
                                }}
                                id="filled-hidden-label-small"
                                size="small"
                                onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant='body1' pb={1}>Shipping Address</Typography>
                    <TextField sx={{ width: '100%' }}
                        // hiddenLabel
                        id="filled-hidden-label-small"
                        multiline
                        required
                        rows={2}
                        placeholder='House Number and street no'
                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    />
                    <Typography sx={{ pt: 4 }} variant='body1' pb={1}>Order notes (if any)</Typography>
                    <TextField sx={{ width: '100%' }}
                        id="filled-multiline-static"
                        multiline
                        rows={4}
                        placeholder='Notes about your order, e.g. special notes for delivery'
                        onChange={(e) => setShippingDetails({ ...shippingDetails, notes: e.target.value })}
                    />
                    <Typography sx={{ pt: 4 }} variant='body1' pb={1}> Payment Method </Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Card" label="Card" control={<Radio required />} onChange={(e) => setShippingDetails({ ...shippingDetails, paymentMethod: e.target.value, paymentStatus: 'Paid' })} />
                            <FormControlLabel value="COD" label="Cash on Delivery" control={<Radio required />} onChange={(e) => setShippingDetails({ ...shippingDetails, paymentMethod: e.target.value, paymentStatus: 'Pending' })} />
                        </RadioGroup>
                    </FormControl>
                    {
                        shippingDetails.paymentMethod === "Card" ?
                            <Box mt={4}>
                                <Elements stripe={stripePromise}>
                                    <Payment total={total} shippingDetails={shippingDetails} createdOrder={createdOrder} setShippingDetails={setShippingDetails} />
                                </Elements>
                            </Box>
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="submit" variant='contained' onClick={placeOrder} sx={{ mt: 6 }}>
                                    Place Order
                                </Button>
                            </Box>
                    }

                </Grid>
                <Grid xs={6} md={4} >
                    <CardContent sx={{ mx: 2, my: 8, borderRadius: 2, boxShadow: 2 }}>
                        <Typography variant='h6' gutterBottom sx={{ borderBottom: 1, pb: 1 }}>
                            Your Order
                        </Typography>
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Quantity</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart.map(c =>
                                            <TableRow>
                                                <TableCell sx={{ textTransform: 'capitalize' }} component="th" scope="row">
                                                    {c.title}
                                                </TableCell>
                                                <TableCell align="center">{c.qty}</TableCell>
                                                <TableCell align="right">{c.price}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                    <TableRow >
                                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                            Subtotal
                                        </TableCell>
                                        <TableCell align="right" colspan='2' sx={{ fontWeight: 'bold' }}>
                                            TK. {total}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell component="th" scope="row" sx={{ color: 'gray' }}>
                                            Shipping
                                        </TableCell>
                                        <TableCell align="right" colspan='2' sx={{ color: 'gray' }}>
                                            TK. {shipping}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell component="th" scope="row"
                                            sx={{ color: '#c62828', fontWeight: 'bold' }} >
                                            Total
                                        </TableCell>
                                        <TableCell align="right" colspan='2' sx={{ color: '#c62828', fontWeight: 'bold' }}>TK. {subtotal} </TableCell>
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