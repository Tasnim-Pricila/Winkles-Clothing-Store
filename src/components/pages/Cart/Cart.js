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
    const user = useSelector(state => state.allUsers.user)
    const cart = user?.cart?.product

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        cart?.forEach(item => {
            total = parseFloat(total) + parseFloat(item.price) * parseFloat(item.qty);
            total = total.toFixed(2);
        })
        setTotal(total);
    }, [cart, total])

    const handleCheckout = () => {
        navigate('/checkout', { state: { total } });
    }
    const handleContinue = () => {
        navigate('/shop');
    }
    const continueButton = {
        color: 'white',
        backgroundColor: '#FF8E78',
        marginRight: '20px',
        borderRadius: 0,
        '&:hover': {
            color: 'white',
            backgroundColor: '#df6750',
        },
        mt: { xs: 2, md: 0}
    }
    const checkout = {
        color: 'white',
        backgroundColor: '#4b38b3',
        marginRight: '20px',
        borderRadius: 0,
        '&:hover': {
            color: 'white',
            backgroundColor: '#4b38b3',
        },
        mt: { xs: 2, md: 0}
    }

    return (
        <>
            <Box sx={{
                position: 'relative',
                pb: 10,
                mb: 10,
                px:{ md: 16 , xs: 4 }
            }}>
                {
                    cart?.length !== 0 ?
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
                                        cart?.map(c =>
                                            <CartItem key={c._id}
                                                cartItem={c}
                                            ></CartItem>
                                        )
                                    }
                                    <TableRow>
                                        <TableCell colSpan={5} align='center' 
                                        sx={{  fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            Total
                                        </TableCell>
                                        <TableCell colSpan={0} align='center' sx={{ fontWeight: 'bold' }}>
                                            Tk. {total}
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <Typography variant='h4' sx={{ textAlign: 'center', mt: 4 }}> Nothing In Cart </Typography>

                }
                {
                    cart?.length === 0 ||
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'right', flexWrap: 'wrap' }}>
                        <Button variant='contained' sx={continueButton} onClick={handleContinue} startIcon={<Loop />}>
                            Continue Shopping
                        </Button>
                        <Button variant='contained' sx={checkout} onClick={handleCheckout} startIcon={<Done />}>
                            Proceed to Checkout
                        </Button>
                    </div>
                }
            </Box>
            <Footer></Footer>
        </>
    );
};

export default Cart;