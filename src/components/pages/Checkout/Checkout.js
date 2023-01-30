import { Button, Card, CardContent, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, {  useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { addToCart, clearCart, getMe, postOrders } from '../../../Redux/actions';
import Footer from '../../shared/Footer';
import Loading from '../Loading/Loading';
import Payment from './Payment';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.allUsers.user)
    const createdOrder = useSelector(state => state.orders.orders)
    // const saveCart = useSelector(state => state.allProducts.saveCart);
    const loading = useSelector(state => state.allProducts.loading);
    const cart = user?.cart?.product

    const stripePromise = loadStripe('pk_test_51L2D2EKZuhtVgyM7S2CeyD5YrpaY7x1Ab3pNWv4hqTyRbvblNQ2KZhgUz71r0JbCZCytaYDey0oYNYlZ1t3QNseW00ZewuwFk9');
    const [total, setTotal] = useState(0);
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

    const [error, setError] = useState({
        phone: '',
        address: '',
        paymentMethod: '',
    })

    useEffect(() => {
        let total = 0;
        cart?.forEach(item => {
            total = parseFloat(total) + parseFloat(item.price) * parseFloat(item.qty);
            total = total.toFixed(2);
        })
        setTotal(total);
    }, [cart, total])

    // useEffect(() => {
    //     console.log(saveCart);
    //     if (saveCart?.acknowledged === true) {
    //         dispatch(resetSavecart())
    //         navigate(`/orderComplete`, { state: { shippingDetails } })
    //         dispatch(getMe())
    //     }
    // }, [dispatch, saveCart])

    const shipping = 100;
    const subtotal = parseFloat(shipping) + parseFloat(total);

    if (loading) {
        return <Loading></Loading>
    }

    const placeOrder = (e) => {
        dispatch(getMe())
        e.preventDefault();
        const userInfo = {
            name: user?.firstName + ' ' + user?.lastName,
            email: user?.email
        }
        if (shippingDetails.phone === '') {
            setError({ phone: 'This field is required' })
        }
        else if (shippingDetails.address === '') {
            setError({ address: 'This field is required' })
        }
        else if (shippingDetails.paymentMethod === '') {
            setError({ paymentMethod: 'Please select your payment method' })
        }
        else {
            // setLoading(true)
            const orderData = { ...shippingDetails, ...userInfo }
            dispatch(postOrders(orderData))
            dispatch(clearCart())
            const cartData = {
                cart: {
                    product: []
                },
            }
            dispatch(addToCart(user._id, cartData))
            navigate(`/orderComplete`, { state: { shippingDetails } })
            dispatch(getMe())
        }
    }

    return (
        <>
            <Grid container sx={{ mt: 2, px: 6 }}>
                <Grid xs={6} md={8} sx={{ py: 6, px: 4 }}>
                    <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                        <Typography sx={{ pb: 1, fontWeight: 'bold' }} variant='h5'>Shipping Info</Typography>
                        <Typography sx={{ pb: 1, color: 'GrayText', fontSize: '14px' }}> Please fill all information below </Typography>
                        <Divider />
                        <Typography variant='body2' pb={1} mt={4} sx={{ fontWeight: '600' }}>Your Name</Typography>
                        <TextField sx={{ width: '100%' }}
                            hiddenLabel
                            id="filled-hidden-label-small"
                            size="small"
                            required
                            value={user?.firstName + ' ' + user?.lastName}
                        />
                        <Grid container columnSpacing={{ md: 0 }} sx={{ py: 2 }} >
                            <Grid xs={6} md={6} sx={{ pr: 2 }}>
                                <Typography variant='body2' pb={1} sx={{ fontWeight: '600' }}>Email</Typography>
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
                                <Typography variant='body2' pb={1} sx={{ fontWeight: '600' }}>Phone Number</Typography>
                                <TextField sx={{ width: '100%' }}
                                    hiddenLabel
                                    required
                                    type='number'
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*'
                                    }}
                                    helperText={error.phone}
                                    error={error.phone}
                                    id="filled-hidden-label-small"
                                    size="small"
                                    placeholder='Enter Phone Number'
                                    onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant='body2' pb={1} sx={{ fontWeight: '600' }}>Shipping Address</Typography>
                        <TextField sx={{ width: '100%' }}
                            // hiddenLabel
                            id="filled-hidden-label-small"
                            multiline
                            required
                            rows={2}
                            error={error.address}
                            helperText={error.address}
                            placeholder='House Number and street no'
                            onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                        />
                        <Typography variant='body2' pt={2} pb={1} sx={{ fontWeight: '600' }}>Order notes (if any)</Typography>
                        <TextField sx={{ width: '100%' }}
                            id="filled-multiline-static"
                            multiline
                            rows={4}
                            placeholder='Notes about your order, e.g. special notes for delivery'
                            onChange={(e) => setShippingDetails({ ...shippingDetails, notes: e.target.value })}
                        />
                    </Card>
                    <Card variant="outlined" sx={{ mt: 3, p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                        <Typography sx={{ pb: 1, fontWeight: 'bold' }} variant='h5'>Payment Info</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <FormControl fullWidth >
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="Card" label="Credit / Debit Card" control={<Radio required />} onChange={(e) => setShippingDetails({ ...shippingDetails, paymentMethod: e.target.value, paymentStatus: 'Paid' })} sx={{ mr: 20 }} />
                                <FormControlLabel value="COD" label="Cash on Delivery" control={<Radio required />} onChange={(e) => setShippingDetails({ ...shippingDetails, paymentMethod: e.target.value, paymentStatus: 'Pending' })} />
                            </RadioGroup>
                        </FormControl>
                        <Typography sx={{ color: '#d32f2f', fontSize: '13px' }}> {error.paymentMethod} </Typography>
                        {
                            shippingDetails.paymentMethod === "Card" ?
                                <Box mt={4}>
                                    <Elements stripe={stripePromise}>
                                        <Payment total={total} shippingDetails={shippingDetails} createdOrder={createdOrder} setShippingDetails={setShippingDetails} error={error} setError={setError} cart={cart} />
                                    </Elements>
                                </Box>
                                :
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type="submit" variant='contained' onClick={placeOrder} sx={{ mt: 6 }} 
                                    disabled={cart?.length === 0}>
                                        Place Order
                                    </Button>
                                </Box>
                        }
                    </Card>

                </Grid>
                <Grid xs={6} md={4} >
                    <CardContent sx={{ mx: 2, my: 8, borderRadius: 2, boxShadow: 2 }}>
                        <Typography variant='h6' gutterBottom sx={{ borderBottom: 1, pb: 1 }}>
                            Order Summary
                        </Typography>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Product Info</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart?.length > 0 &&
                                        cart.map(c =>
                                            <TableRow>
                                                <TableCell>
                                                    <img src={c.image} alt="" width='50px' height='50px' style={{ objectFit: 'cover' }} />
                                                </TableCell>
                                                <TableCell sx={{ textTransform: 'capitalize' }} component="th" scope="row">
                                                    <Typography fontWeight='600' fontSize='14px'>
                                                        {c.title}
                                                    </Typography>
                                                    <Typography variant='body2'>
                                                        Tk. {c.price} * {c.qty}
                                                    </Typography>

                                                </TableCell>
                                                <TableCell align="right">{c.price * c.qty}</TableCell>
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