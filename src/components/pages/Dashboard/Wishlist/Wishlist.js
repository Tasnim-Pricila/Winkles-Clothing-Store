import { Done, Loop } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../shared/Footer';
import WishlistItem from './WishlistItem';

const Wishlist = () => {

    // const navigate = useNavigate();
    const user = useSelector(state => state.allUsers.user)
    const wishlist = user?.wishlist?.product
    const [countWishlist, setCountWishlist] = useState(0);

    useEffect(() => {
        wishlist?.length > 0 && setCountWishlist(wishlist?.length)
    }, [wishlist, countWishlist])

    return (
        <>
            <Box sx={{
                position: 'relative',
                pb: 10,
                my: 6,
                px: 16
            }}>
                {
                    wishlist?.length !== 0 ?
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Image</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">In stock</TableCell>
                                        
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Unit Price</TableCell>
                                        
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Remove</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        wishlist?.map(w =>
                                            <WishlistItem key={w._id}
                                                wishlistItem={w}
                                            ></WishlistItem>
                                        )
                                    }
                                   
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <Typography variant='h4' sx={{ textAlign: 'center', mt: 4 }}> Nothing In Your Wishlist </Typography>
                }
            </Box>
            <Footer></Footer>
        </>
    );
};

export default Wishlist;