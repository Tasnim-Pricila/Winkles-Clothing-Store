import { Button, Card, Divider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../../../../Redux/actions';

const CreateProduct = () => {
    const product = useSelector(state => state.orders.allOrder);
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
                                placeholder="Select Brand"
                                displayEmpty
                                label="Age"
                                value={productDetails.brand}
                                onChange={(e) => setProductDetails({ ...productDetails, brand: e.target.value })}
                                sx={{ width: '100%' }}
                            >
                                <MenuItem disabled selected value="">
                                    <em>Select Brand</em>
                                </MenuItem>
                                {/* brand map hobe  */}
                            </Select>
                        </Card>

                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', mt: 2 }} >
                            <Typography pb={1}> Product Categories </Typography>
                            <Divider></Divider>
                            <Typography variant='body2' py={2} fontWeight='600' color='#212529eb'>Select product category</Typography>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                placeholder="Select category"
                                displayEmpty
                                label="Age"
                                value={productDetails.brand}
                                onChange={(e) => setProductDetails({ ...productDetails, brand: e.target.value })}
                                sx={{ width: '100%' }}
                            >
                                <MenuItem disabled selected value="">
                                    <em>Select Category</em>
                                </MenuItem>
                                {/* brand map hobe  */}
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2}}>
                    <Button variant='contained' onClick={addProduct}> Add Product </Button>
                </Box>

            </Box>
        </Box>
    );
};

export default CreateProduct;