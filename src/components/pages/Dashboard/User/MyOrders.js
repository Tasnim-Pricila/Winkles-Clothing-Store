import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUsers from '../../../../Custom Hook/useUsers';
import { getOrdersByEmail } from '../../../../Redux/actions';

const MyOrders = () => {
    const orders = useSelector( state => state.orders.orders );
    const [user] = useUsers();
    const dispatch = useDispatch();
    console.log(user?.email);
    console.log(orders);

    useEffect( () => {
        dispatch(getOrdersByEmail(user?.email))
    }, [user, dispatch])

    return (
        <>
            
        </>
    );
};

export default MyOrders;