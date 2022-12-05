import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, searchByFilter } from '../../../Redux/actions';
import AllProducts from './AllProducts';
import LeftSidebar from './LeftSidebar';

const Shop = () => {
    const products = useSelector(state => state.allProducts.products)
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [gtPrice, setGtPrice] = useState('');
    const [ltPrice, setLtPrice] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if (!gtPrice && !ltPrice && !stock && !brand && !category) {
            dispatch(fetchProducts())
        }
        else if (stock && gtPrice && ltPrice && category && brand) {
            const url = `/products?stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice && category && brand) {
            const url = `/products?price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice && category) {
            const url = `/products?price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}`;
            dispatch(searchByFilter(url))
        }
        else if (stock && gtPrice && ltPrice) {
            const url = `/products?stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice) {
            const url = `/products?price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice) {
            const url = `/products?price[gte]=${gtPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (ltPrice) {
            const url = `/products?price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (stock && category && brand) {
            const url = `/products?stock=${stock}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (stock) {
            const url = `/products?stock=${stock}`;
            dispatch(searchByFilter(url))
        }
        else if (category && brand) {
            const url = `/products?category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (category) {
            const url = `/products?category=${category}`;
            dispatch(searchByFilter(url))
        }
        else if (brand) {
            const url = `/products?brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        

    }, [dispatch, stock, gtPrice, ltPrice, category, brand])

    return (
        <div>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 2, px: 6, }}>
                <Grid item xs={2} md={3} >
                    <LeftSidebar category={category} setCategory={setCategory} gtPrice={gtPrice} setGtPrice={setGtPrice} stock={stock} setStock={setStock} brand={brand} setBrand={setBrand} setLtPrice={setLtPrice} ltPrice={ltPrice} />
                </Grid>
                <Grid item xs={4} md={9} >
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                        mt: 2,
                        px: 6,

                    }}>
                        {
                            products.length > 0 ?
                                products.map(product =>
                                    <AllProducts key={product._id}
                                        product={product}
                                    />
                                )
                                :
                                <p> No results found </p>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Shop;