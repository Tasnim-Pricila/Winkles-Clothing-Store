import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { FavoriteBorder, ShoppingCart } from '@mui/icons-material';


const AllProducts = ({ product, handleAddToCart, handleWishlist }) => {

    const navigate = useNavigate();
    const cart = {
        backgroundColor: '#FF8E78',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
        textTransform: 'capitalize',
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
        textTransform: 'capitalize',
        color: '#4b38b3',
        '&:hover': {
            backgroundColor: '#4b38b3',
            color: 'white',
        }
    }

    return (
        <Grid item xs={12} sm={6} lg={4} >
            <Card>
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
                <CardContent sx={{ pt: 2, px: 1 }}>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: 'center', textTransform: 'capitalize', cursor: 'pointer' }} 
                    onClick={() => navigate(`/product/${product._id}`)}>
                        {
                            product.title.length > 15 ? `${product.title.slice(0, 15)}...`
                                : product.title
                        }
                    </Typography>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Tk. {product.price}
                    </Typography>
                </CardContent>

                <CardActions sx={{ pb: 2 }} style={{ display: 'flex', justifyContent: 'space-around' }}>

                    <Button size="small" sx={details} startIcon={<FavoriteBorder/>}
                        onClick={() => handleWishlist(product._id)}>
                        Add To Wishlist
                    </Button>
                    <Button size="small" sx={cart}
                        onClick={() => handleAddToCart(product._id)} 
                        startIcon={<ShoppingCart />}>
                        Add To Cart</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default AllProducts;