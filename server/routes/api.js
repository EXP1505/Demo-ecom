const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// Seed Products (Helper for demo)
const seedProducts = async () => {
    const count = await Product.countDocuments();
    if (count === 0) {
        await Product.insertMany([
            { name: 'Laptop', price: 999, imageUrl: 'https://via.placeholder.com/150?text=Laptop' },
            { name: 'Headphones', price: 99, imageUrl: 'https://via.placeholder.com/150?text=Headphones' },
            { name: 'Mouse', price: 29, imageUrl: 'https://via.placeholder.com/150?text=Mouse' },
            { name: 'Keyboard', price: 59, imageUrl: 'https://via.placeholder.com/150?text=Keyboard' },
            { name: 'Monitor', price: 199, imageUrl: 'https://via.placeholder.com/150?text=Monitor' },
        ]);
        console.log('Products seeded');
    }
};

// GET /api/products
router.get('/products', async (req, res) => {
    try {
        await seedProducts(); // Ensure seeded on fetch for simplicity
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/cart
router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId');
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/cart (Add item)
router.post('/cart', async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ message: 'ProductId required' });

    try {
        let cartItem = await Cart.findOne({ productId });
        if (cartItem) {
            cartItem.quantity += (quantity || 1);
        } else {
            cartItem = new Cart({ productId, quantity: quantity || 1 });
        }
        await cartItem.save();

        // Return full cart to update frontend state easily, or just the item
        // Returning the populated item is usually better for UI update
        const populated = await cartItem.populate('productId');
        res.json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/cart/:id (Update quantity)
router.put('/cart/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        const cartItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true }
        ).populate('productId');
        res.json(cartItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/cart/:id (Remove item)
router.delete('/cart/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
