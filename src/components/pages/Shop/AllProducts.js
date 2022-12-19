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
        backgroundColor: 'green',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
        border: 0,
    }
    const details = {
        padding: '5px 10px',
        borderRadius: 0,
    }

    return (
        <Grid item xs={4} md={4} >
             <Card>
                <CardMedia
                    component="img"
                    height="auto"
                    image={product.image}
                    alt="green iguana"
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
                    <Button size="small" variant="contained" sx={details}
                    onClick={() => handleDetails(product._id)}>
                        Details
                    </Button>
                    <Button size="small" variant="outlined"  sx={cart}
                    onClick={() => handleAddToCart(product._id)} startIcon={<ShoppingCart/>}>
                        Add To Cart</Button>
                </CardActions>
            </Card>

        </Grid>

    );
};

export default AllProducts;