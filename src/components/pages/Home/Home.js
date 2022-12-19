import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../Redux/actions';
import Banner from './Banner';
import Categories from './Categories';
import Products from './Products';

const Home = () => {
    const products = useSelector(state => state.allProducts.products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <>
            <Banner></Banner>
            <Categories></Categories>
            <Products products={products} />
        </>
    );
};

export default Home;