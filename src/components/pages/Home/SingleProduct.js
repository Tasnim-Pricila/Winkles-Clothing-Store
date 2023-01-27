import React, { useEffect, useState } from 'react';
import { addToCart, adjustQty, fetchProduct, fetchProducts, fetchReviewbyProductId, getMe, removeFromCart, removeSelectedProduct, searchByFilter } from '../../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Divider, Rating, TextField } from '@mui/material';
import { CheckCircle, ShoppingCart } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Carousel } from 'react-responsive-carousel';
import "./carousel.min.css";
import RatingModal from './RatingModal';
import Loading from '../Loading/Loading';
import Slider from 'react-slick';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const state = useSelector(state => state.allProducts);
    const products = state.allProducts;
    let product = state.product;
    const quantity = product?.quantity;
    const reviews = useSelector(state => state.reviews.review);
    const user = useSelector(state => state.allUsers.user)
    const getCart = state.cart?.find(cart => cart._id === id);
    const categoryWiseProducts = state.products;
    const [purchaseQuantity, setQty] = useState('');

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
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (getCart?.qty === undefined) {
            setQty(0);
        }
        else if (getCart) {
            setQty(getCart?.qty);
        }
    }, [getCart, setQty, purchaseQuantity])

    useEffect(() => {
        dispatch(fetchReviewbyProductId(id))
    }, [dispatch, id])

    useEffect(() => {
        const url = `/products?category=${product.category}`
        dispatch(searchByFilter(url))
    }, [dispatch, product?.category])

    const increase = () => {
        dispatch(getMe())
        setQty(parseInt(purchaseQuantity) + 1);
        const q = quantity - 1;
        if (purchaseQuantity === q) {
            console.log('no') //toast
        }
        const cartData = {
            ...product, qty: purchaseQuantity + 1
        }
        dispatch(adjustQty(product._id, id, purchaseQuantity + 1, cartData))
        dispatch(getMe())
    }

    const decrease = () => {
        dispatch(getMe())
        setQty(parseInt(purchaseQuantity) - 1);
        console.log(purchaseQuantity)
        if (purchaseQuantity === 1) {
            dispatch(removeFromCart(id))
        }
        const cartData = {
            ...product, qty: purchaseQuantity - 1
        }
        dispatch(adjustQty(product._id, id, purchaseQuantity - 1, cartData))
        dispatch(getMe())
    }

    let newCart = user?.cart?.product;

    const handleAddToCart = (id) => {
        dispatch(getMe())
        const selectedProduct = products?.find(p => p._id === id)
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
        const cartData = {
            cart: {
                product: newCart
            },
        }
        dispatch(addToCart(user._id, cartData, id));
        dispatch(getMe())
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
    console.log(categoryWiseProducts)

    let allImg = [];
    const mainImg = [product?.image];
    const galleryImg = product?.imageGallery?.filter(image => image)
    if (mainImg && galleryImg) {
        allImg = [...mainImg, ...galleryImg]
    }
  
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <>
            {
                product?.length !== 0 ?
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


                        {/* Related Products  */}

                        <Box mx={16} py={6} mb={8}>
                            <Typography variant='h5' sx={{ textAlign: 'center', py: 10, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                                Related Products
                            </Typography>

                            <Slider {...settings} >
                                {
                                    categoryWiseProducts?.result?.length > 0 ?
                                    categoryWiseProducts?.result?.map((product, i) =>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '20px',
                                            gap: '200px',
                                            flexDirection: 'column'
                                        }}>
                                            <Box>
                                                <Box
                                                    sx={{
                                                        backgroundImage: `url(${product?.image})`,
                                                        backgroundSize: 'cover',
                                                        height: '60vh',
                                                        backgroundRepeat: 'no-repeat',
                                                        // backgroundPosition: 'top',
                                                    }}
                                                />
                                                <Box sx={{ pt: 2, px: 1 }}>
                                                    <Typography gutterBottom variant="h6"
                                                        sx={{
                                                            // textAlign: 'center',
                                                            textTransform: 'capitalize',
                                                            fontWeight: 'bold' ,
                                                            mb: 0
                                                            // height: '80px'
                                                        }}>
                                                        {
                                                            product.title.length > 20 ? `${product.title.slice(0, 20)}...`
                                                                : product.title
                                                        }
                                                    </Typography>
                                                    <Typography 
                                                    sx={{ 
                                                        fontSize: '16px'
                                                        // textAlign: 'center', 
                                                        // fontWeight: 'bold' 
                                                    }}>
                                                        Tk. {product.price}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </div>
                                    )
                                    :
                                    <Loading/>
                                }
                            </Slider>

                        </Box>

                        {/* Review Section  */}
                        <Card variant="outlined" sx={{ p: 4, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', mx: 16 }}>
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

                    :

                    <Loading></Loading>
            }


        </>
    );
};

export default SingleProduct;