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
        <Grid item xs={3}>
            <Card sx={{ border: 0}}>
                <CardMedia
                    component="img"
                    height="auto"
                    image={product.image}
                    alt="green iguana"
                />

                <CardContent sx={{ pt: 2 }}>
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

                <CardActions sx={{ pb: 2}}>
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