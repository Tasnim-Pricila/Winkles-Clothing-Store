import { Button, Card, Divider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCategories, postProduct } from '../../../../Redux/actions';

const CreateProduct = () => {
    const brands = useSelector(state => state.brands.brands);
    const categories = useSelector(state => state.category.categories);
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        unit: '',
        image: '',
        category: '',
        brand: '',
        stock: '',
    })

    const addProduct = (e) => {
        e.preventDefault();
        dispatch(postProduct(productDetails))
        console.log(productDetails)
    }
    useEffect(() => {
        dispatch(fetchBrands())
        dispatch(fetchCategories())
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
                Add Product
            </Toolbar>
            <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item md={7} height='100%'>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                            <Box>
                                <Typography variant='body2' pb={1} fontWeight='600' color='#212529eb'>Product Title</Typography>
                                <TextField sx={{
                                    width: '100%',
                                    '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                        fontSize: '13px', color: '#212529'
                                    }
                                }}
                                    hiddenLabel
                                    required
                                    type="text"
                                    id="filled-hidden-label-small"
                                    size="small"
                                    placeholder='Enter product title'
                                    onChange={(e) => setProductDetails({ ...productDetails, title: e.target.value })}
                                />
                            </Box>
                            <Box mt={2}>
                                <Typography variant='body2' pb={1} fontWeight='600' color='#212529eb'>Product Description</Typography>
                                <TextField sx={{
                                    width: '100%',
                                    '.css-1qxw4jt-MuiInputBase-root-MuiOutlinedInput-root': {
                                        fontSize: '13px', color: '#212529'
                                    }
                                }}
                                    multiline
                                    rows={7}
                                    required
                                    type="text"
                                    id="filled-hidden-label-small"
                                    size="small"
                                    placeholder='Enter product description'
                                    onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                                />
                            </Box>
                            <Box mt={2}>
                                <Typography variant='body2' pb={1} fontWeight='600' color='#212529eb'>Product Image</Typography>
                                <TextField sx={{
                                    width: '100%',
                                    '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                        fontSize: '13px', color: '#212529'
                                    }
                                }}
                                    required
                                    type="text"
                                    id="filled-hidden-label-small"
                                    size="small"
                                    placeholder='Enter product image link'
                                    onChange={(e) => setProductDetails({ ...productDetails, image: e.target.value })}
                                />
                            </Box>
                        </Card>

                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', mt: 3 }}>
                            <Typography pb={1}>General Info</Typography>
                            <Divider></Divider>
                            <Grid container spacing={2} mt={1}>
                                <Grid item md={4}>
                                    <Typography variant='body2' pb={1} fontWeight='600' color='#212529eb'>Stock</Typography>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}
                                        hiddenLabel
                                        required
                                        type="number"
                                        id="filled-hidden-label-small"
                                        size="small"
                                        placeholder='Enter stocks'
                                        onChange={(e) => setProductDetails({ ...productDetails, quantity: e.target.value })}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <Typography variant='body2' pb={1} fontWeight='600' color='#212529eb'>Unit</Typography>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}
                                        hiddenLabel
                                        required
                                        type="text"
                                        id="filled-hidden-label-small"
                                        size="small"
                                        placeholder='Enter unit'
                                        onChange={(e) => setProductDetails({ ...productDetails, unit: e.target.value })}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <Typography variant='body2' pb={1} fontWeight='600' color='#212529eb'>Price</Typography>
                                    <TextField sx={{
                                        width: '100%',
                                        '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '13px', color: '#212529'
                                        }
                                    }}
                                        hiddenLabel
                                        required
                                        type="number"
                                        id="filled-hidden-label-small"
                                        size="small"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder='Enter price'
                                        onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                                    />
                                </Grid>
                            </Grid>

                        </Card>

                    </Grid>
                    <Grid item md={5} height='100%'>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                            <Typography pb={1}>Product Brands </Typography>
                            <Divider></Divider>
                            <Typography variant='body2' py={2} fontWeight='600' color='#212529eb'>Select product brand</Typography>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                displayEmpty
                                label="Age"
                                value={productDetails.brand}
                                onChange={(e) => setProductDetails({ ...productDetails, brand: e.target.value })}
                                sx={{ width: '100%' }}
                            >
                                <MenuItem disabled selected value="">
                                    <em>Select Brand</em>
                                </MenuItem>
                                {
                                    brands?.map(brand =>
                                        <MenuItem value = { brand?.name } sx={{ textTransform: 'capitalize'}}>
                                            {brand?.name}
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </Card>

                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', mt: 2 }} >
                            <Typography pb={1}> Product Categories </Typography>
                            <Divider></Divider>
                            <Typography variant='body2' py={2} fontWeight='600' color='#212529eb'>Select product category</Typography>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                displayEmpty
                                label="Age"
                                value={productDetails.category}
                                onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
                                sx={{ width: '100%' }}
                            >
                                <MenuItem disabled selected value="">
                                    <em>Select Category</em>
                                </MenuItem>
                                {
                                    categories?.map(category =>
                                        <MenuItem value = { category?.name } sx={{ textTransform: 'capitalize'}}>
                                            {category?.name}
                                        </MenuItem>
                                    )
                                }
                                </Select>
                        </Card>

                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', mt: 2 }} >
                            <Typography pb={1}> Product Availability </Typography>
                            <Divider></Divider>
                            <Typography variant='body2' py={2} fontWeight='600' color='#212529eb'> Status </Typography>
                            <Select
                                displayEmpty
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                placeholder="Select category"
                                sx={{ width: '100%' }}
                                value={productDetails.stock}
                                onChange={(e) => setProductDetails({ ...productDetails, stock: e.target.value })}
                            >
                                <MenuItem disabled selected value="">
                                    <em>Select stock</em>
                                </MenuItem>
                                <MenuItem value="In Stock">
                                    In stock
                                </MenuItem>
                                <MenuItem value="Out of stock">
                                    Out of stock
                                </MenuItem>
                            </Select>
                        </Card>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <Button variant='contained' onClick={addProduct}> Add Product </Button>
                </Box>

            </Box>
        </Box>
    );
};

export default CreateProduct;