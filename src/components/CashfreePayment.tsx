'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { load, CashfreeInstance, CheckoutOptions, CheckoutResponse } from "@cashfreepayments/cashfree-js";

interface CashfreePaymentProps {
  amount: number;
  planName: string;
  planId: string;
  onSuccess?: (response: unknown) => void;
  onFailure?: (error: unknown) => void;
  disabled?: boolean;
  className?: string;
}

interface PaymentApiResponse {
  success: boolean;
  data: Record<string, unknown>;
  orderId: string;
  paymentSessionId: string;
  error?: string;
  details?: string;
  solutions?: string[];
}

const CashfreePayment: React.FC<CashfreePaymentProps> = ({
  amount,
  planName,
  planId,
  onSuccess,
  onFailure,
  disabled = false,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null);

  // Initialize Cashfree SDK
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('🔄 Initializing Cashfree SDK...');
        const cashfreeInstance = await load({
          mode: "production" // Change to "sandbox" for testing
        });
        console.log('✅ Cashfree SDK initialized successfully:', cashfreeInstance);
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error('❌ Failed to initialize Cashfree SDK:', error);
        toast.error('Failed to initialize payment gateway. Please refresh the page.');
      }
    };

    initializeSDK();
  }, []);

  const handlePayment = async () => {
    console.log('=== PAYMENT DEBUG START ===');
    console.log('Payment button clicked');
    console.log(`Processing payment for ${planName} - Amount: ₹${amount}`);

    if (!cashfree) {
      toast.error('Payment gateway is not ready. Please wait a moment and try again.');
      return;
    }

    setIsLoading(true);

    try {
      // Call our server-side API to create the order
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          planName,
          planId,
        }),
      });

      const result = await response.json() as PaymentApiResponse;

      if (!result.success) {
        throw new Error(result.error || 'Failed to create order');
      }

      console.log('Order created successfully:', result.data);
      
      // Use the Cashfree SDK to initiate payment
      const checkoutOptions = {
        paymentSessionId: result.paymentSessionId,
        redirectTarget: "_self" as const,
      };
      
      console.log('🎯 Initiating payment with options:', checkoutOptions);
      
      // Call the checkout method
      cashfree.checkout(checkoutOptions)
        .then((response: CheckoutResponse) => {
          console.log('✅ Payment initiated successfully:', response);
          setShowCheckout(true);
          setIsLoading(false);
          // The checkout will redirect to Cashfree's payment page
          // Success/failure will be handled by the return URL
        })
        .catch((error: Error) => {
          console.error('❌ Payment initiation failed:', error);
          toast.error('Failed to initiate payment. Please try again.');
          setIsLoading(false);
          onFailure?.(error);
        });

    } catch (error) {
      console.error('❌ Payment initialization error:', error);
      
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      if (errorMessage) {
        toast.error(errorMessage);
      }
      setIsLoading(false);
      onFailure?.(error);
    }
  };


  return (
    <div className="w-full">
      <Button
        onClick={handlePayment}
        disabled={disabled || isLoading || !cashfree}
        className={`bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors ${className}`}
        size="lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing Payment...
          </div>
        ) : !cashfree ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Loading Payment Gateway...
          </div>
        ) : (
          `Upgrade Now - ₹${amount}`
        )}
      </Button>

      {/* Payment Status */}
      {showCheckout && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <span>Redirecting to payment gateway...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashfreePayment; 