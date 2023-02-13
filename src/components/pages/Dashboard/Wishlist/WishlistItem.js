import styled from '@emotion/styled';
import { Cancel, ShoppingCart } from '@mui/icons-material';
import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, fetchProducts, getMe } from '../../../../Redux/actions';

const WishlistItem = ({ wishlistItem }) => {
    const { _id, title, price, quantity, image } = wishlistItem;
    const dispatch = useDispatch();
    const user = useSelector(state => state.allUsers.user)
    const wishlist = user?.wishlist?.product;
    const products = useSelector(state => state.allProducts.allProducts)
    // console.log(products)
    useEffect(() => {
      dispatch(fetchProducts())
    }, [dispatch])
    
    const handleRemove = (id) => {
        dispatch(getMe())
        const newWishlist = wishlist?.filter(w => w._id !== id)
        const wishlistData = {
            wishlist: {
                product: newWishlist
            },
        }
        // console.log(wishlistData)
        dispatch(addToWishlist(user?._id, wishlistData));
        dispatch(getMe())
    }

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '80px',
        maxHeight: '80px',
        padding: '10px 0px'
    })
    const cart = {
        backgroundColor: '#FF8E78',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
        border: 0,
        '&:hover': {
            backgroundColor: '#df6750',
            color: 'white',
            border: 0
        },
        minWidth: '140px'
    }
    
    let newCart = user?.cart?.product;
    const handleAddToCart = (id) => {
        dispatch(getMe())
        const selectedProduct = products?.find(p => p._id === id)
        const exists = newCart?.find(c => c._id === selectedProduct._id)
        if (!exists) {
            selectedProduct.qty = 1;
            newCart = [...newCart, selectedProduct];
        }
        else {
            exists.qty = exists.qty + 1;
            const rest = newCart.filter(c => c._id !== exists._id)
            newCart = [...rest, exists];
        }
        const cartData = {
            cart: {
                product: newCart
            },
        }
        dispatch(addToCart(user._id, cartData, id));
        dispatch(getMe())
    }

    return (
        <TableRow sx={{ p: 0 }}>
            <TableCell align="center" sx={{ p: 0 }}>
                <Img alt="complex" src={image} />
            </TableCell>
            <TableCell align="center" sx={{ textTransform: 'capitalize', p: 0 }}>
                {title}
            </TableCell>
            <TableCell align="center" sx={{ p: 0 }}>{quantity}</TableCell>
            <TableCell align="center" sx={{ p: 0 }}>{price}</TableCell>
            <TableCell align="center" sx={{ p: 0 }}>
                <Button onClick={() => handleRemove(_id)}><Cancel /></Button>
            </TableCell>
            <TableCell align="center" sx={{ p: 0 }}>
                <Button size="small" sx={cart}
                    onClick={() => handleAddToCart(_id)} 
                    startIcon={<ShoppingCart />}>
                    Add To Cart</Button>
            </TableCell>

        </TableRow>
    );
};

export default WishlistItem;