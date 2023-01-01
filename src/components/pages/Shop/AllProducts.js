import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/actions';
import { ShoppingCart } from '@mui/icons-material';

const AllProducts = ({ product }) => {
    // console.log(product);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDetails = (id) => {
        navigate(`/product/${id}`);
    }
    const handleAddToCart = (id) => {
        dispatch(addToCart(id));
    }

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
        <Grid item xs={4} md={4} >
             <Card>
                <CardMedia
                    // component="img"
                    // height="auto"
                    // image={product.image}
                    // alt="green iguana"
                    sx={{
                        backgroundImage: `url(${product?.image})`,
                        backgroundSize: 'cover',
                        height: '40vh',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top',
                    }}
                />
                <CardContent sx={{ pt: 2, px: 0 }}>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: 'center', textTransform: 'capitalize'}}>
                        {
                            product.title.length > 24 ? `${product.title.slice(0, 24)}...`
                            : product.title
                        }
                    </Typography>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold'}}>
                        Tk. {product.price}
                    </Typography>
                </CardContent>

                <CardActions sx={{ pb: 2}} style={{ display: 'flex', justifyContent: 'space-around'}}>
                    <Button size="small" sx={details}
                    onClick={() => handleDetails(product._id)}>
                        Details
                    </Button>
                    <Button size="small" sx={cart}
                    onClick={() => handleAddToCart(product._id)} startIcon={<ShoppingCart/>}>
                        Add To Cart</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default AllProducts;