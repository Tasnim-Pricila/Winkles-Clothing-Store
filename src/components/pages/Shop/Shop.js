import { GridView, TableRows } from '@mui/icons-material';
import { Box, Grid, Pagination, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useUsers from '../../../Custom Hook/useUsers';
import { addToCart, fetchProductsByPagination, getCart, getMe, searchByFilter, searchProducts } from '../../../Redux/actions';
import Footer from '../../shared/Footer';
import Loading from '../Loading/Loading';
import AllProducts from './AllProducts';
import LeftSidebar from './LeftSidebar';
import ListView from './ListView';

const Shop = ({ searchText, setSearchText }) => {
    const products = useSelector(state => state.allProducts.products)
    // var saveCart = useSelector(state => state.allProducts.saveCart)
    const searched = useSelector(state => state.allProducts.searchProducts)
    const user = useSelector(state => state.allUsers.user)
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [gtPrice, setGtPrice] = useState('');
    const [ltPrice, setLtPrice] = useState('');
    const [stock, setStock] = useState('');
    const [grid, setGrid] = useState(true);
    const [list, setList] = useState(false);
    // const [cartProduct, setCartProduct] = useState([]);
    // const [cartQty, setCartQty] = useState([]);
    // const [user] = useUsers();
    const location = useLocation();

    const [selectedPage, setSelectedPage] = useState(1);

    const handleChange = (event, value) => {
        setSelectedPage(value);
        if (location?.state?.value && !stock && !gtPrice && !ltPrice && !category && !brand && searchText === '') {
            const url = `/products?page=${value}&limit=12&category=${location?.state?.value}`;
            dispatch(searchByFilter(url))
        }
        else if (!gtPrice && !ltPrice && !stock && !brand && !category) {
            dispatch(fetchProductsByPagination(value))
        }
        else if (stock && gtPrice && ltPrice && category && brand) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice && category && brand) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice && category) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}`;
            dispatch(searchByFilter(url))
        }
        else if (stock && gtPrice && ltPrice) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&price[gte]=${gtPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (ltPrice) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (stock && category && brand) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&stock=${stock}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (stock) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&stock=${stock}`;
            dispatch(searchByFilter(url))
        }
        else if (category && brand) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (category) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&category=${category}`;
            dispatch(searchByFilter(url))
        }
        else if (brand) {
            setSearchText('');
            const url = `/products?page=${value}&limit=12&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
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

    useEffect(() => {
        if (location?.state?.value && !stock && !gtPrice && !ltPrice && !category && !brand && searchText === '') {
            const url = `/products?page=${selectedPage}&limit=12&category=${location?.state?.value}`;
            dispatch(searchByFilter(url))
        }
        else if (!gtPrice && !ltPrice && !stock && !brand && !category) {
            dispatch(fetchProductsByPagination(selectedPage))
        }
        else if (stock && gtPrice && ltPrice && category && brand) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice && category && brand) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice && category) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}&category=${category}`;
            dispatch(searchByFilter(url))
        }
        else if (stock && gtPrice && ltPrice) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&stock=${stock}&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice && ltPrice) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&price[gte]=${gtPrice}&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (gtPrice) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&price[gte]=${gtPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (ltPrice) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&price[lte]=${ltPrice}`;
            dispatch(searchByFilter(url))
        }
        else if (stock && category && brand) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&stock=${stock}&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (stock) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&stock=${stock}`;
            dispatch(searchByFilter(url))
        }
        else if (category && brand) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&category=${category}&brand=${brand}`;
            dispatch(searchByFilter(url))
        }
        else if (category) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&category=${category}`;
            dispatch(searchByFilter(url))
        }
        else if (brand) {
            setSearchText('');
            const url = `/products?page=${selectedPage}&limit=12&brand=${brand}`;
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

    let newCart = user?.cart?.product;

    const handleAddToCart = (id) => {
        dispatch(getMe())
        const selectedProduct = products?.result?.find(p => p._id === id)
        const exists = newCart?.find(c => c._id === selectedProduct._id)
        if (!exists) {
            selectedProduct.qty = 1;
            newCart = [...newCart, selectedProduct];
        }
        else {
            exists.qty = exists.qty + 1;
            const rest = newCart.filter(c => c._id !== exists._id)
            newCart = [...rest, exists];
        }
        // console.log(newCart);

        const cartData = {
            cart: {
                product: newCart
            },
        }
        // console.log(cartData);

        dispatch(addToCart(user._id, cartData, id));
        dispatch(getMe())
        // dispatch(getCart())
    }

    return (
        <>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 2, px: 16, }}>
                <Grid item xs={2} md={3} >
                    <LeftSidebar category={category} setCategory={setCategory} gtPrice={gtPrice} setGtPrice={setGtPrice} stock={stock} setStock={setStock} brand={brand} setBrand={setBrand} setLtPrice={setLtPrice} ltPrice={ltPrice} handleClear={handleClear} />
                </Grid>

                <Grid item xs={4} md={9} >
                    <Box sx={{ px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Tooltip title="Grid View">
                                <GridView sx={{
                                    p: 2,
                                    bgcolor: grid ? 'black' : 'white',
                                    color: grid ? 'white' : 'black',
                                    mr: 2,
                                    border: 1,
                                    cursor: 'pointer'
                                }}
                                    value='grid' onClick={handleGrid} />
                            </Tooltip>
                            <Tooltip title="List View">
                                <TableRows sx={{
                                    p: 2,
                                    bgcolor: list ? 'black' : 'white',
                                    color: list ? 'white' : 'black',
                                    border: 1,
                                    cursor: 'pointer'
                                }}
                                    onClick={handleList} />
                            </Tooltip>
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
                            px: 2,

                        }}>
                            {
                                searchText === '' ?
                                    products?.result?.length > 0 ?
                                        products?.result?.map((product, i) =>
                                            <AllProducts key={product._id}
                                                product={product} handleAddToCart={handleAddToCart}
                                            />
                                        )
                                        :
                                        <Loading/>
                                    :
                                    searched?.length > 0 ?
                                        searched?.map(product =>
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
                        <Box sx={{
                            mt: 2,
                            px: 2,

                        }}>
                            {
                                searchText === '' ?
                                    products?.result?.length > 0 ?
                                        products?.result?.map((product, i) =>
                                            <ListView key={product._id}
                                                product={product} handleAddToCart={handleAddToCart}
                                            />
                                        )
                                        :
                                        <Loading/>
                                    :
                                    searched.length > 0 ?
                                        searched.map(product =>
                                            <ListView key={product._id}
                                                product={product}
                                            />
                                        )
                                        :
                                        <p> No search results found </p>
                            }
                        </Box>
                    }
                    {/* <Typography> Page: {selectedPage} </Typography> */}
                    <Pagination count={page} color="primary" defaultPage={1}
                        page={selectedPage} onChange={handleChange}
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