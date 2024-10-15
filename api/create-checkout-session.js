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
    success_url: `https://nichecraft-automation.vercel.app/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://nichecraft-automation.vercel.app/cancel.html`,
});
