import React from 'react';
import Grid from '@mui/material/Grid';
import Product from './Product';
import { Button, Typography } from '@mui/material';

const Products = ({ searchText, products, searched, setSearchText }) => {
    const handleReset = () => {
        setSearchText('');
    }

    return (
        <div>
            <Grid container sx={{
                mt: 2,
                px: 16
            }}>
                <Grid item xs={6}>
                    <Typography>Search Results: </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='filled' onClick={handleReset}>Reset Search Results</Button>

                </Grid>
            </Grid>

            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                mt: 2,
                px: 16,
                py: 16
            }}>
                {
                    searchText === '' ?
                        <>
                            {
                                products.map(product =>
                                    <Product key={product._id}
                                        product={product}
                                    />
                                )}
                        </>
                        :
                        <>
                            {
                                searched.map(product =>
                                    <Product key={product._id}
                                        product={product}
                                    />
                                )}
                        </>
                }


            </Grid>
        </div>
    );
};

export default Products;