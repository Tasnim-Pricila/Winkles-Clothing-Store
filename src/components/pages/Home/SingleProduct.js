import React, { useEffect, useState } from 'react';
import { addToCart, addToWishlist, adjustQty, fetchProduct, fetchProducts, fetchReviewbyProductId, getMe, removeFromCart, removeSelectedProduct } from '../../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Divider, Rating, TextField } from '@mui/material';
import { CheckCircle, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Carousel } from 'react-responsive-carousel';
import "./carousel.min.css";
import Loading from '../Loading/Loading';
import RelatedProducts from './RelatedProducts';
import Reviews from './Reviews';
import { toast } from 'react-toastify';

const SingleProduct = () => {
    const { id } = useParams();
    const [avgRating, setAvgRating] = useState(0)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.allUsers.user)
    const state = useSelector(state => state.allProducts);
    const products = state.allProducts;
    let product = state.product;
    const getCart = user?.cart?.product?.find(cart => cart._id === id);
    const reviews = useSelector(state => state.reviews.review);
    const quantity = product?.quantity;
    const [purchaseQuantity, setQty] = useState(0);

    useEffect(() => {
        dispatch(fetchReviewbyProductId(id))
    }, [dispatch, id])

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

    // console.log(getCart?.qty, purchaseQuantity);
    useEffect(() => {
        if (getCart?.qty === undefined) {
            console.log('undefined');
            setQty(0);
        }
        else if (getCart) {
            setQty(getCart?.qty);
        }
    }, [getCart, setQty, purchaseQuantity])

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

    const increase = () => {
        dispatch(getMe())
        const selectedProduct = products?.find(p => p._id === id)
        const exists = newCart?.find(c => c._id === selectedProduct._id)
        if (!exists) {
            selectedProduct.qty = 1;
            newCart = [...newCart, selectedProduct];
            const cartData = {
                cart: {
                    product: newCart
                },
            }
            dispatch(addToCart(user._id, cartData));
        }
        else {
            setQty(parseInt(purchaseQuantity) + 1);
            const q = quantity - 1;
            if (purchaseQuantity === q) {
                // console.log('no') //toast
                toast.warning('Stock is empty', {
                    theme: 'colored',
                });
            }
            const cartData = {
                ...product, qty: purchaseQuantity + 1
            }
            dispatch(adjustQty(product._id, id, purchaseQuantity + 1, cartData))

        }
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

    const instock = {
        backgroundColor: ' #FF8E78',
        color: 'white',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
    }
    
    const outstock = {
        backgroundColor: '#aca3a178',
        color: '#201f1f70',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
    }

    const cart = {
        backgroundColor: '#FF8E78',
        color: 'white',
        padding: '5px 10px',
        borderRadius: 0,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#df6750',
        }
    }

    let allImg = [];
    const mainImg = [product?.image];
    const galleryImg = product?.imageGallery?.filter(image => image)

    if (mainImg && galleryImg) {
        allImg = [...mainImg, ...galleryImg]
    }
    const details = {
        padding: '5px 14px',
        borderRadius: 0,
        border: 1,
        borderColor: '#4b38b3',
        fontWeight: 600,
        color: '#4b38b3',
        '&:hover': {
            backgroundColor: '#4b38b3',
            color: 'white',
        }
    }

    let wishlist = user?.wishlist?.product;
    const handleWishlist = (id) => {
        if (user?.length !== 0) {
            dispatch(getMe())
            const exists = wishlist?.find(w => w === id)
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
    useEffect(() => {
        let sum = 0;
        reviews?.length > 0 &&
            reviews?.forEach(r =>
                sum = sum + r.rating
            )
        setAvgRating(sum / reviews?.length)
        // console.log(avgRating)

    }, [avgRating, reviews])

    const discount = +product.price * +product.discount / 100
    const discountedPrice = parseFloat(+product.price - discount).toFixed(0);

    return (
        <>
            {
                product?.length !== 0 ?
                    <>
                        <Grid container direction="row" columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            sx={{ px: { md: 16, xs: 4 }, mt: 10 }}>
                            <Grid item xs={12} md={4}>
                                <Carousel>
                                    {allImg &&
                                        allImg.map((image, i) => {
                                            return (
                                                <img src={image} alt={image} key={i}
                                                    style={{
                                                        objectFit: "fill",
                                                    }} />
                                            )
                                        })

                                    }
                                </Carousel>
                            </Grid>
                            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography gutterBottom variant="h4" sx={{ textTransform: 'capitalize', fontWeight: 'bold', color: 'black', mt: 2 }}>
                                    {product.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Rating name="read-only" size="medium" value={avgRating} precision={0.5} readOnly />
                                    <span style={{
                                        fontSize: '14px',
                                        display: 'inline-block',
                                        fontWeight: '600'
                                    }}> ({reviews.length} Ratings) </span>
                                </Box>

                                <Divider />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                                    {
                                        product?.discount ?
                                            <Box sx={{
                                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2
                                            }}>
                                                <Typography gutterBottom variant="h6" sx={{
                                                    py: 2, fontWeight: 'bold',
                                                    textDecoration: "line-through",
                                                    color: 'gray'
                                                }}>
                                                    Tk. {product.price}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" sx={{
                                                    py: 2, fontWeight: 'bold', color: '#df6750'
                                                }}>
                                                    Tk. {discountedPrice}
                                                </Typography>
                                            </Box>

                                            :
                                            <Typography gutterBottom variant="h6" sx={{
                                                py: 2, fontWeight: 'bold', color: '#df6750'
                                            }}>
                                                Tk. {product.price}
                                            </Typography>

                                    }
                                    <Typography variant="subtitle2"
                                        sx={product?.stock === 'In Stock' ? instock : outstock}
                                    >
                                        {
                                            product?.stock === 'In Stock' && <CheckCircle fontSize='small' sx={{ pr: 1 }} />
                                        }

                                        {product.stock}
                                    </Typography>
                                </Box>
                                <Divider />

                                <Typography variant="body2" sx={{ py: 2, fontWeight: 'bold', color: 'gray', textTransform: 'capitalize' }}>
                                    Brand: {product.brand}
                                </Typography>
                                <Divider />
                                <Typography sx={{
                                    mt: 1,
                                    display: 'inline-block',
                                    fontWeight: 600
                                }}>
                                    Description:
                                </Typography>
                                <Typography variant="body2" gutterBottom sx={{
                                    textAlign: 'justify',
                                }}
                                    dangerouslySetInnerHTML={{ __html: product.description }}>
                                </Typography>
                                <Divider />

                                <Box mt={3} sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
                                    <Button size="small" sx={details} startIcon={<FavoriteBorder />}
                                        onClick={() => handleWishlist(product._id)}>
                                        Add To Wishlist
                                    </Button>
                                    <Button size="small"
                                        sx={cart}
                                        onClick={() => handleAddToCart(product._id)}
                                        startIcon={<ShoppingCart />} >
                                        Add To Cart
                                    </Button>
                                </Box>
                                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: '10px' }}>

                                </Box>
                            </Grid>
                        </Grid>
                        <RelatedProducts product={product} />
                        <Reviews reviews={reviews} id={id} user={user} />
                    </>
                    :
                    <Loading></Loading>
            }


        </>
    );
};

export default SingleProduct;