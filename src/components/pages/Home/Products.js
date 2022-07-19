import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../Redux/actions';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Product from './Product';

const Products = () => {
    const products = useSelector(state => state.allProducts.products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <div>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                mt: 2,
                px: 6
            }}>
                {
                    products.map(product =>
                        <Product key={product._id}
                         product= {product}
                         dispatch={dispatch} />   
                    )
                }


            </Grid>
        </div>
    );
};

export default Products;