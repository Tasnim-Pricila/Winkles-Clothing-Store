import React from 'react';
import Grid from '@mui/material/Grid';
import Product from './Product';
import { Typography } from '@mui/material';
import Loading from '../Loading/Loading';

const Products = ({ products }) => {
    return (
        <>
            <Typography sx={{ textAlign: 'center', pt: 10, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', fontSize: '26px' }}>
                New Arrivals
            </Typography>

            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{
                mt: 4,
                px: 16,
                mb: 10
            }}>
                {
                    products?.length > 0 ?
                        products.slice(-4).reverse().map(product =>
                            <Product key={product._id}
                                product={product}
                                products={products}
                            />)
                        :
                        <Loading/>
                }
            </Grid>
        </>
    );
};

export default Products;