const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    console.log('Received request to create a checkout session');

    if (req.method === 'POST') {
        try {
            console.log('Creating Stripe session...');

            const origin = req.headers.origin || 'https://nichecraft-automation.vercel.app'; // Fallback to your main domain

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Service Payment',
                            },
                            unit_amount: 5000, // Amount in cents ($50)
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`, // Dynamic origin
                cancel_url: `${origin}/cancel.html`, // Dynamic origin
            });

            console.log('Session created successfully:', session.id);

            // Send the session ID to the client
            res.status(200).json({ id: session.id });
        } catch (err) {
            console.error('Error creating Stripe session:', err.message);
            res.status(500).json({ error: 'Failed to create session', details: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
