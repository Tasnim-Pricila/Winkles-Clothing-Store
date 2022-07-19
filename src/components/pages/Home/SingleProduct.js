import React, { useEffect, useState } from 'react';
import { addToCart, adjustQty, fetchProduct, removeFromCart, removeSelectedProduct } from '../../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';

const SingleProduct = () => {
    const { id } = useParams()
    const product = useSelector(state => state.singleProduct.product);
    const cart = useSelector(state => state.allProducts.cart);
    // console.log(cart)
    const dispatch = useDispatch();
    // const [quantity, setQty] = useState(0);

    useEffect(() => {
        dispatch(fetchProduct(id))
        return () => {
            dispatch(removeSelectedProduct())
        }
    }, [])

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    }

    // const handleQty = (e) => {
    //     let input = parseInt(e.target.value);
    //     setQty(input);
    //     dispatch(adjustQty(product[0]?._id, input));
    // }
    const handleAddToCart = (id) => {
        dispatch(addToCart(id));
    }


    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <div>
            {
                product ?
                    <Paper
                        sx={{
                            p: 4,
                            margin: 'auto',
                            mt: 10,
                            maxWidth: 900,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={6}>
                            <Grid item>
                                <ButtonBase sx={{ width: 200, height: 200 }}>
                                    <Img alt="complex" src={product[0]?.image} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product[0]?.title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom sx={{
                                            textAlign: 'justify',
                                            mt: 2
                                        }}>
                                            {product[0]?.description}
                                        </Typography>
                                        {/* <input type="number" value={quantity} onChange=
                                            {handleQty}
                                        /> */}
                                        <Typography variant="body2" color="text.secondary">
                                            ID: {product[0]?._id}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="outlined" 
                                        sx={{
                                            mx: 'auto',
                                            mr: 2
                                        }} 
                                        onClick={() => handleAddToCart(product[0]?._id)}>
                                            Add To Cart</Button>

                                        <Button size="small" variant="contained"
                                            onClick={() => handleRemove(product[0]?._id)}
                                            sx={{
                                                mx: 'auto'
                                            }}>
                                            Remove
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" component="div">
                                        ${product[0]?.price}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    : <p>Loading...</p>
            }

        </div>
    );
};

export default SingleProduct;