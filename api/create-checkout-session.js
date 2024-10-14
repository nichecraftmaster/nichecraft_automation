const stripe = require('stripe')(process.env.sk_test_51PwwklEovoaBMy97CKqxlF5Yvho8qYaGewgCDHpLAFGmjioSaKLi899x1eccZ5cH2T1NrUpejCOjWll9Y2heGSz500sevLAtvu); // Replace with your actual Stripe Secret Key

export default async function handler(req, res) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Service Payment',
                    },
                    unit_amount: 5000, // Amount in cents (5000 = $50)
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ id: session.id });
}
