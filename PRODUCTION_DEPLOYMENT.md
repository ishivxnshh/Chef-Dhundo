# Production Deployment Guide

## Environment Variables for Production

Create a `.env.local` file in your `web` directory with these production values:

```env
# Cashfree Production Credentials
CASHFREE_CLIENT_ID=your_actual_production_client_id
CASHFREE_CLIENT_SECRET=your_actual_production_client_secret

# Your Production App URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Deployment Checklist

### 1. Environment Variables
- [ ] Set `CASHFREE_CLIENT_ID` to your production Client ID
- [ ] Set `CASHFREE_CLIENT_SECRET` to your production Client Secret
- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain
- [ ] Ensure all environment variables are properly configured in your hosting platform

### 2. Cashfree Dashboard Setup
- [ ] Log into your Cashfree Dashboard
- [ ] Go to API Keys section
- [ ] Copy Production Client ID and Secret
- [ ] Configure webhook URL: `https://yourdomain.com/api/payment/webhook`
- [ ] Set return URL pattern: `https://yourdomain.com/payment/success`

### 3. Security Verification
- [ ] Verify HTTPS is enabled on your domain
- [ ] Ensure environment variables are not exposed in client-side code
- [ ] Test webhook signature verification (implement if needed)
- [ ] Verify payment success page is working

### 4. Testing
- [ ] Test payment flow with small amounts first
- [ ] Verify webhook notifications are received
- [ ] Test payment success and failure scenarios
- [ ] Verify order creation in Cashfree dashboard

## Important Notes

⚠️ **Production Environment**: This is now configured for live payments. Real money will be processed.

🔒 **Security**: Never commit your production credentials to version control.

🌐 **HTTPS Required**: Production payments require HTTPS.

📧 **Support**: Keep your Cashfree support contact handy for any issues.

## Monitoring

- Monitor payment success rates
- Check webhook delivery status
- Review order creation logs
- Monitor for any payment failures

## Troubleshooting

If you encounter issues:

1. Check Cashfree dashboard for order status
2. Verify webhook URL is accessible
3. Check server logs for API errors
4. Ensure environment variables are correctly set
5. Verify HTTPS is properly configured 