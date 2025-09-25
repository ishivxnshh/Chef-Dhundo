
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { load, CashfreeInstance, CheckoutResponse } from '@cashfreepayments/cashfree-js';

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

const CashfreeTest: React.FC<CashfreePaymentProps> = ({
  amount,
  planName,
  planId,
  onSuccess,
  onFailure,
  disabled = false,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Initialize Cashfree SDK using npm package
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const cashfreeInstance = await load({ mode: 'sandbox' }); // Change to 'production' for live
        setCashfree(cashfreeInstance);
        // Debug: log available methods on the instance
        console.log('Cashfree instance loaded:', cashfreeInstance);
        console.log('Available methods on cashfreeInstance:', Object.keys(cashfreeInstance));
        if (!('checkout' in cashfreeInstance)) {
          console.error('❌ No checkout method found in Cashfree SDK instance!');
        }
      } catch (error) {
        console.error('❌ Failed to initialize Cashfree SDK:', error);
        toast.error('Failed to initialize payment gateway. Please refresh the page.');
      }
    };
    initializeSDK();
  }, []);

  const handlePayment = async () => {
    if (!cashfree) {
      toast.error('Payment gateway is not ready. Please wait a moment and try again.');
      return;
    }
    // Debug: check if checkout method exists
    if (typeof cashfree.checkout !== 'function') {
      console.error('❌ No checkout method found on Cashfree instance:', cashfree);
      toast.error('Payment gateway is not ready (checkout method missing). Please refresh or contact support.');
      return;
    }
    setIsLoading(true);
    try {
      // Call your server-side API to create the order
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, planName, planId }),
      });
      const result = await response.json() as PaymentApiResponse;
      if (!result.success) {
        throw new Error(result.error || 'Failed to create order');
      }
      // Debug: Log the paymentSessionId before calling the SDK
      console.log('Payment Session ID sent to SDK:', result.paymentSessionId);
      // Use the Cashfree SDK to initiate payment
      const checkoutOptions = {
        paymentSessionId: result.paymentSessionId,
        redirectTarget: '_self' as const,
      };
      cashfree.checkout(checkoutOptions)
        .then((response: CheckoutResponse) => {
          setShowCheckout(true);
          setIsLoading(false);
          // Success/failure will be handled by the return URL
          onSuccess?.(response);
        })
        .catch((error: Error) => {
          toast.error('Failed to initiate payment. Please try again.');
          setIsLoading(false);
          onFailure?.(error);
        });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unknown error');
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

export default CashfreeTest;