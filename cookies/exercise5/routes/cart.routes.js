import express from "express";
const router = express.Router();

/* ---------------- Dummy Login ---------------- */
router.get("/", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const { username } = req.body;

    // Fake login
    req.session.user = { username };

    // MIGRATION: move cookie cart → session cart
    const cookieCart = req.cookies.cart || [];

    req.session.cart = cookieCart;

    // Clear cookie cart
    res.clearCookie("cart");

    res.redirect("/cart");
});

/* ---------------- Add to Cart ---------------- */
router.post("/add-to-cart", (req, res) => {
    const item = req.body.item;

    if (req.session.user) {
        // Authenticated user → session cart
        if (!req.session.cart) req.session.cart = [];
        req.session.cart.push(item);
    } else {
        // Anonymous user → cookie cart
        let cart = req.cookies.cart || [];
        cart.push(item);

        res.cookie("cart", cart, { httpOnly: false });
    }

    res.redirect("/cart");
});

/* ---------------- View Cart ---------------- */
router.get("/cart", (req, res) => {
    let cart;

    if (req.session.user) {
        cart = req.session.cart || [];
    } else {
        cart = req.cookies.cart || [];
    }

    res.render("cart", {
        user: req.session.user,
        cart: cart
    });
});

/* ---------------- Logout ---------------- */
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

export default router;