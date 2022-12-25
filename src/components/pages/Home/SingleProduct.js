import React, { useEffect, useState } from 'react';
import { addToCart, adjustQty, fetchProduct, fetchProducts, removeFromCart, removeSelectedProduct } from '../../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Divider, TextField } from '@mui/material';
import { CheckCircle, ShoppingCart } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const state = useSelector(state => state.allProducts);
    let product = state.product;
    const getCart = state.cart.find(cart => cart._id === id);

    const quantity = product?.quantity;
    const qty = getCart?.qty;
    // console.log(qty);

    const [purchaseQuantity, setQty] = useState(qty);

    const increase = () => {
        dispatch(addToCart(id));
        setQty(parseInt(purchaseQuantity) + 1);
        const q = quantity - 1;
        if (purchaseQuantity === q) {
            console.log('no') //toast
        }
        dispatch(adjustQty(id, purchaseQuantity + 1))
    }
    const decrease = () => {
        setQty(parseInt(purchaseQuantity) - 1);
        console.log(purchaseQuantity)
        if (purchaseQuantity === 1) {
            dispatch(removeFromCart(id))
        }
        dispatch(adjustQty(id, purchaseQuantity - 1))
    }
    console.log(qty);

    useEffect(() => {
        dispatch(fetchProduct(id))
        return () => {
            dispatch(removeSelectedProduct())
        }
    }, [id, dispatch])

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        if (qty === undefined) {
            setQty(0);
        }
    }, [qty, setQty, purchaseQuantity])

    const handleAddToCart = (id) => {
        dispatch(addToCart(id));
    }

    const Img = styled('img')({
        width: '100%',
    });

    const stock = {
        backgroundColor: 'green',
        color: 'white',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,

    }
    const cart = {
        backgroundColor: 'green',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
    }

    return (
        <div>
            {
                product ?
                    <Grid container direction="row" columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{ px: 16, mt: 10 }}>
                        <Grid item xs={4} >
                            <Img alt="complex" src={product.image} />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography gutterBottom variant="h4" sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'black' }}>
                                {product.title}
                            </Typography>
                            <Divider />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Typography variant="h5" sx={{ py: 2, fontWeight: 'bold' }}>
                                    Tk. {product.price}
                                </Typography>
                                <Typography variant="subtitle2" sx={stock}
                                >
                                    <CheckCircle fontSize='small' sx={{ pr: 1 }} />
                                    {product.stock}
                                </Typography>
                            </Box>
                            <Divider />

                            <Typography variant="body2" sx={{ py: 2, fontWeight: 'bold', color: 'gray' }}>
                                Brand: {product.brand}
                            </Typography>
                            <Divider />

                            <Typography variant="body2" gutterBottom sx={{
                                textAlign: 'justify',
                                my: 2
                            }}>
                                <b style={{ marginBottom: '4px', display: 'inline-block', fontSize: '16px', paddingBottom: '10px' }}>Description:</b> <br /> {product.description}
                            </Typography>

                            <Divider />

                            <Box mt={3} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Typography fontWeight='bold'> Qty: </Typography>
                                <Button disabled={purchaseQuantity === quantity} onClick={increase} variant='outlined' sx={{ border: '2px solid' }}>
                                    <AddIcon />
                                </Button>
                                    <TextField
                                        label = { purchaseQuantity }
                                        onChange={(e) => setQty(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            readOnly: true,
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*'
                                        }}
                                        disabled
                                        sx={{
                                            textAlign: 'center', width: '60px',
                                            '.css-1pysi21-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled': {
                                                color: "black",
                                            }
                                        }}
                                    />

                                <Button onClick={decrease} sx={{ border: '2px solid' }}
                                    variant='outlined' disabled={purchaseQuantity === 0}>
                                    <RemoveIcon />
                                </Button>

                                <Button size="small" variant="outlined"
                                    sx={cart}
                                    onClick={() => handleAddToCart(product._id)}
                                    startIcon={<ShoppingCart />} >
                                    Add To Cart
                                </Button>
                            </Box>



                        </Grid>
                    </Grid>
                    : <p>Loading...</p>
            }

        </div>
    );
};

export default SingleProduct;