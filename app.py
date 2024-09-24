from flask import Flask, request
import smtplib
import requests
from email.mime.text import MIMEText

app = Flask(__name__)

# PayPal IPN listener route
@app.route('/paypal/ipn', methods=['POST'])
def paypal_ipn():
    # Step 1: Verify PayPal IPN message
    verify_url = 'https://ipnpb.paypal.com/cgi-bin/webscr'
    verify_params = {'cmd': '_notify-validate'}
    verify_params.update(request.form)

    # Verify the message with PayPal
    response = requests.post(verify_url, data=verify_params)
    
    if response.text == 'VERIFIED':
        # Step 2: Extract customer details from PayPal IPN
        customer_email = request.form.get('payer_email')
        customer_name = request.form.get('first_name') + " " + request.form.get('last_name')
        order_details = request.form.get('item_name') + " - Quantity: " + request.form.get('quantity')
        amount = request.form.get('mc_gross')

        # Step 3: Send confirmation email
        send_confirmation_email(customer_name, customer_email, order_details, amount)
        
        return "IPN Processed", 200
    else:
        return "IPN Failed Verification", 400

def send_confirmation_email(customer_name, customer_email, order_details, amount):
    # Replace these details with your SMTP configuration
    smtp_host = 'smtp.example.com'  # Your SMTP host
    smtp_port = 587  # Your SMTP port (usually 587 for TLS)
    smtp_user = 'your-email@example.com'  # Your SMTP username
    smtp_password = 'your-email-password'  # Your SMTP password

    # Create the email content
    subject = "Order Confirmation"
    body = f"Dear {customer_name},\n\nThank you for your order!\n\nOrder Details:\n{order_details}\nTotal Amount: ${amount}\n\nBest regards,\nYour Company"
    
    msg = MIMEText(body)
    msg['From'] = smtp_user
    msg['To'] = customer_email
    msg['Subject'] = subject

    # Send the email
    try:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()  # Start TLS encryption
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, customer_email, msg.as_string())
        server.quit()
        print(f"Confirmation email sent to {customer_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")

if __name__ == "__main__":
    app.run(debug=True)
