import { Cancel } from '@mui/icons-material';
import { Button, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';

const OrderTable = ({order, index, handleOrder}) => {
    const status = order?.deliveryStatus === 'Shipped' && order?.paymentStatus === 'Paid' ?
        'Completed'
        :
        order?.orderStatus
    return (
        <>
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
                <TableCell>
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
                    <Button variant='contained' size='small' sx={{ textTransform: 'capitalize', fontSize: '10px' }} endIcon={<Cancel />}
                        disabled={order?.paymentStatus === 'Paid' || order?.orderStatus === 'Cancelled'}
                        onClick={() => handleOrder(order._id)}
                    > Cancel Order</Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default OrderTable;