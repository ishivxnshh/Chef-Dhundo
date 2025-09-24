import { NextRequest, NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

export async function POST(request: NextRequest) {
  try {
    const { amount, planName, planId } = await request.json();

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid amount. Amount must be at least ₹1.' 
        },
        { status: 400 }
      );
    }

    // Debug: Check if environment variables are set
    const clientId = process.env.CASHFREE_CLIENT_ID;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    console.log('=== CASHFREE DEBUG ===');
    console.log('Client ID exists:', !!clientId);
    console.log('Client Secret exists:', !!clientSecret);
    console.log('App URL:', appUrl);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('All env vars with APP_URL:', Object.keys(process.env).filter(key => key.includes('APP_URL')));
    
    // Debug credential details (without exposing full secrets)
    if (clientId) {
      console.log('Client ID starts with:', clientId.substring(0, 8) + '...');
      console.log('Client ID length:', clientId.length);
    }
    if (clientSecret) {
      console.log('Client Secret starts with:', clientSecret.substring(0, 8) + '...');
      console.log('Client Secret length:', clientSecret.length);
    }

    if (!clientId || !clientSecret) {
      throw new Error('Cashfree credentials not found. Please set CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET environment variables.');
    }

    // Temporarily disable URL validation and use a fallback
    let finalAppUrl = appUrl;
    if (!appUrl || appUrl.includes('cashfree.com') || appUrl.includes('api.cashfree.com')) {
      console.warn('⚠️ Invalid App URL detected, using fallback:', appUrl);
      // Check if we're on Vercel or production
      if (process.env.VERCEL_URL) {
        finalAppUrl = `https://${process.env.VERCEL_URL}`;
        console.log('✅ Using Vercel URL:', finalAppUrl);
      } else {
        finalAppUrl = 'https://chefdhundo.vercel.app/';
        console.log('✅ Using fallback URL:', finalAppUrl);
      }
    }

    // Initialize Cashfree with your credentials
    // Check if credentials look like test credentials (usually start with 'TEST_' or 'cfsk_test_)
    const isTestCredentials = clientId?.startsWith('TEST_') || clientSecret?.startsWith('cfsk_test_');
    const environment = isTestCredentials ? CFEnvironment.SANDBOX : CFEnvironment.PRODUCTION;
    
    console.log('Using environment:', isTestCredentials ? 'SANDBOX' : 'PRODUCTION');
    console.log('Reason:', isTestCredentials ? 'Credentials start with TEST_ or cfsk_test_' : 'Production credentials detected');
    
    // Check for credential mismatch
    if (clientId?.startsWith('TEST_') && !clientSecret?.startsWith('cfsk_test_')) {
      console.error('❌ CREDENTIAL MISMATCH: Client ID is TEST but Client Secret is PRODUCTION');
      console.error('Fix: Get both TEST credentials or both PRODUCTION credentials from Cashfree Dashboard');
    }
    if (!clientId?.startsWith('TEST_') && clientSecret?.startsWith('cfsk_test_')) {
      console.error('❌ CREDENTIAL MISMATCH: Client Secret is TEST but Client ID is PRODUCTION');
      console.error('Fix: Get both TEST credentials or both PRODUCTION credentials from Cashfree Dashboard');
    }
    
    // CRITICAL: Check if using production credentials with HTTP URLs (only for localhost)
    console.log('🔍 URL Validation Check:');
    console.log('  - finalAppUrl:', finalAppUrl);
    console.log('  - isTestCredentials:', isTestCredentials);
    console.log('  - includes localhost:', finalAppUrl?.includes('localhost'));
    console.log('  - starts with http://', finalAppUrl?.startsWith('http://'));
    console.log('  - VERCEL_URL env var:', process.env.VERCEL_URL);
    
    if (!isTestCredentials && finalAppUrl && finalAppUrl.includes('localhost') && finalAppUrl.startsWith('http://')) {
      console.error('❌ PRODUCTION CREDENTIALS WITH HTTP URL');
      console.error('Cashfree production environment requires HTTPS URLs');
      console.error('Solutions:');
      console.error('1. Get TEST credentials from Cashfree Dashboard (recommended for development)');
      console.error('2. Use ngrok or similar service to create HTTPS URLs for localhost');
      console.error('3. Deploy to production with HTTPS domain');
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Production credentials detected but using HTTP URLs. Cashfree requires HTTPS in production.',
          details: 'Please get TEST credentials from Cashfree Dashboard for development, or use HTTPS URLs.',
          solutions: [
            'Get TEST credentials from Cashfree Dashboard (recommended for development)',
            'Use ngrok or similar service to create HTTPS URLs for localhost',
            'Deploy to production with HTTPS domain'
          ]
        },
        { status: 400 }
      );
    }
    
    const cashfree = new Cashfree(
      environment,
      clientId,
      clientSecret
    );

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create order request
    const orderRequest = {
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: orderId,
        customer_name: "User Name", // You can get this from user context
        customer_email: "user@example.com", // You can get this from user context
        customer_phone: "9999999999", // You can get this from user context
      },
      order_meta: {
        return_url: `${finalAppUrl}/payment/success?order_id=${orderId}`,
        notify_url: `${finalAppUrl}/api/payment/webhook`,
      },
      order_note: `Upgrade to ${planName}`,
      // Add these required fields for Cashfree
      order_tags: {
        plan_type: planName,
        plan_id: planId
      }
    };

    console.log('Creating order with request:', orderRequest);
    console.log('✅ Return URL:', orderRequest.order_meta.return_url);
    console.log('✅ Notify URL:', orderRequest.order_meta.notify_url);

    // Create the order
    const response = await cashfree.PGCreateOrder(orderRequest);
    console.log('Order created successfully:', response.data);

    // Get the payment session ID from the response
    const responseData = response.data as {
      payment_session_id: string;
      [key: string]: unknown;
    };
    const paymentSessionId = responseData.payment_session_id;
    
    console.log('✅ Payment Session ID created:', paymentSessionId);

    return NextResponse.json({
      success: true,
      data: response.data,
      orderId: orderId,
      paymentSessionId: paymentSessionId
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
    // Handle specific error types
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: {
          status: number;
          data: unknown;
        };
      };
      if (axiosError.response?.status === 401) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Authentication failed. Please check your Cashfree credentials (CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET).',
            details: 'Make sure you are using the correct production credentials from your Cashfree dashboard.'
          },
          { status: 401 }
        );
      }
      
      // Handle 400 validation errors
      if (axiosError.response?.status === 400) {
        console.error('Cashfree 400 Error Details:', axiosError.response.data);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid order request. Please check the order details.',
            details: axiosError.response.data || 'Validation failed',
            cashfreeError: axiosError.response.data
          },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 