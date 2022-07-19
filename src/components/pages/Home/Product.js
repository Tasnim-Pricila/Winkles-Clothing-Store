import React, { useEffect } from 'react';
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

const Product = ({ product }) => {
   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDetails = (id) => {
        navigate(`/product/${id}`);
    }
    const handleAddToCart = (id) => {
        dispatch(addToCart(id));
    }

    return (
        <Grid item xs={4}>
            <Card sx={{
                p: 2
            }}>
                <CardMedia
                    component="img"
                    // height="140"
                    image={product.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description.slice(0, 150)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" onClick={() => handleDetails(product._id)}
                    sx={{
                        mx: 'auto'
                    }}>
                        Details
                    </Button>
                    <Button size="small" variant="outlined" sx={{
                        mx: 'auto'
                    }} onClick={() => handleAddToCart(product._id)}>
                        Add To Cart</Button>
                </CardActions>
            </Card>
           
        </Grid>

    );
};

export default Product;