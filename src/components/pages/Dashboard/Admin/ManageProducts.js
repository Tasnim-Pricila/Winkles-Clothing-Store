import { BorderColor, Delete, SearchOutlined } from '@mui/icons-material';
import { Box, Button, Card, Divider, Grid, InputAdornment, Link, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../../Redux/actions';

const ManageProducts = () => {
    const products = useSelector(state => state.allProducts.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
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
                                <Link sx={{ cursor: 'pointer' }}>Clear All</Link>
                            </Box>
                            <Divider></Divider>
                            <Box my={2}>
                                <Typography pb={1} sx={{ fontWeight: '600' }}>Categories</Typography>
                                <Link underline='none' pt={1} sx={{ cursor: 'pointer', color: '#495057', fontSize: '14px', display: 'block', }}>Men</Link>
                                <Link underline='none' pt={1} sx={{ cursor: 'pointer', color: '#495057', fontSize: '14px', display: 'block' }}>Women</Link>
                                <Link underline='none' pt={1} sx={{ cursor: 'pointer', color: '#495057', fontSize: '14px', display: 'block', }}>Kids</Link>
                            </Box>
                            <Divider></Divider>
                            <Box my={2}>
                                <Typography pb={1} sx={{ fontWeight: '600' }}>Brands</Typography>
                                <Link underline='none' pt={1} sx={{ cursor: 'pointer', color: '#495057', fontSize: '14px', display: 'block', }}>Men</Link>
                                <Link underline='none' pt={1} sx={{ cursor: 'pointer', color: '#495057', fontSize: '14px', display: 'block' }}>Women</Link>
                                <Link underline='none' pt={1} sx={{ cursor: 'pointer', color: '#495057', fontSize: '14px', display: 'block', }}>Kids</Link>
                            </Box>
                        </Card>

                    </Grid>
                    <Grid item md={9} height='100%'>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Button variant='contained' sx={{ textTransform: 'capitalize' }}> + Add Product </Button>
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
                                    sx={{
                                        '.css-1xp6qmi-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '14px'
                                        }
                                    }}
                                />
                            </Box>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Product </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Stock </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Price </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Brand </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Action </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        products.map(product =>
                                            <TableRow>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <img src={product.image} alt="" width='40px' height='40px' />
                                                        <Box >
                                                            <Typography> {product.title} </Typography>
                                                            <Typography variant='caption' sx={{ color: '#878a99'}}> Category: {product.category} </Typography>
                                                        </Box>

                                                    </Box>

                                                </TableCell>
                                                <TableCell> {product.quantity} </TableCell>
                                                <TableCell> {product.price} </TableCell>
                                                <TableCell> {product.brand} </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <BorderColor fontSize='small' />
                                                        <Delete fontSize='small' />
                                                    </Box>

                                                </TableCell>
                                            </TableRow>)
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