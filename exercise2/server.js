const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

// Session setup
app.use(session({
    secret: 'cart-secret',
    resave: false,
    saveUninitialized: false
}));

// Initialize cart middleware
const initCart = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = []; // cart = array of items
    }
    next();
};

// Use middleware for all cart routes
app.use('/cart', initCart);

// Add item to cart
app.post('/cart/add', (req, res) => {
    const { productId, name, price, quantity } = req.body;

    if (!productId || !name || !price || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const cart = req.session.cart;

    // Check if item already exists
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, name, price, quantity });
    }

    res.json({ message: "Item added to cart", cart });
});

// Update item quantity
app.put('/cart/update/:productId', (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = req.session.cart;

    const item = cart.find(item => item.productId === productId);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;

    res.json({ message: "Quantity updated", cart });
});

// Remove item
app.delete('/cart/remove/:productId', (req, res) => {
    const { productId } = req.params;

    let cart = req.session.cart;

    const newCart = cart.filter(item => item.productId !== productId);

    req.session.cart = newCart;

    res.json({ message: "Item removed", cart: newCart });
});

// Get cart + total price
app.get('/cart', (req, res) => {
    const cart = req.session.cart;

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    res.json({
        cart,
        totalPrice: total
    });
});

// Clear cart
app.delete('/cart/clear', (req, res) => {
    req.session.cart = [];
    res.json({ message: "Cart cleared" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});