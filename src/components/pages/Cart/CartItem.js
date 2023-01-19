import React, { useState } from 'react';
import { adjustQty, removeFromCart } from '../../../Redux/actions';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TableCell, TableRow, } from '@mui/material';
import styled from '@emotion/styled';
import { Cancel } from '@mui/icons-material';
import useUsers from '../../../Custom Hook/useUsers';

const CartItem = ({ cartItem }) => {
    let { _id, title, price, qty, quantity, image } = cartItem;
    const dispatch = useDispatch();
    const [purchaseQuantity, setQty] = useState(qty);
    // const user = useUsers();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    }

    const increase = () => {
        setQty(parseInt(purchaseQuantity) + 1);
        const q = quantity - 1;
        if (purchaseQuantity === q) {
            console.log('no') //toast
        }
        const cartData = {
            ...cartItem, qty: purchaseQuantity + 1
        }
        dispatch(adjustQty(cartItem._id, _id, purchaseQuantity + 1, cartData))
    }

    const decrease = () => {
        setQty(parseInt(purchaseQuantity) - 1);
        if (purchaseQuantity === 1) {
            dispatch(removeFromCart(_id))
        }
        const cartData = {
            ...cartItem, qty: purchaseQuantity - 1
        }
        dispatch(adjustQty( cartItem._id, _id, purchaseQuantity - 1, cartData))
    }
    // const singleTotal = price * parseInt(purchaseQuantity);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '80px',
        maxHeight: '80px',
        padding: '10px 0px'
    });
    return (
        <>
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
                    <Button disabled={purchaseQuantity === quantity} onClick={increase}>
                        <AddIcon />
                    </Button>
                    <input type="number" value={purchaseQuantity} readOnly style={{ width: '40px', textAlign: 'center' }}
                        onChange={(e) => setQty(e.target.value)}
                    />
                    <Button onClick={decrease}>
                        <RemoveIcon />
                    </Button>
                </TableCell>


                <TableCell align="center" sx={{ p: 0 }}>{price}</TableCell>
                <TableCell align="center" sx={{ p: 0 }}>{qty * price}</TableCell>
                <TableCell align="center" sx={{ p: 0 }}>
                    <Button onClick={() => handleRemove(_id)}><Cancel /></Button>
                </TableCell>

            </TableRow>
        </>
    );
};

export default CartItem;