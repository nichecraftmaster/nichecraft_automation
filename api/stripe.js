const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('your-stripe-secret-key');  // Replace with your Stripe secret key
const router = express.Router();

// Fetch Products from Stripe
router.get('/products', async (req, res) => {
    try {
        const products = await stripe.products.list();
        res.json(products.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products from Stripe' });
    }
});

// Create Checkout Session for Payments
router.post('/create-checkout-session', async (req, res) => {
    const { priceId } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,  // Dynamic price ID from Stripe
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/success.html`,
            cancel_url: `${req.headers.origin}/cancel.html`,
        });

        res.json({ id: session.id });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create Stripe checkout session' });
    }
});

module.exports = router;
