const stripe = require('stripe')(process.env.sk_test_51PwwklEovoaBMy97CKqxlF5Yvho8qYaGewgCDHpLAFGmjioSaKLi899x1eccZ5cH2T1NrUpejCOjWll9Y2heGSz500sevLAtvu);

export default async function handler(req, res) {
    console.log('Received request to create a checkout session');

    if (req.method === 'POST') {
        try {
            console.log('Creating Stripe session...');

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
                success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`, // Include .html in URL
                cancel_url: `${req.headers.origin}/cancel.html`, // Include .html in URL
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
