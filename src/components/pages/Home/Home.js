import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../shared/Footer';
import Article from './Article';
import Banner from './Banner';
import Brand from './Brand';
import Categories from './Categories';
import Delivery from './Delivery';
import Products from './Products';
import Trending from './Trending';
import { fetchProducts } from '../../../Redux/actions/productActions';

const Home = () => {
    const products = useSelector(state => state.allProducts.allProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <>
            <Banner></Banner>
            <Categories></Categories>
            <Products products={products}/>
            <Trending products={products}/>
            <Delivery></Delivery>
            <Article></Article>
            <Brand></Brand>
            <Footer/>
        </>
    );
};

export default Home;