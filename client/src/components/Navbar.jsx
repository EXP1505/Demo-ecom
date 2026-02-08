import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { cart, toggleCart } = useContext(CartContext);
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <header>
            <nav className="navbar container">
                <div className="logo">E-Shop</div>
                <button className="cart-toggle-btn" onClick={toggleCart}>
                    Cart ({cartItemCount})
                </button>
            </nav>
        </header>
    );
};

export default Navbar;
