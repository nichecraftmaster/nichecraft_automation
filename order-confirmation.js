// Email API integration
const sendEmail = (orderDetails) => {
    // Replace this with your email API integration (SMTP, SendGrid, etc.)
    const emailData = {
        service_id: 'YOUR_SERVICE_ID', // Replace with your email service ID
        template_id: 'YOUR_TEMPLATE_ID', // Replace with your email template ID
        user_id: 'YOUR_USER_ID', // Replace with your user ID
        template_params: {
            'to_email': orderDetails.payer.email_address,
            'to_name': orderDetails.payer.name.given_name,
            'message': `Thank you for your purchase of Scholar GPT. Your order total was $${orderDetails.purchase_units[0].amount.value}.`,
        }
    };

    // Call to email API (e.g., EmailJS)
    emailjs.send(emailData.service_id, emailData.template_id, emailData.template_params, emailData.user_id)
        .then(() => {
            alert('Order confirmation email sent!');
        }).catch((error) => {
            console.error('Error sending email:', error);
        });
};

// Call the sendEmail function on successful PayPal transaction
const onApprove = (data, actions) => {
    return actions.order.capture().then(details => {
        alert('Transaction completed by ' + details.payer.name.given_name);
        sendEmail(details); // Trigger email notification
    });
};
