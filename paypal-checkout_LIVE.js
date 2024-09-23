// Load PayPal's script
const loadPayPalScript = () => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AcJ7K8bfB95kTE6Fb2ZY5SqQbOp1tokCc5zKB1FucVnzVIjSvuTxs4FIECXBBhALixQWIXVEd2qRm4gp&currency=USD';
    script.onload = () => renderPayPalButtons();
    document.head.appendChild(script);
};

// Render PayPal buttons
const renderPayPalButtons = () => {
    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '50.00' // Replace with the price of Scholar GPT
                    }
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
                alert('Transaction completed by ' + details.payer.name.given_name);
                // Add any additional actions here, like saving order info
            });
        }
    }).render('#paypal-button-container');
};

// Initialize the PayPal button loading on page load
window.onload = loadPayPalScript;
