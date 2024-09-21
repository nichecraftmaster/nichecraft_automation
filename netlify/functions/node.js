const paypal = require('@paypal/checkout-server-sdk');

exports.handler = async (event, context) => {
  // Replace these with your PayPal credentials
  let clientId = "YOUR_CLIENT_ID";
  let clientSecret = "YOUR_CLIENT_SECRET";

  // PayPal environment setup
  const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  const client = new paypal.core.PayPalHttpClient(environment);

  // Parse the request body to get email and price
  const { email, price, service } = JSON.parse(event.body);

  // Create a PayPal invoice request
  let request = new paypal.invoice.InvoiceCreateRequest();
  request.requestBody({
    "merchant_info": {
      "email": "your-paypal-email@example.com" // Your PayPal email
    },
    "billing_info": [{
      "email": email // Customer email passed from front-end
    }],
    "items": [{
      "name": service || "Service Name", // Service name passed from front-end
      "quantity": 1,
      "unit_price": {
        "currency": "USD",
        "value": price // Price passed from front-end
      }
    }],
    "note": "Thank you for your business!",
    "payment_term": {
      "term_type": "NET_30"
    }
  });

  try {
    // Execute the invoice creation request
    const response = await client.execute(request);
    return {
      statusCode: 200,
      body: JSON.stringify({ invoiceId: response.result.id }) // Return invoice ID to front-end
    };
  } catch (err) {
    // Handle any errors that occur during the PayPal API call
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
