import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Loading from '../Loading/Loading';
import { addToCart, addToWishlist, getMe, trendingProducts } from '../../../Redux/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FavoriteBorder, ShoppingCart } from '@mui/icons-material';
// import { useState } from 'react';
import { toast } from 'react-toastify';

const Trending = ({ products }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [avgRating, setAvgRating] = useState(0)
    const user = useSelector(state => state.allUsers.user)
    const trending = useSelector(state => state.allProducts.trending);

    useEffect(() => {
        dispatch(trendingProducts())
    }, [dispatch])

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch])

    let newCart = user?.cart?.product;
    const handleAddToCart = (id) => {
        if (user?.length !== 0) {
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
        else {
            navigate('/login')
        }
    }

    let wishlist = user?.wishlist?.product;
    const handleWishlist = (id) => {
        if (user?.length !== 0) {
            dispatch(getMe())
            const exists = wishlist?.find(w => w._id === id)
            if (!exists) {
                wishlist = [...wishlist, id];
            }
            else {
                toast.warning('Already in your Wishlist ', {
                    theme: 'colored',
                });
            }
            const wishlistData = {
                wishlist: {
                    product: wishlist
                },
            }
            dispatch(addToWishlist(user._id, wishlistData));
            dispatch(getMe())
        }
        else {
            navigate('/login')
        }
    }

    const cart = {
        backgroundColor: '#FF8E78',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
        border: 0,
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#df6750',
            color: 'white',
            border: 0
        }
    }

    const details = {
        padding: '5px 14px',
        borderRadius: 0,
        border: 1,
        borderColor: '#4b38b3',
        fontWeight: 600,
        textTransform: 'capitalize',
        color: '#4b38b3',
        '&:hover': {
            backgroundColor: '#4b38b3',
            color: 'white',
        }
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        arrows: false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
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
        <Box sx={{ mx: { md: 16, xs: 4 }, mb: 10 }}>
            <Typography sx={{ textAlign: 'center', pb: 10, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', fontSize: '26px' }}>
                Trending Now
            </Typography>
            <Slider {...settings} >
                {
                    trending?.length > 0 ?
                        trending?.map((product, i) =>
                            <Box className='slick-list'>
                                <Box onClick={() => navigate(`/product/${product._id}`)}
                                    sx={{
                                        backgroundImage: `url(${product?.image})`,
                                        backgroundSize: 'cover',
                                        height: '60vh',
                                        backgroundRepeat: 'no-repeat',
                                        cursor: 'pointer',
                                        backgroundPosition: 'center'
                                    }}
                                />
                                <Box sx={{ pt: 2 }}>
                                    <Typography gutterBottom variant="h6"
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        sx={{ textAlign: 'center', textTransform: 'capitalize', cursor: 'pointer' }}>
                                        {

                                            product.title.length > 20 ? `${product.title.slice(0, 20)}...`
                                                : product.title
                                        }
                                    </Typography>


                                    {/* <Rating name="read-only"
                                        size="medium"
                                        value={avgRating}
                                        precision={0.5}
                                        readOnly
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    /> */}
                                    {
                                        product?.discount ?
                                            <Box sx={{
                                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2
                                            }}>
                                                <Typography gutterBottom variant="h6" sx={{
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    pt: 1,
                                                    textDecoration: "line-through",
                                                    color: 'gray'
                                                }}>
                                                    Tk. {product.price}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" sx={{
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    pt: 1,
                                                }}>
                                                    Tk. {+product.price - ((+product.price * +product.discount) / 100)}
                                                </Typography>
                                            </Box>

                                            :
                                            <Typography gutterBottom variant="h6" sx={{
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                pt: 1,
                                            }}>
                                                Tk. {product.price}
                                            </Typography>
                                    }
                                </Box>

                                <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                                    <Button size="small"
                                        onClick={() => handleWishlist(product._id)}
                                        sx={details}
                                        startIcon={<FavoriteBorder />} >
                                        Add To Wishlist
                                    </Button>
                                    <Button size="small" variant="outlined"
                                        sx={cart}
                                        onClick={() => handleAddToCart(product._id)}
                                        startIcon={<ShoppingCart />}
                                    >
                                        Add To Cart</Button>
                                </Box>
                            </Box>
                        )
                        :
                        <Loading />
                }
            </Slider>
        </Box>
    );
};

export default Trending;