import { FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListView = ({ product, handleAddToCart, handleWishlist }) => {
    
    const navigate = useNavigate();
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
        }
    }

    const details = {
        padding: '5px 14px',
        borderRadius: 0,
        border: 1,
        borderColor: '#4b38b3',
        fontWeight: 600,
        color: '#4b38b3',
        '&:hover': {
            backgroundColor: '#4b38b3',
            color: 'white',
        }
    }

    return (
        <Grid container columnSpacing={{ md: 4 }} pb={4}>
            <Grid item md={4} >
                <img src={product?.image} alt="" width='100%' height='100%' style={{ objectFit: 'cover', cursor: 'pointer' }} 
                onClick={() => navigate(`/product/${product._id}`)} />
            </Grid>
            <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'black', cursor: 'pointer' }} 
                onClick={() => navigate(`/product/${product._id}`)}>
                    {product.title}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF8E78' }}>
                    Tk. {product.price}
                </Typography>

                <Typography variant="body2" sx={{ py: 2, fontWeight: 'bold', color: 'gray', textTransform: 'capitalize' }}>
                    Brand: {product.brand}
                </Typography>

                <Typography variant="body2" gutterBottom sx={{
                    textAlign: 'justify',
                    marginBottom: '4px', display: 'inline-block', fontSize: '14px', paddingBottom: '10px'
                }}>
                    {product.description.length > 220 ? product.description.slice(0, 220) + '.........' : product.description}
                </Typography>
                <Box sx={{ display: 'flex', my: 2, gap: '10px' }}>
                    <Button size="small" sx={details} startIcon={<FavoriteBorder />}
                        onClick={() => handleWishlist(product._id)}
                        >
                        Add To Wishlist
                    </Button>
                    <Button size="small" sx={cart}
                        onClick={() => handleAddToCart(product._id)} startIcon={<ShoppingCart />}>
                        Add To Cart</Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ListView;