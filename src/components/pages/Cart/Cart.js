import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { Done, Loop } from '@mui/icons-material';
import Footer from '../../shared/Footer';


const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.allProducts.cart);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach(item => {
            // console.log(item.qty);
            total = parseFloat(total) + parseFloat(item.price) * parseFloat(item.qty);
            total = total.toFixed(2);
        })
        setTotal(total);
    }, [cart, total])
    const handleCheckout = () => {
        navigate('/checkout', { state: { total, cart } });
    }
    const handleContinue = () => {
        navigate('/shop');
    }
    const continueButton = {
        color: 'white',
        backgroundColor: 'green',
        marginRight: '20px',
        borderRadius: 0,
        '&:hover': {
            color: 'white',
            backgroundColor: 'green',
        }
    }

    return (
        <div>
            <Box sx={{
                position: 'relative',
                pb: 10,
                mb: 10,
                px: 16
            }}>
                {
                    cart.length !== 0 ?
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Image</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">In stock</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Quantity</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Unit Price</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Total</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Remove</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart.map(c =>
                                            <CartItem key={c._id}
                                                cartItem={c}
                                            ></CartItem>
                                        )
                                    }
                                </TableBody>
                                <TableRow>
                                    <TableCell colSpan={4} align='right' sx={{ pr: 8, fontWeight: 'bold' }} >Total</TableCell>
                                    <TableCell colSpan={2} align='right'
                                        sx={{ fontWeight: 'bold' }} >Tk. {total}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                        :
                        <Typography variant='h4' sx={{ textAlign: 'center', mt: 4 }}> Nothing In Cart </Typography>

                }
                {
                    cart.length === 0 ||
                    <div style= {{ marginTop: '20px', display: 'flex', justifyContent: 'right'}}>
                        <Button variant='contained' sx={continueButton} onClick={handleContinue} startIcon={<Loop/>}> Continue Shopping </Button>
                        <Button variant='contained' onClick={handleCheckout} startIcon={<Done/>}>
                            Proceed to Checkout
                        </Button>
                    </div>
                }
            </Box>
            <Footer></Footer>
        </div>
    );
};

export default Cart;