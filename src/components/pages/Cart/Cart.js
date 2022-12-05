import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.allProducts.cart);
    // console.log(cart);
    const handleCheckout = () => {
        navigate('/checckout');
    }

    return (
        <div>
            <Box sx={{
                position: 'relative',
                pb: 10,
                mb: 10
            }}>
                {
                    cart.length !== 0 ?
                        <div>
                            {
                                cart.map(c =>
                                    <CartItem key={c._id}
                                        cartItem={c}></CartItem>
                                )
                            }
                        </div>

                        : <p> Loading... </p>

                }
                <Button variant='contained'
                    sx={{
                        border: '1px solid ',
                        width: '15%',
                        position: 'absolute',
                        right: 275,
                        mt: 4,
                        bottom: '0px'
                    }}
                    onClick={handleCheckout}>
                    Proceed to Checkout
                </Button>
            </Box>

        </div>

    );
};

export default Cart;