🐱 M-Pesa B2C Payment Script - README 🐱

Meow! Here's a cat-friendly explanation of this M-Pesa B2C payment script:
� What This Script Does

This script helps businesses send money to customers via M-Pesa's B2C (Business to Customer) API. It:

    Gets an access token from Safaricom's API

    Sends money to a specified phone number

    Handles both sandbox (test) and production environments

🐟 Required Environment Variables

You need these in your .env file:

    MPESA_SHORTCODE - Your business shortcode

    MPESA_CONSUMER_KEY - API consumer key

    MPESA_CONSUMER_SECRET - API consumer secret

    MPESA_ENVIRONMENT - 'sandbox' or 'production'

🎣 How It Works

    getAccessToken() - Gets an OAuth token using your credentials

    sendB2CPayment() - Sends money with:

        Unique transaction ID

        Specified amount

        Customer phone number (format: 2547XXXXXX)

    main() - Runs the whole process and handles errors

🐾 Important Notes

    You need to replace 'Your_Security_Credential_Here' with your actual security credential

    Update the callback URLs (QueueTimeOutURL, ResultURL) to your actual endpoints

    The phone number 254796174723 is just an example - use real test numbers in sandbox

🐈 How to Run

    Install dependencies: npm install dotenv axios moment

    Create .env file with your credentials

    Run the script: node yourfilename.js

🐱‍👤 Error Handling

The script catches and displays different types of errors:

    API response errors

    Request errors

    General errors
---

🦈 Pull Shark hunt initiated by murugiclin.
