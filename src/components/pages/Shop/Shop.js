import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useUsers from '../../../Custom Hook/useUsers';
import { fetchProducts, searchByFilter, searchProducts } from '../../../Redux/actions';
import AllProducts from './AllProducts';
import LeftSidebar from './LeftSidebar';

const Shop = ({ searchText, setSearchText }) => {
    const products = useSelector(state => state.allProducts.products)
    const searched = useSelector(state => state.allProducts.searchProducts)
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [gtPrice, setGtPrice] = useState('');
    const [ltPrice, setLtPrice] = useState('');
    const [stock, setStock] = useState('');
    // const [user] = useUsers();
    const location = useLocation();

    const handleClear = () => {
        setSearchText('');
        dispatch(fetchProducts())
    }
    // console.log(location?.state?.value)

    useEffect(() => {
        if (location?.state?.value && !stock && !gtPrice && !ltPrice && !category && !brand && searchText === '') {
            const url = `/products?category=${location?.state?.value}`;
            dispatch(searchByFilter(url))
        }
        else if (!gtPrice && !ltPrice && !stock && !brand && !category) {
            dispatch(fetchProducts())
        }
        else if (stock && gtPrice && ltPrice && category && brand) {
            setSearchText('');
            const url = `/products?stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice && category && brand) {
            setSearchText('');
            const url = `/products?price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice && category) {
            setSearchText('');
            const url = `/products?price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}`;
            dispatch(searchByFilter(url))
        }
        else if (stock && gtPrice && ltPrice) {
            setSearchText('');
            const url = `/products?stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice) {
            setSearchText('');
            const url = `/products?price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice) {
            setSearchText('');
            const url = `/products?price[gte]=${gtPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (ltPrice) {
            setSearchText('');
            const url = `/products?price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (stock && category && brand) {
            setSearchText('');
            const url = `/products?stock=${stock}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (stock) {
            setSearchText('');
            const url = `/products?stock=${stock}`;
            dispatch(searchByFilter(url))
        }
        else if (category && brand) {
            setSearchText('');
            const url = `/products?category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (category) {
            setSearchText('');
            const url = `/products?category=${category}`;
            dispatch(searchByFilter(url))
        }
        else if (brand) {
            setSearchText('');
            const url = `/products?brand=${brand}`;
            dispatch(searchByFilter(url))
        }
    },
        [dispatch, stock, gtPrice, ltPrice, category, brand, setSearchText, location?.state?.value])

    useEffect(() => {
        if (searchText === '' && !location?.state?.value)
            dispatch(fetchProducts())
        else {
            dispatch(searchProducts(searchText))
        }
    }, [searchText, dispatch, location?.state?.value])


    return (
        <>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 2, px: 16, }}>
                <Grid item xs={2} md={3} >
                    <LeftSidebar category={category} setCategory={setCategory} gtPrice={gtPrice} setGtPrice={setGtPrice} stock={stock} setStock={setStock} brand={brand} setBrand={setBrand} setLtPrice={setLtPrice} ltPrice={ltPrice} handleClear={handleClear} />
                </Grid>

                <Grid item xs={4} md={9} >
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                        mt: 2,
                        px: 6,

                    }}>
                        {
                            searchText === '' ?
                                products.length > 0 ?
                                    products.map(product =>
                                        <AllProducts key={product._id}
                                            product={product}
                                        />
                                    )
                                    :
                                    <p> No results found </p>
                                :
                                searched.length > 0 ?
                                    searched.map(product =>
                                        <AllProducts key={product._id}
                                            product={product}
                                        />
                                    )
                                    :
                                    <p> No search results found </p>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Shop;