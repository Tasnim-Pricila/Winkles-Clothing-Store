import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../../Redux/actions';

const ManageProducts = () => {
    const products = useSelector( state => state.allProducts.products );
    // const [user] = useUsers();
    const dispatch = useDispatch();
    // console.log(user?.email);
    // console.log(products);

    useEffect( () => {
        dispatch(fetchProducts())
    }, [dispatch])
    return (
        <div>
            
        </div>
    );
};

export default ManageProducts;