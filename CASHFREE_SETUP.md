# Cashfree Payment Gateway Setup

## Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Cashfree Credentials (Server-side - keep these private)
CASHFREE_CLIENT_ID=your_production_client_id_here
CASHFREE_CLIENT_SECRET=your_production_client_secret_here

# App URL (for return URLs) - Use your production domain
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## How to Get Cashfree Credentials

1. Sign up for a Cashfree account at [https://www.cashfree.com](https://www.cashfree.com)
2. Go to your Cashfree Dashboard
3. Navigate to API Keys section
4. Copy your **Production** Client ID and Client Secret
5. **Important**: Use PRODUCTION credentials for live payments

## Installation

Install the Cashfree SDK:

```bash
npm install cashfree-pg
```

## Architecture

The integration uses a **server-side API approach**:

1. **Client Component** (`CashfreePayment.tsx`) - Handles UI and user interaction
2. **Server API Route** (`/api/payment/create-order`) - Creates orders using Cashfree SDK
3. **Payment Flow**:
   - User clicks "Upgrade Now"
   - Client calls server API to create order
   - Server creates order with Cashfree (Production)
   - Client redirects to Cashfree payment page
   - User completes payment on Cashfree
   - User returns to your site via return URL

## Testing

1. Use the `CashfreeTest` component to test the integration
2. Check browser console for detailed logs
3. Verify order creation in Cashfree dashboard
4. **Note**: This is now using PRODUCTION environment - real payments will be processed

## Features

- ✅ Server-side order creation (secure)
- ✅ Dynamic plan pricing
- ✅ Error handling and logging
- ✅ Loading states
- ✅ Test component for debugging
- ✅ Production-ready payment processing

## Payment Flow

1. **Order Creation**: Server creates order with Cashfree (Production)
2. **Payment Redirect**: User redirected to Cashfree payment page
3. **Payment Processing**: User completes payment on Cashfree
4. **Return**: User returns to your site via return URL
5. **Webhook**: Cashfree sends payment status to your webhook URL

## Webhook Setup

Create a webhook endpoint at `/api/payment/webhook` to handle payment notifications from Cashfree.

## Security Notes

- Keep `CASHFREE_CLIENT_ID` and `CASHFREE_CLIENT_SECRET` private (server-side only)
- Use environment variables for all sensitive data
- Validate webhook signatures from Cashfree
- Use HTTPS in production
- **Production Environment**: This is now configured for live payments 