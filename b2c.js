require('dotenv').config(); // Load environment variables from .env file
const axios = require('axios');
const moment = require('moment'); // Import moment for generating unique IDs

// Load credentials from environment variables
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE; // Replace with your actual shortcode
const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY; // Your consumer key
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET; // Your consumer secret
const MPESA_ENVIRONMENT = process.env.MPESA_ENVIRONMENT; // 'sandbox' or 'production'

// Function to generate the access token
async function getAccessToken() {
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
    const url = MPESA_ENVIRONMENT === 'sandbox'
        ? 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        : 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    
    const response = await axios.get(url, {
        headers: {
            Authorization: `Basic ${auth}`,
        }
    });

    return response.data.access_token;
}

// Function to initiate B2C payment
async function sendB2CPayment(token, phoneNumber, amount) {
    const url = MPESA_ENVIRONMENT === 'sandbox'
        ? 'https://sandbox.safaricom.co.ke/mpesa/b2c/v3/paymentrequest'
        : 'https://api.safaricom.co.ke/mpesa/b2c/v3/paymentrequest';
    
    const requestBody = {
        InitiatorName: MPESA_SHORTCODE,
        SecurityCredential: 'Your_Security_Credential_Here', // Replace with your actual security credential
        CommandID: 'BusinessPayment',
        Amount: amount,
        PartyA: MPESA_SHORTCODE,
        PartyB: phoneNumber,
        Remarks: 'Payment for services',
        QueueTimeOutURL: 'https://example.com/timeout',
        ResultURL: 'https://example.com/result',
        Occassion: 'Payment for service',
        OriginatorConversationID: `OC_${moment().format('YYYYMMDDHHmmss')}_${Math.floor(Math.random() * 10000)}` // Unique ID
    };

    const response = await axios.post(url, requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    return response.data;
}

// Main function
async function main() {
    try {
        const token = await getAccessToken();
        const response = await sendB2CPayment(token, '254796174723', 10); // Use your test number and amount
        console.log('B2C Payment Response:', response);
    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.data);
        } else if (error.request) {
            console.error('Error Request:', error.request);
        } else {
            console.error('General Error:', error.message);
        }
    }
}

main();
