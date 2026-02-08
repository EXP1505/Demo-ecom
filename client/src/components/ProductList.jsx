import React, { useEffect, useState, useContext } from 'react';
import { fetchProducts } from '../api';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { data } = await fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error('Error loading products:', err);
            }
        };
        loadProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="price">₹{product.price}</p>
                            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
