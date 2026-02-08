import { createContext, useState, useEffect } from 'react';
import { fetchCart, addToCart as apiAddToCart, removeCartItem as apiRemoveFromCart, updateCartItem } from '../api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const refreshCart = async () => {
        try {
            const { data } = await fetchCart();
            setCart(data);
        } catch (err) {
            console.error('Error fetching cart:', err);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    const addToCart = async (productId) => {
        try {
            await apiAddToCart(productId, 1);
            await refreshCart();
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    const removeFromCart = async (id) => {
        try {
            await apiRemoveFromCart(id);
            await refreshCart();
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };

    const updateQuantity = async (id, quantity) => {
        try {
            if (quantity < 1) return;
            await updateCartItem(id, quantity);
            await refreshCart();
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    }

    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isCartOpen, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};
