import { SearchOutlined } from '@mui/icons-material';
import { Box, Button, Card, Divider, Grid, InputAdornment, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Toolbar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, orderByFilter, updateorder } from '../../../../Redux/actions';
import OrdersTable from './OrdersTable';

const AllOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.allOrder)
    // const { data, isLoading, refetch } = useQuery({
    //     queryKey: ['orders'],
    //     queryFn: () =>
    //         fetch(`https://winkles-server.onrender.com/orders`)
    //             .then(res => res.json())

    // })

    // if (isLoading) {
    //     console.log('Loading...');
    // }
    useEffect(() => {
        dispatch(getAllOrders())
    },[dispatch])

    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleAllOrders = () => {
        dispatch(getAllOrders())
    }
    const handlePaid = () => {
        dispatch(orderByFilter("/orders?paymentStatus=Paid"))
    }
    const handlePending = () => {
        dispatch(orderByFilter("/orders?paymentStatus=Pending"))
    }
    const addBtn = {
        color: 'white',
        backgroundColor: '#45CB85',
        padding: '5px 10px',
        textTransform: 'capitalize',
        boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
        '&:hover': {
            backgroundColor: '#3bad71',
        }
    }
    const handleDelivery = (id) => {
        // refetch();
        dispatch(updateorder(id, {
            deliveryStatus: 'Shipped'
        }))
        // refetch();
    }

    const handlePayment = (id) => {
        // refetch();
        dispatch(updateorder(id, {
            paymentStatus: 'Paid'
        }))
        // refetch();
    }

    return (
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                                <Button variant='contained' sx={addBtn}> + Create Order </Button>
                                <TextField
                                    id="standard-search"
                                    type="search"
                                    placeholder='Search Orders...'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '.css-1xp6qmi-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '14px'
                                        }
                                    }}
                                />
                            </Box>
                            <Divider />

                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="secondary tabs example"
                            >
                                <Tab value="one" label="All Orders" onClick={handleAllOrders} />
                                <Tab value="two" label="Paid" onClick={handlePaid} />
                                <Tab value="three" label="Pending" onClick={handlePending} />
                            </Tabs>

                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead sx={{ bgcolor: '#f3f6f9' }}>
                                        <TableRow sx={{
                                            '.MuiTableCell-root': {
                                                color: '#878a99',
                                                fontWeight: 'bold'
                                            }
                                        }}>
                                            <TableCell> # </TableCell>
                                            <TableCell> Order ID </TableCell>
                                            <TableCell> Customer </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', minWidth: '150px' }}> Product </TableCell>
                                            <TableCell> Order Date </TableCell>
                                            <TableCell> Amount </TableCell>
                                            <TableCell> Payment Method </TableCell>
                                            <TableCell> Payment Status </TableCell>
                                            <TableCell> Delivery Status  </TableCell>
                                            <TableCell> Order Status  </TableCell>
                                            <TableCell> Action </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ fontSize: '12px' }}>
                                        {
                                            orders.map((order, index) =>
                                                <OrdersTable order={order} index={index}
                                                    handleDelivery={handleDelivery} handlePayment={handlePayment}
                                                ></OrdersTable>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AllOrders;