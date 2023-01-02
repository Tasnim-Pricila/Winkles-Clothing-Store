import { Button, Card, Divider, Grid, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBrands, fetchCategories, fetchProduct, removeSelectedProduct, updateProduct } from '../../../../Redux/actions';
import { Editor } from '@tinymce/tinymce-react';


const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const product = useSelector(state => state.allProducts.product);
    const brands = useSelector(state => state.brands.brands);
    const categories = useSelector(state => state.category.categories);
    const [des, setDes ] = useState('');

    useEffect(() => {
        dispatch(fetchProduct(id));
        return () => {
            dispatch(removeSelectedProduct())
        }
    }, [dispatch, id])

    useEffect(() => {
        dispatch(fetchBrands())
        dispatch(fetchCategories())
    }, [dispatch])

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(id, {
            title: e.target.title.value,
            description: des,
            price: e.target.price.value,
            quantity: e.target.quantity.value,
            unit: e.target.unit.value,
            image: e.target.image.value,
            category: e.target.category.value,
            brand: e.target.brand.value,
            stock: e.target.stock.value,
        }))
        nav('/dashboard/manageProducts')
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
                Edit Product
            </Toolbar>
            <Box p={3}>
                {
                    product?.length !== 0 &&
                    <>
                        <form onSubmit={handleEdit}>
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
                                                name='title'
                                                defaultValue={product?.title}
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <Typography variant='body2' pb={1} fontWeight='600' color='#212529eb'>Product Description</Typography>
                                            <Editor
                                                initialValue = {product?.description}
                                                onEditorChange={(newValue, editor) => setDes(newValue)}
                                                init={{
                                                    height: 500,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist autolink lists link image charmap print preview anchor',
                                                        'searchreplace visualblocks code fullscreen',
                                                        'insertdatetime media table paste code help wordcount'
                                                    ],
                                                    toolbar: 'undo redo | formatselect | ' +
                                                        'bold italic backcolor | alignleft aligncenter ' +
                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                        'removeformat | help',
                                                    content_style: 'body { font-family:Mulish,Helvetica,Arial,sans-serif; font-size:14px }'
                                                }}
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
                                                name='image'
                                                defaultValue={product?.image}
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
                                                    name='quantity'
                                                    defaultValue={product?.quantity}
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
                                                    name='unit'
                                                    defaultValue={product?.unit}
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
                                                    name='price'
                                                    defaultValue={product?.price}
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
                                            name='brand'
                                            defaultValue={product?.brand}
                                            sx={{ width: '100%' }}
                                        >
                                            <MenuItem disabled selected value="">
                                                <em>Select Brand</em>
                                            </MenuItem>
                                            {
                                                brands?.map(brand =>
                                                    <MenuItem value={brand?.name} sx={{ textTransform: 'capitalize' }}>
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
                                            name='category'
                                            defaultValue={product?.category}
                                            sx={{ width: '100%' }}
                                        >
                                            <MenuItem disabled selected value="">
                                                <em>Select Category</em>
                                            </MenuItem>
                                            {
                                                categories?.map(category =>
                                                    <MenuItem value={category?.name} sx={{ textTransform: 'capitalize' }}>
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
                                            sx={{ width: '100%' }}
                                            name='stock'
                                            defaultValue={product?.stock}
                                        >
                                            <MenuItem disabled selected value="">
                                                <em>Select stock</em>
                                            </MenuItem>
                                            <MenuItem value="In Stock">
                                                In stock
                                            </MenuItem>
                                            <MenuItem value="Out of Stock">
                                                Out of Stock
                                            </MenuItem>
                                        </Select>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                                <Button variant='contained' type='submit'> Update Product </Button>
                            </Box>
                        </form>
                    </>
                }
            </Box>
        </Box>
    );
};

export default EditProduct;