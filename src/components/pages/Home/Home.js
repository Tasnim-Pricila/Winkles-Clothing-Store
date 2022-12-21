import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../Redux/actions';
import Article from './Article';
import Banner from './Banner';
import Brand from './Brand';
import Categories from './Categories';
import Delivery from './Delivery';
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
            <Delivery></Delivery>
            <Article></Article>
            <Brand></Brand>
        </>
    );
};

export default Home;