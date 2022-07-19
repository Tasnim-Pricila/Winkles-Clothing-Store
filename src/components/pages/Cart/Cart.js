import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const Cart = () => {
    const cart = useSelector(state => state.allProducts.cart);

    return (
        <div>
            {
                cart.length !== 0 ?
                    <div>
                        {
                            cart.map(c =>
                                <CartItem  key={c._id}
                                cartItem={c}></CartItem>
                            )
                        }
                    </div>

                    : <p> Loading... </p>

            }
        </div>
    );
};

export default Cart;