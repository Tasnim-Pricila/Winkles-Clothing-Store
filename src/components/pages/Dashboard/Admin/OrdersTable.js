import { Box, Button, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';

const OrdersTable = ({ order, index, handlePayment, handleDelivery, handleDelete, paid }) => {

    const status = order?.deliveryStatus === 'Shipped' && order?.paymentStatus === 'Paid' ?
        'Completed'
        :
        order?.orderStatus

    return (
        <TableRow>
            <TableCell> {index + 1} </TableCell>
            <TableCell> {order._id} </TableCell>
            <TableCell> {order.name} </TableCell>
            <TableCell>
                {order?.products?.map(product =>
                    <Typography sx={{ textTransform: 'capitalize', fontSize: '12px' }}> {product.title}</Typography>
                )}
            </TableCell>
            <TableCell> {order.createdAt} </TableCell>
            <TableCell> {order.amount} </TableCell>
            <TableCell> {order.paymentMethod} </TableCell>
            <TableCell>
                <Typography sx={{
                    color: order?.paymentStatus === 'Paid' ? '#45cb85' : '#3577f1',
                    bgcolor: order?.paymentStatus === 'Paid' ? 'rgba(69,203,133,.23)' : 'rgba(53,119,241,.23)',
                    textTransform: 'uppercase',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    padding: '5px 4px',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    {order?.paymentStatus}
                </Typography>

            </TableCell>
            <TableCell >
                <Typography sx={{
                    color: order?.deliveryStatus === 'Shipped' ? '#45cb85' : order?.deliveryStatus === 'Pending' ? '#3577f1' : '#f06548',
                    bgcolor: order?.deliveryStatus === 'Shipped' ? 'rgba(69,203,133,.23)' : order?.deliveryStatus === 'Pending' ? 'rgba(53,119,241,.23)' : 'rgba(240,101,72,.23)',
                    textTransform: 'uppercase',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    padding: '5px 4px',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    {order?.deliveryStatus}
                </Typography>
                {
                    order?.deliveryStatus !== 'Shipped' &&
                    <Button variant='contained'
                        disabled={order?.deliveryStatus === 'Shipped'} size='small'
                        sx={{ textTransform: 'capitalize', fontSize: '10px', mt: 1 }}
                        onClick={() => handleDelivery(order?._id)}>
                        Mark as Shipped
                    </Button>
                }
            </TableCell>
            <TableCell>
                <Typography sx={{
                    color: status === 'Completed' ? '#45cb85' : status === 'Pending' ? '#3577f1' : '#f06548',
                    bgcolor: status === 'Completed' ? 'rgba(69,203,133,.23)' : status === 'Pending' ? 'rgba(53,119,241,.23)' : 'rgba(240,101,72,.23)',
                    textTransform: 'uppercase',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    padding: '5px 4px',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    {status}
                </Typography>

            </TableCell>
            <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Button variant='contained' size='small' sx={{ textTransform: 'capitalize', fontSize: '10px' }}
                        disabled={order?.paymentStatus === 'Paid'}
                        onClick={() => handlePayment(order?._id)}
                    > Mark as Paid </Button>
                    <Button variant='contained'
                        disabled={order?.paymentStatus === 'Paid'} size='small' sx={{ textTransform: 'capitalize', fontSize: '10px' }} onClick={() => handleDelete(order._id)}> Delete </Button>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default OrdersTable;