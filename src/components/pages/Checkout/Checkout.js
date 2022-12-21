import { Button, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { postOrders } from '../../../Redux/actions';
import Footer from '../../shared/Footer';

const Checkout = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { total, cart } = state;
    const dispatch = useDispatch();
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
    })
    const shipping = 100;
    const subtotal = parseFloat(shipping) + parseFloat(total);

    const placeOrder = () => {
        dispatch(postOrders(shippingDetails))
        navigate(`/orderComplete`, { state: { shippingDetails } })
    }
    return (
        <div>
            <Grid container sx={{ mt: 4, px: 6 }}>
                <Grid xs={6} md={8} sx={{ py: 6, px: 4 }}>
                    <Typography sx={{ pb: 4 }} variant='h5'>Shipping Details</Typography>
                    <Typography variant='body2'>Your Name</Typography>
                    <TextField sx={{ width: '100%' }}
                        hiddenLabel
                        id="filled-hidden-label-small"
                        size="small"
                        required
                        onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                    />
                    <Grid container columnSpacing={{ md: 0 }} sx={{ py: 2 }} >
                        <Grid xs={6} md={6} sx={{ pr: 2 }}>
                            <Typography variant='body2'>Email</Typography>
                            <TextField sx={{ width: '100%' }}
                                hiddenLabel
                                required
                                type="email"
                                id="filled-hidden-label-small"
                                size="small"
                                onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                            />
                        </Grid>
                        <Grid xs={6} md={6} sx={{ pl: 2 }} >
                            <Typography variant='body2'>Phone Number</Typography>
                            <TextField sx={{ width: '100%' }}
                                hiddenLabel
                                required
                                type="Number"
                                id="filled-hidden-label-small"
                                size="small"
                                onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant='body2'>Shipping Address</Typography>
                    <TextField sx={{ width: '100%' }}
                        // hiddenLabel
                        id="filled-hidden-label-small"
                        multiline
                        required
                        rows={2}
                        placeholder='House Number and street no'
                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    />
                    <Typography sx={{ pt: 2 }} variant='body2'>Order notes (if any)</Typography>
                    <TextField sx={{ width: '100%' }}
                        id="filled-multiline-static"
                        multiline
                        rows={4}
                        placeholder='Notes about your order, e.g. special notes for delivery'
                        onChange={(e) => setShippingDetails({ ...shippingDetails, notes: e.target.value })}
                    />
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
                        <Button variant="outlined" sx={{ mt: 2, width: '100%' }}
                            onClick={placeOrder}>
                            Place Order
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
            <Footer></Footer>
        </div >
    );
};

export default Checkout;