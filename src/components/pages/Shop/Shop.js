import { GridView, TableRows, ViewList, Window } from '@mui/icons-material';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useUsers from '../../../Custom Hook/useUsers';
import { fetchProductsByPagination, searchByFilter, searchProducts } from '../../../Redux/actions';
import Footer from '../../shared/Footer';
import AllProducts from './AllProducts';
import LeftSidebar from './LeftSidebar';

const Shop = ({ searchText, setSearchText }) => {
    const products = useSelector(state => state.allProducts.pagination)
    const searched = useSelector(state => state.allProducts.searchProducts)
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [gtPrice, setGtPrice] = useState('');
    const [ltPrice, setLtPrice] = useState('');
    const [stock, setStock] = useState('');
    const [grid, setGrid] = useState(true);
    const [list, setList] = useState(false);
    // const [user] = useUsers();
    const location = useLocation();

    const [selectedPage, setSelectedPage] = useState(1);
    const handleChange = (event, value) => {
        setSelectedPage(value);
        dispatch(fetchProductsByPagination(value))
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const page = (Math.ceil(products?.count / 12));
    const skip = (selectedPage - 1) * 12;

    const handleClear = () => {
        setSearchText('');
        dispatch(fetchProductsByPagination(selectedPage))
    }
    // console.log(location?.state?.value)

    useEffect(() => {
        if (location?.state?.value && !stock && !gtPrice && !ltPrice && !category && !brand && searchText === '') {
            const url = `/products?category=${location?.state?.value}`;
            dispatch(searchByFilter(url))
        }
        else if (!gtPrice && !ltPrice && !stock && !brand && !category) {
            dispatch(fetchProductsByPagination(selectedPage))
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
            dispatch(fetchProductsByPagination(selectedPage))
        else {
            dispatch(searchProducts(searchText))
        }
    }, [searchText, dispatch, location?.state?.value])

    const handleGrid = () => {
        setGrid(true);
        setList(false)
    }
    const handleList = () => {
        setGrid(false)
        setList(true);
    }

    return (
        <>

            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 2, px: 16, }}>
                <Grid item xs={2} md={3} >
                    <LeftSidebar category={category} setCategory={setCategory} gtPrice={gtPrice} setGtPrice={setGtPrice} stock={stock} setStock={setStock} brand={brand} setBrand={setBrand} setLtPrice={setLtPrice} ltPrice={ltPrice} handleClear={handleClear} />
                </Grid>

                <Grid item xs={4} md={9} >
                    <Box sx={{ px: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <GridView sx={{
                                p: 2, 
                                bgcolor: grid ? 'black' : 'white', 
                                color: grid ? 'white' : 'black',
                                mr: 2,
                                border: 1,
                                cursor: 'pointer'
                            }}
                                value='grid' onClick={handleGrid} />
                            <TableRows sx={{ 
                                p: 2, 
                                bgcolor: list ? 'black' : 'white', 
                                color: list ? 'white' : 'black',
                                border: 1,
                                cursor: 'pointer'
                            }}
                                onClick={handleList} />
                        </Box>
                        <Typography sx={{ color: '#00000066' }}> Showing <span style={{ color: 'black', }}>
                            {skip + 1} -
                            {skip + 12} of {products?.count} </span> Products
                        </Typography>
                    </Box>

                    {
                        grid &&
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                            mt: 2,
                            px: 6,

                        }}>
                            {
                                searchText === '' ?
                                    products?.result?.length > 0 ?
                                        products?.result?.map((product, i) =>
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
                    }

                    {
                        list &&
                        <Typography>
                            List here
                        </Typography>
                    }


                    <Pagination count={page} color="primary" defaultPage={1} page={selectedPage} onChange={handleChange}
                        sx={{
                            py: 6,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }} />
                </Grid>

            </Grid>
            <Footer></Footer>
        </>
    );
};

export default Shop;