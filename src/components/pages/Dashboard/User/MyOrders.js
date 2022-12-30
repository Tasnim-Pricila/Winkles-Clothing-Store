import React from 'react';
import { useDispatch } from 'react-redux';
import useUsers from '../../../../Custom Hook/useUsers';
import { updateorder } from '../../../../Redux/actions';
import { Box, Card, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import OrderTable from './OrderTable';

const MyOrders = () => {
    const [user] = useUsers();
    const dispatch = useDispatch();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: () =>
            fetch(`https://winkles-server.onrender.com/orders/${user?.email}`)
                .then(res => res.json())

    })
    if (isLoading) {
        console.log('Loading...');
    }
    // console.log(data?.data);

    const handleOrder = (id) => {
        refetch();
        dispatch(updateorder(id, {
            orderStatus: 'Cancelled'
        }))
        refetch();
    }

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
                    My Orders
                </Toolbar>
                <Box p={3}>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                                <Divider />
                                <TableContainer>
                                    <Table aria-label="simple table">
                                        <TableHead sx={{ bgcolor: '#f3f6f9' }}>
                                            <TableRow
                                                sx={{
                                                    '.MuiTableCell-root': {
                                                        color: '#878a99',
                                                        fontWeight: 'bold'
                                                    }
                                                }}>
                                                <TableCell> # </TableCell>
                                                <TableCell> Order ID </TableCell>
                                                <TableCell> Customer </TableCell>
                                                <TableCell> Product </TableCell>
                                                <TableCell> Order Date </TableCell>
                                                <TableCell> Amount </TableCell>
                                                <TableCell> Payment Method </TableCell>
                                                <TableCell> Payment Status </TableCell>
                                                <TableCell> Delivery Status  </TableCell>
                                                <TableCell> Order Status  </TableCell>
                                                <TableCell> Action </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{
                                            '.MuiTableCell-body': {
                                                color: '#212529'
                                            }
                                        }}>
                                            {
                                                data?.data?.map((order, index) =>
                                                    <OrderTable
                                                        order={order} index={index} handleOrder={handleOrder}
                                                    ></OrderTable>
                                                )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default MyOrders;