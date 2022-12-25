import React, { useState } from 'react';
import { adjustQty, removeFromCart } from '../../../Redux/actions';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TableCell,  TableRow, } from '@mui/material';
import styled from '@emotion/styled';
import { Cancel } from '@mui/icons-material';

const CartItem = ({ cartItem }) => {
    let { _id, title, price, qty, quantity, image } = cartItem;
    const dispatch = useDispatch();
    const [purchaseQuantity, setQty] = useState(qty);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    }

    const increase = () => {
        setQty(parseInt(purchaseQuantity) + 1);
        // console.log(purchaseQuantity, quantity);
        const q = quantity - 1;
        if (purchaseQuantity === q) {
            console.log('no') //toast
        }
        dispatch(adjustQty(_id, purchaseQuantity + 1))
    }
    const decrease = () => {
        setQty(parseInt(purchaseQuantity) - 1);
        // console.log(purchaseQuantity, quantity);
        if (purchaseQuantity === 1) {
            dispatch(removeFromCart(_id))
        }
        dispatch(adjustQty(_id, purchaseQuantity - 1))
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
            <TableRow sx={{ p : 0 }}>
                <TableCell align="center" sx={{ p : 0 }}>
                    <Img alt="complex" src={image} />
                </TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', p: 0 }}>
                    {title}
                </TableCell>
                <TableCell align="center" sx={{ p : 0 }}>{quantity}</TableCell>


                {/* Quantity  */}
                <TableCell align="center" sx={{ p : 0 }}>
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


                <TableCell align="center" sx={{ p : 0 }}>{price}</TableCell>
                <TableCell align="center" sx={{ p : 0 }}>{qty * price}</TableCell>
                <TableCell align="center" sx={{ p : 0 }}>
                    <Button onClick={() => handleRemove(_id)}><Cancel/></Button>
                </TableCell>

            </TableRow>
        </>
    );
};

export default CartItem;