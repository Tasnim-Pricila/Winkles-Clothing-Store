import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../../../Redux/actions';

const AllOrders = () => {
    const orders = useSelector( state => state.orders.allOrder );
    // const [user] = useUsers();
    const dispatch = useDispatch();
    // console.log(user?.email);
    console.log(orders);

    useEffect( () => {
        dispatch(getAllOrders())
    }, [dispatch])
    
    return (
        <div>
            
        </div>
    );
};

export default AllOrders;