import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderComplete = () => {
    const {state} = useLocation();
    const { shippingDetails } = state;
    const {name, email, phone, address, notes} = shippingDetails;
    return (
        <div>
            Order Placed Successfully
            Buyer Name: {name}
            Email: {email}
            phone: {phone}
            address: {address}
            {notes && <p> notes: {notes} </p>}
        </div>
    );
};

export default OrderComplete;