import { Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../../../../Redux/actions';

const CreateProduct = () => {
    const product = useSelector(state => state.orders.allOrder);
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        unit: '',
        image: '',
        category: '',
        brand: '',
        stock: '',
    })

    const addProduct = (e) => {
        e.preventDefault();
        dispatch(postProduct(productDetails))
        console.log(productDetails)
    }

    return (
        <>
            <form onSubmit={addProduct}>
                <Grid container sx={{ mt: 4, px: 6 }}>
                    <Grid xs={6} md={8} sx={{ py: 6, px: 4 }}>
                        <Typography sx={{ pb: 4 }} variant='h5'>Shipping Details</Typography>
                        <Typography variant='body2'>Your Name</Typography>
                        <TextField sx={{ width: '100%' }}
                            hiddenLabel
                            id="filled-hidden-label-small"
                            size="small"
                            required
                            onChange={(e) => setProductDetails({ ...productDetails, title: e.target.value })}
                        />
                        <Grid container columnSpacing={{ md: 0 }} sx={{ py: 2 }} >
                            <Grid xs={6} md={6} sx={{ pr: 2 }}>
                                <Typography variant='body2'>Email</Typography>
                                <TextField sx={{ width: '100%' }}
                                    hiddenLabel
                                    required
                                    id="filled-hidden-label-small"
                                    size="small"
                                    onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                                />
                            </Grid>
                            <Grid xs={6} md={6} sx={{ pl: 2 }} >
                                <Typography variant='body2'>Phone Number</Typography>
                                <TextField sx={{ width: '100%' }}
                                    hiddenLabel
                                    required
                                    type="Number"
                                    id="filled-hidden-label-small"
                                    size="small"
                                    onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant='body2'>Shipping Address</Typography>
                        <TextField sx={{ width: '100%' }}
                            // hiddenLabel
                            id="filled-hidden-label-small"
                            multiline
                            required
                            rows={2}
                            placeholder='House Number and street no'
                            onChange={(e) => setProductDetails({ ...productDetails, quantity: e.target.value })}
                        />
                        <Typography sx={{ pt: 2 }} variant='body2'>Order notes (if any)</Typography>
                        <TextField sx={{ width: '100%' }}
                            id="filled-multiline-static"
                            multiline
                            rows={4}
                            placeholder='Notes about your order, e.g. special notes for delivery'
                            onChange={(e) => setProductDetails({ ...productDetails, unit: e.target.value })}
                        />
                        <TextField sx={{ width: '100%' }}
                            hiddenLabel
                            id="filled-hidden-label-small"
                            size="small"
                            required
                            placeholder='img link'
                            onChange={(e) => setProductDetails({ ...productDetails, image: e.target.value })}
                        />
                        <TextField sx={{ width: '100%' }}
                            hiddenLabel
                            id="filled-hidden-label-small"
                            size="small"
                            required
                            placeholder='category'
                            onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
                        />
                        <TextField sx={{ width: '100%' }}
                            hiddenLabel
                            id="filled-hidden-label-small"
                            size="small"
                            required
                            placeholder='brand'
                            onChange={(e) => setProductDetails({ ...productDetails, brand: e.target.value })}
                        />
                        <TextField sx={{ width: '100%' }}
                            hiddenLabel
                            id="filled-hidden-label-small"
                            size="small"
                            required
                            placeholder='stock'
                            onChange={(e) => setProductDetails({ ...productDetails, stock: e.target.value })}
                        />
                    </Grid>
                    <button type='submit'>add</button>
                </Grid>
            </form>

        </>
    );
};

export default CreateProduct;