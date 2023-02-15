import React, { useState } from 'react';
import { addToCart, adjustQty, getCart, getMe, removeFromCart } from '../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, TableCell, TableRow, } from '@mui/material';
import styled from '@emotion/styled';
import { Cancel } from '@mui/icons-material';
import Loading from '../Loading/Loading';

const CartItem = ({ cartItem }) => {
    const { _id, title, price, qty, quantity, image, discount } = cartItem;
    const dispatch = useDispatch();
    const [purchaseQuantity, setQty] = useState(qty);
    const user = useSelector(state => state.allUsers.user)
    const cart = user?.cart?.product;

    // console.log(cartItem);
    const discountAmount = discount && +price * +discount / 100
    const discountedPrice = discount && parseFloat(+price - discountAmount).toFixed(0);

    const handleRemove = (id) => {
        dispatch(getMe())
        const newCart = cart?.filter(c => c._id !== id)
        const cartData = {
            cart: {
                product: newCart
            },
        }
        dispatch(addToCart(user?._id, cartData));
        // dispatch(removeFromCart(id));
        dispatch(getMe())
    }

    const increase = () => {
        dispatch(getMe())
        setQty(parseInt(purchaseQuantity) + 1);
        const q = quantity - 1;
        if (purchaseQuantity === q) {
            console.log('no') //toast
        }
        const cartData = {
            ...cartItem, qty: purchaseQuantity + 1
        }
        dispatch(adjustQty(cartItem._id, _id, purchaseQuantity + 1, cartData))
        dispatch(getMe())
    }

    const decrease = () => {
        dispatch(getMe())
        setQty(parseInt(purchaseQuantity) - 1);
        if (purchaseQuantity === 1) {
            dispatch(removeFromCart(_id))
        }
        const cartData = {
            ...cartItem, qty: purchaseQuantity - 1
        }
        dispatch(adjustQty(cartItem._id, _id, purchaseQuantity - 1, cartData))
        dispatch(getMe())
    }
    // const singleTotal = price * parseInt(purchaseQuantity);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '80px',
        maxHeight: '80px',
        padding: '10px 0px'
    })

    


    return (
        <TableRow sx={{ p: 0 }}>
            <TableCell align="center" sx={{ p: 0 }}>
                <Img alt="complex" src={image} />
            </TableCell>
            <TableCell align="center" sx={{ textTransform: 'capitalize', p: 0 }}>
                {title}
            </TableCell>
            <TableCell align="center" sx={{ p: 0 }}>{quantity}</TableCell>


            {/* Quantity  */}
            <TableCell align="center" sx={{ p: 0 }}>
                <IconButton disabled={purchaseQuantity === quantity} onClick={increase}
                    sx={{ color: '#4b38b3' }} >
                    <AddIcon />
                </IconButton>
                <input type="number" value={purchaseQuantity} readOnly 
                style={{ width: '40px', textAlign: 'center', height: '25px' }}
                    onChange={(e) => setQty(e.target.value)}
                />
                <IconButton onClick={decrease} sx={{ color: '#4b38b3' }}>
                    <RemoveIcon />
                </IconButton>
            </TableCell>


            <TableCell align="center" sx={{ p: 0 }}>{discount ? discountedPrice : price}</TableCell>
            <TableCell align="center" sx={{ p: 0 }}>
                {discount ? qty * discountedPrice : qty * price}
                </TableCell>
            <TableCell align="center" sx={{ p: 0 }}>
                <Button onClick={() => handleRemove(_id)}><Cancel /></Button>
            </TableCell>

        </TableRow>
    );
};

export default CartItem;