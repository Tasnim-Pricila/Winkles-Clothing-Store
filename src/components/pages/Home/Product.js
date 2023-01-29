// eslint-disable-next-line
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, getMe } from '../../../Redux/actions';
import { FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Product = ({ product, products }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.allUsers.user)

    useEffect(() => {
        dispatch(getMe());
    },[dispatch])

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

    let wishlist = user?.wishlist?.product;
    // console.log(wishlist)
    const handleWishlist = (id) => {
        dispatch(getMe())
        const exists = wishlist?.find(w => w._id === id)
        // console.log(exists)
        if (!exists) {
            wishlist = [...wishlist, id];
        }
        else {
            toast.warning('Already in your Wishlist ', {
                theme: 'colored',
            });
        }
        const wishlistData = {
            wishlist: {
                product: wishlist
            },
        }
        dispatch(addToWishlist(user._id, wishlistData));
        dispatch(getMe())
    }

    const cart = {
        backgroundColor: '#FF8E78',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
        border: 0,
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#df6750',
            color: 'white',
            border: 0
        }
    }
    const details = {
        padding: '5px 14px',
        borderRadius: 0,
        border: 1,
        borderColor: '#4b38b3',
        fontWeight: 600,
        textTransform: 'capitalize',
        color: '#4b38b3',
        '&:hover': {
            backgroundColor: '#4b38b3',
            color: 'white',
        }
    }

    return (
        <Grid item xs={3}>
            <Card sx={{ border: 0 }}>
                <CardMedia onClick={() => navigate(`/product/${product._id}`)}
                    sx={{
                        backgroundImage: `url(${product?.image})`,
                        backgroundSize: 'cover',
                        height: '50vh',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top',
                        cursor: 'pointer'
                    }}
                />
                <CardContent sx={{ pt: 2 }}>
                    <Typography gutterBottom variant="h6" 
                    onClick={() => navigate(`/product/${product._id}`)} 
                    sx={{ textAlign: 'center', textTransform: 'capitalize', cursor: 'pointer' }}>
                        {
                           
                                product.title.length > 20 ? `${product.title.slice(0, 20)}...`
                                : product.title
                        }
                    </Typography>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Tk. {product.price}
                    </Typography>
                </CardContent>

                <CardActions sx={{ pb: 2, display: 'flex', justifyContent: 'space-around' }}>
                    <Button size="small" 
                    onClick={() => handleWishlist(product._id)}
                        sx={details} startIcon={<FavoriteBorder/>} >
                        Add To Wishlist
                    </Button>
                    <Button size="small" variant="outlined" sx={cart} onClick={() => handleAddToCart(product._id)} startIcon={<ShoppingCart/>}>
                       Add To Cart</Button>
                </CardActions>
            </Card>

        </Grid>

    );
};

export default Product;