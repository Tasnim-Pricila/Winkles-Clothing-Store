import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, searchProducts } from '../../../Redux/actions';
import Banner from './Banner';
import Products from './Products';

const Home = ({ searchText, setSearchText }) => {

    const products = useSelector(state => state.allProducts.products)
    const searched = useSelector(state => state.allProducts.searchProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchText === '')
            dispatch(fetchProducts())
        else
            dispatch(searchProducts(searchText))
    }, [searchText, dispatch])

    return (
        <>
            <Banner></Banner>
            <div>
                <Products searchText={searchText} products={products} searched={searched} setSearchText={setSearchText} />
            </div>
        </>
    );
};

export default Home;