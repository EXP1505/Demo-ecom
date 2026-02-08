import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, isCartOpen, toggleCart } = useContext(CartContext);

    if (!isCartOpen) return null;

    const total = cart.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);

    return (
        <div className="cart-overlay">
            <div className="cart-modal">
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-btn" onClick={toggleCart}>&times;</button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            {cart.map((item) => (
                                item.productId && (
                                    <div key={item._id} className="cart-item">
                                        <div>
                                            <h4>{item.productId.name}</h4>
                                            <p>₹{item.productId.price} x {item.quantity}</p>
                                        </div>
                                        <div className="cart-item-actions">
                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                            <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
                                        </div>
                                    </div>
                                )
                            ))}

                        </>
                    )}
                </div>
                <div className="cart-footer">
                    <h3 className="total">Total: ₹{total.toFixed(2)}</h3>
                    {cart.length > 0 && <button className="checkout-btn">Checkout</button>}
                </div>
            </div>
        </div>
    );
};

export default Cart;
