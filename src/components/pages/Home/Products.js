import React from 'react';
import Grid from '@mui/material/Grid';
import Product from './Product';
import { Typography } from '@mui/material';

const Products = ({ products }) => {
    return (
        <>
            <Typography variant='h4' sx={{ textAlign: 'center', pt: 10, textTransform: 'uppercase' }}>
                New Arrivals
            </Typography>

            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                mt: 4,
                px: 16,
                mb: 10
            }}>
                {
                    products?.length > 0 ?
                        products.slice(-4).reverse().map(product =>
                            <Product key={product._id}
                                product={product}
                            />)
                        :
                        <p> Loading...</p>
                }
            </Grid>
        </>
    );
};

export default Products;