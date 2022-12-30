import { BorderColor, Delete, DeleteForever, Edit, SearchOutlined } from '@mui/icons-material';
import { Box, Button, Card, Divider, Grid, InputAdornment, Link, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, fetchBrands, fetchCategories, fetchProducts, searchByFilter, searchProducts } from '../../../../Redux/actions';

const ManageProducts = () => {
    const products = useSelector(state => state.allProducts.products);
    const brands = useSelector(state => state.brands.brands);
    const categories = useSelector(state => state.category.categories);
    const searched = useSelector(state => state.allProducts.searchProducts)

    const dispatch = useDispatch();
    const nav = useNavigate();
    const [search, setSearch] = useState('')


    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        if (search !== '') {
            dispatch(searchProducts(search))
        }
    }, [dispatch, search])

    useEffect(() => {
        dispatch(fetchBrands())
        dispatch(fetchCategories())
    }, [dispatch])

    const handleAddproduct = () => {
        nav('/dashboard/addProduct')
    }
    const handleEditProduct = (id) => {
        nav(`/dashboard/editProduct/${id}`)
    }
    const handleDeleteproduct = (id) => {
        dispatch(deleteProduct(id))
    }
    const handleClear = () => {
        dispatch(fetchProducts())
    }
    const handleCategory = (e) => {
        document.getElementById("standard-search").value = '';
        setSearch('');
        const url = `/products?category=${e.target.value}`;
        dispatch(searchByFilter(url))
    }
    const handleBrand = (e) => {
        document.getElementById("standard-search").value = '';
        setSearch('');
        const url = `/products?brand=${e.target.value}`;
        dispatch(searchByFilter(url))
        console.log(e.target.value);
    }
    const addBtn = {
        color: 'white',
        backgroundColor: '#45CB85',
        padding: '5px 10px',
        textTransform: 'capitalize',
        boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
        '&:hover': {
            backgroundColor: '#3bad71',
        }
    }

    return (
        <Box mb={4}>
            <Toolbar sx={{
                boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#495057',
                letterSpacing: '-0.5px'
            }}>
                Manage Products
            </Toolbar>
            <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item md={3} height='100%'>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                                <Typography>Filters</Typography>
                                <Link sx={{ cursor: 'pointer', color: '#4b38b3', fontSize: '14px', textDecorationColor: '#4b38b3' }} onClick={handleClear}>Clear All</Link>
                            </Box>
                            <Divider></Divider>
                            <Box my={2}>
                                <Typography pb={1} sx={{ fontWeight: '600' }}>Categories</Typography>
                                {
                                    categories.map(cat =>
                                        <Button variant='text'
                                            sx={{ color: '#495057', fontSize: '14px', display: 'block', textTransform: 'capitalize', minWidth: 0, paddingBottom: '0' }} value={cat?.name}
                                            onClick={handleCategory}>
                                            {cat?.name}
                                        </Button>
                                    )
                                }
                            </Box>
                            <Divider></Divider>
                            <Box my={2}>
                                <Typography pb={1} sx={{ fontWeight: '600' }}>Brands</Typography>
                                {
                                    brands.map(brand =>
                                        <Button sx={{ color: '#495057', fontSize: '14px', display: 'block', textTransform: 'capitalize', minWidth: 0, paddingBottom: '0' }} value={brand?.name} onClick={handleBrand}>
                                            {brand?.name}
                                        </Button>
                                    )
                                }
                            </Box>
                        </Card>

                    </Grid>
                    <Grid item md={9} height='100%'>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <Button variant='contained' sx={addBtn}
                                    onClick={() => handleAddproduct()}
                                > + Add Product </Button>
                                <TextField
                                    id="standard-search"
                                    type="search"
                                    placeholder='Search Products...'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{
                                        '.css-1xp6qmi-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '14px'
                                        }
                                    }}
                                />
                            </Box>
                            <Table aria-label="simple table">
                                <TableHead sx={{ bgcolor: '#f3f6f9' }}>
                                    <TableRow sx={{
                                        '.MuiTableCell-root': {
                                            color: '#878a99',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }
                                    }}>
                                        <TableCell> Product </TableCell>
                                        <TableCell> Stock </TableCell>
                                        <TableCell> Price </TableCell>
                                        <TableCell> Brand </TableCell>
                                        <TableCell> Action </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        search === '' ?
                                            products?.length > 0 ?
                                                products?.map(product =>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <img src={product.image} alt="" width='40px' height='40px' />
                                                                <Box >
                                                                    <Typography> {product.title} </Typography>
                                                                    <Typography variant='caption' sx={{ color: '#878a99', textTransform: 'capitalize' }}> Category: {product.category} </Typography>
                                                                </Box>

                                                            </Box>

                                                        </TableCell>
                                                        <TableCell> {product.quantity} </TableCell>
                                                        <TableCell> {product.price} </TableCell>
                                                        <TableCell sx={{ textTransform: 'capitalize' }}> {product.brand} </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <Edit fontSize='small' onClick={() => handleEditProduct(product._id)} sx={{ color: '#4b38b3' }} />
                                                                <DeleteForever fontSize='small' onClick={() => handleDeleteproduct(product._id)} sx={{ color: '#f06548' }} />
                                                            </Box>

                                                        </TableCell>
                                                    </TableRow>
                                                )
                                                :
                                                <Typography> No results found </Typography>
                                            :
                                            searched?.length > 0 ?
                                                searched?.map(product =>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <img src={product.image} alt="" width='40px' height='40px' />
                                                                <Box >
                                                                    <Typography> {product.title} </Typography>
                                                                    <Typography variant='caption' sx={{ color: '#878a99', textTransform: 'capitalize' }}> Category: {product.category} </Typography>
                                                                </Box>

                                                            </Box>

                                                        </TableCell>
                                                        <TableCell> {product.quantity} </TableCell>
                                                        <TableCell> {product.price} </TableCell>
                                                        <TableCell sx={{ textTransform: 'capitalize' }}> {product.brand} </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <BorderColor fontSize='small' onClick={() => handleEditProduct(product._id)} />
                                                                <Delete fontSize='small' onClick={() => handleDeleteproduct(product._id)} />
                                                            </Box>

                                                        </TableCell>
                                                    </TableRow>
                                                )
                                                :
                                                <Typography> No results found </Typography>
                                    }
                                </TableBody>
                            </Table>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ManageProducts;