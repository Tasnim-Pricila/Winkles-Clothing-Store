import React, { useEffect, useState } from 'react';
import { adjustQty, fetchProduct, removeFromCart } from '../../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';

const CartItem = ({ cartItem }) => {
    const { _id, title, description, price, qty, image } = cartItem;
    const dispatch = useDispatch();
    const [quantity, setQty] = useState(qty);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    }
    const handleQty = (e) => {
        let input = parseInt(e.target.value);
        setQty(input);
        dispatch(adjustQty(_id, input));
    }
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    return (
        <Paper
            sx={{
                p: 4,
                margin: 'auto',
                mt: 10,
                maxWidth: 900,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={6}>
                <Grid item>
                    <ButtonBase sx={{ width: 200, height: 200 }}>
                        <Img alt="complex" src={image} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{
                                textAlign: 'justify',
                                mt: 2
                            }}>
                                {description}
                            </Typography>
                            Quantity: 
                            <input type="number" value={quantity} onChange=
                               {handleQty}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{mt:3}}>
                                ID: {_id}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button size="small" variant="contained" onClick={() => handleRemove(_id)}
                                sx={{
                                    mx: 'auto'
                                }}>
                                Remove
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" component="div">
                            ${price}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CartItem;