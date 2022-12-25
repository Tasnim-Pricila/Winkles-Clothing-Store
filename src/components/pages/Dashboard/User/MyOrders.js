import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUsers from '../../../../Custom Hook/useUsers';
import { getOrdersByEmail } from '../../../../Redux/actions';
import { BorderColor, Cancel, Close, Delete, SearchOutlined } from '@mui/icons-material';
import { Box, Button, Card, Divider, Grid, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';

const MyOrders = () => {
    const orders = useSelector(state => state.orders.orders);
    const [user] = useUsers();
    const dispatch = useDispatch();
    console.log(user?.email);
    console.log(orders);

    useEffect(() => {
        dispatch(getOrdersByEmail(user?.email))
    }, [user, dispatch])

    return (
        <>
            <Box
                mb={4}>
                <Toolbar sx={{
                    boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: '#495057',
                    letterSpacing: '-0.5px'
                }}>
                    Order Details
                </Toolbar>
                <Box p={3}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                               
                                <Divider />
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}> # </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}> Order ID </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}> Customer </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}> Product </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}> Order Date </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}> Amount </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}> Payment Method </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}> Delivery Status  </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}> Action </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            orders?.map((order, index) =>
                                                <TableRow>
                                                    <TableCell> {index + 1} </TableCell>
                                                    <TableCell> {order._id} </TableCell>
                                                    <TableCell> {order.name} </TableCell>
                                                    <TableCell>  </TableCell>
                                                    <TableCell> {order.createdAt} </TableCell>
                                                    <TableCell>  </TableCell>
                                                    <TableCell>  </TableCell>
                                                    <TableCell>  </TableCell>
                                                    <TableCell>
                                                        <Button variant='outlined' size='small' sx={{ textTransform: 'capitalize' }} endIcon={<Cancel fontSize='small' />} >
                                                            Cancel Order
                                                        </Button>

                                                    </TableCell>
                                                </TableRow>
                                            )}


                                    </TableBody>
                                </Table>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default MyOrders;