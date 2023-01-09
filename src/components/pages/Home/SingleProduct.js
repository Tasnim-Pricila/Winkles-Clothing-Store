import React, { useEffect, useState } from 'react';
import { addToCart, adjustQty, fetchProduct, fetchProducts, fetchReview, fetchReviewbyProductId, removeFromCart, removeSelectedProduct } from '../../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Box, Card, Divider, Rating, TextField } from '@mui/material';
import { CheckCircle, ShoppingCart } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Carousel } from 'react-responsive-carousel';
import "./carousel.min.css";
import RatingModal from './RatingModal';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const state = useSelector(state => state.allProducts);
    const reviews = useSelector(state => state.reviews.review);
    let product = state.product;
    const getCart = state.cart.find(cart => cart._id === id);

    const quantity = product?.quantity;
    const qty = getCart?.qty;

    const [purchaseQuantity, setQty] = useState(qty);

    const increase = () => {
        dispatch(addToCart(id));
        setQty(parseInt(purchaseQuantity) + 1);
        const q = quantity - 1;
        if (purchaseQuantity === q) {
            console.log('no') //toast
        }
        dispatch(adjustQty(id, purchaseQuantity + 1))
    }
    const decrease = () => {
        setQty(parseInt(purchaseQuantity) - 1);
        console.log(purchaseQuantity)
        if (purchaseQuantity === 1) {
            dispatch(removeFromCart(id))
        }
        dispatch(adjustQty(id, purchaseQuantity - 1))
    }

    useEffect(() => {
        dispatch(fetchProduct(id))
        return () => {
            dispatch(removeSelectedProduct())
        }
    }, [id, dispatch])

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchReviewbyProductId(id))
    }, [dispatch, id])

    useEffect(() => {
        if (qty === undefined) {
            setQty(0);
        }
    }, [qty, setQty, purchaseQuantity])

    const handleAddToCart = (id) => {
        dispatch(addToCart(id));
    }

    const stock = {
        backgroundColor: ' #FF8E78',
        color: 'white',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,

    }
    const cart = {
        border: '1px solid #FF8E78',
        color: '#FF8E78',
        padding: '5px 10px',
        borderRadius: 0,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#FF8E78',
            color: 'white'
        }
    }
    let allImg = [];
    const mainImg = [product?.image];
    const galleryImg = product?.imageGallery?.filter(image => image)
    if (mainImg && galleryImg) {
        allImg = [...mainImg, ...galleryImg]
    }

    return (
        <>
            {
                product ?
                    <>
                        <Grid container direction="row" columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            sx={{ px: 16, mt: 10 }}>
                            <Grid item xs={4}>
                                <Carousel>
                                    {allImg &&
                                        allImg.map((image, i) => {
                                            return (
                                                <img src={image} alt={image} key={i}
                                                    style={{
                                                        objectFit: 'cover'
                                                    }} />
                                            )
                                        })

                                    }
                                </Carousel>
                            </Grid>
                            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography gutterBottom variant="h4" sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'black', mt: 2 }}>
                                    {product.title}
                                </Typography>
                                <Divider />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Typography variant="h5" sx={{ py: 2, fontWeight: 'bold' }}>
                                        Tk. {product.price}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={stock}
                                    >
                                        <CheckCircle fontSize='small' sx={{ pr: 1 }} />
                                        {product.stock}
                                    </Typography>
                                </Box>
                                <Divider />

                                <Typography variant="body2" sx={{ py: 2, fontWeight: 'bold', color: 'gray', textTransform: 'capitalize' }}>
                                    Brand: {product.brand}
                                </Typography>
                                <Divider />

                                <Typography variant="body2" gutterBottom sx={{
                                    textAlign: 'justify',
                                    my: 2
                                }}>
                                    <b style={{ marginBottom: '4px', display: 'inline-block', fontSize: '16px', paddingBottom: '10px' }}>Description:</b> <br /> {product.description}
                                </Typography>

                                <Divider />

                                <Box mt={3} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Typography fontWeight='bold'> Qty: </Typography>
                                    <Button disabled={purchaseQuantity === quantity} onClick={increase} variant='outlined' sx={{ border: '2px solid' }}>
                                        <AddIcon />
                                    </Button>
                                    <TextField
                                        label={purchaseQuantity}
                                        onChange={(e) => setQty(e.target.value)}
                                        size='small'
                                        InputProps={{
                                            readOnly: true,
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*'
                                        }}
                                        disabled
                                        sx={{
                                            textAlign: 'center', width: '60px',
                                            '.css-1pysi21-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled': {
                                                color: "black",
                                            }
                                        }}
                                    />

                                    <Button onClick={decrease} sx={{ border: '2px solid' }}
                                        variant='outlined' disabled={purchaseQuantity === 0}>
                                        <RemoveIcon />
                                    </Button>

                                    <Button size="small"
                                        sx={cart}
                                        onClick={() => handleAddToCart(product._id)}
                                        startIcon={<ShoppingCart />} >
                                        Add To Cart
                                    </Button>
                                </Box>

                            </Grid>
                        </Grid>

                        {/* Review Section  */}
                        <Card variant="outlined" sx={{ p: 4, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', mx: 16, my: 10 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6' fontWeight='bold'> Share your thoughts with other customers </Typography>
                                <Box>
                                    <RatingModal id={id}> </RatingModal>
                                </Box>
                            </Box>
                            <Box mt={4}>
                                {
                                    reviews?.length > 0 ?
                                        reviews?.map((review, i) =>
                                            <Box mb={3}>
                                                <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />

                                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <Typography fontWeight='bold' sx={{ fontSize: '15px' }}>
                                                            {review.postedBy}
                                                        </Typography>
                                                        <Typography sx={{ display: 'flex', fontSize: '14px', alignItems: 'center', gap: '10px' }}>
                                                            <Rating name="read-only" size="small" value={review.rating} precision={0.5} readOnly />
                                                            {review.summary}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography mt={1} sx={{ fontSize: '15px' }}> {review?.review} </Typography>
                                            </Box>
                                        )
                                        :
                                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}> No Reviews </Typography>
                                }
                            </Box>
                        </Card>

                    </>
                    : <p>Loading...</p>
            }


        </>
    );
};

export default SingleProduct;