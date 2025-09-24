'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Declare Cashfree types for TypeScript
declare global {
  interface Window {
    Cashfree: {
      // Modern SDK structure
      load?: (options: { mode: 'sandbox' | 'production' }) => Promise<CashfreeInstance>;
      // Legacy SDK structure
      checkout?: (options: CheckoutOptions) => Promise<CheckoutResponse>;
      renderCheckout?: (options: RenderCheckoutOptions) => void;
      // Generic function type for dynamic method calls
      [key: string]: unknown;
    };
  }
}

// Type definitions for Cashfree SDK
interface CashfreeInstance {
  checkout: (options: CheckoutOptions) => Promise<CheckoutResponse>;
  [key: string]: unknown;
}

interface CheckoutOptions {
  paymentSessionId: string;
  redirectTarget?: '_modal' | '_blank' | '_self';
  returnUrl?: string;
}

interface RenderCheckoutOptions {
  paymentSessionId: string;
  returnUrl?: string;
  onSuccess?: (data: Record<string, unknown>) => void;
  onFailure?: (data: Record<string, unknown>) => void;
  onClose?: () => void;
}

interface CheckoutResponse {
  success?: boolean;
  error?: string;
  [key: string]: unknown;
}

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
  const checkoutContainerRef = useRef<HTMLDivElement>(null);

  // Load Cashfree SDK using the correct approach from the tutorial
  useEffect(() => {
    const loadCashfreeSDK = async () => {
      try {
        // Try to load the Cashfree SDK from CDN first (fallback approach)
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.async = true;
        
        script.onload = async () => {
          try {
            // Try to use the modern approach if available
            if (window.Cashfree && typeof window.Cashfree.load === 'function') {
              const cashfree = await window.Cashfree.load({
                mode: 'sandbox' // Use 'production' for live payments
              });
              window.Cashfree = cashfree;
              console.log('✅ Cashfree SDK loaded successfully using modern approach');
            } else {
              console.log('✅ Cashfree SDK loaded from CDN');
            }
            
            console.log('🔍 Available Cashfree methods:', Object.keys(window.Cashfree || {}));
            console.log('🔍 Cashfree object:', window.Cashfree);
            
                     } catch {
             console.log('✅ Using CDN-loaded Cashfree SDK');
           }
        };
        
        script.onerror = () => {
          console.error('❌ Failed to load Cashfree SDK from CDN');
          toast.error('Failed to load payment gateway. Please refresh the page.');
        };
        
        document.head.appendChild(script);
        
      } catch (error) {
        console.error('❌ Failed to load Cashfree SDK:', error);
        toast.error('Failed to load payment gateway. Please refresh the page.');
      }
    };

    if (!window.Cashfree) {
      loadCashfreeSDK();
    } else {
      console.log('🔍 Existing Cashfree methods:', Object.keys(window.Cashfree));
    }
  }, []);

  const handlePayment = async () => {
    console.log('=== PAYMENT DEBUG START ===');
    console.log('Payment button clicked');
    console.log(`Processing payment for ${planName} - Amount: ₹${amount}`);

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
      
      // Store the payment session ID and show checkout
      setPaymentSessionId(result.paymentSessionId);
      setShowCheckout(true);
      setIsLoading(false);

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

      // Render checkout when payment session ID is available
  useEffect(() => {
    if (showCheckout && paymentSessionId && window.Cashfree && checkoutContainerRef.current) {
      console.log('🎯 Rendering Cashfree Checkout with session ID:', paymentSessionId);
      console.log('🔍 Available methods:', Object.keys(window.Cashfree));
      
      try {
        // Try different possible checkout methods based on SDK structure
        let checkoutMethod = null;
        let checkoutOptions = {};
        
        if (typeof window.Cashfree.checkout === 'function') {
          checkoutMethod = 'checkout';
          checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: '_modal' // Opens payment in a modal on your site
          };
        } else if (typeof window.Cashfree.renderCheckout === 'function') {
          checkoutMethod = 'renderCheckout';
          checkoutOptions = {
            paymentSessionId: paymentSessionId,
            returnUrl: `${window.location.origin}/payment/success`,
            onSuccess: (data: Record<string, unknown>) => {
              console.log('✅ Payment successful:', data);
              setShowCheckout(false);
              setPaymentSessionId(null);
              toast.success('Payment successful! Welcome to Pro!');
              onSuccess?.(data);
            },
            onFailure: (data: Record<string, unknown>) => {
              console.error('❌ Payment failed:', data);
              setShowCheckout(false);
              setPaymentSessionId(null);
              toast.error('Payment failed. Please try again.');
              onFailure?.(data);
            },
            onClose: () => {
              console.log('🔒 Checkout closed by user');
              setShowCheckout(false);
              setPaymentSessionId(null);
              toast.info('Payment cancelled');
            }
          };
        } else {
          // Try to find any function that might be the checkout method
          const methods = Object.keys(window.Cashfree);
          const functionMethods = methods.filter(key => typeof window.Cashfree[key as keyof typeof window.Cashfree] === 'function');
          console.log('🔍 Available function methods:', functionMethods);
          
          if (functionMethods.length > 0) {
            checkoutMethod = functionMethods[0];
            console.log('🔍 Using method:', checkoutMethod);
            checkoutOptions = { paymentSessionId: paymentSessionId };
          }
        }
        
        if (!checkoutMethod) {
          throw new Error('No checkout method found in Cashfree SDK');
        }
        
        console.log('🎯 Using checkout method:', checkoutMethod);
        console.log('🎯 Checkout options:', checkoutOptions);
        
                 // Call the checkout method with proper typing
         try {
           const method = (window.Cashfree as Record<string, (...args: unknown[]) => unknown>)[checkoutMethod];
           const result = method.call(window.Cashfree, checkoutOptions);
           
           // Handle promise-based results
           if (result && typeof result === 'object' && 'then' in result && typeof (result as Promise<unknown>).then === 'function') {
             (result as Promise<CheckoutResponse>).then((response: CheckoutResponse) => {
               console.log('✅ Payment initiated:', response);
             }).catch((error: Error) => {
               console.error('❌ Payment initiation failed:', error);
               toast.error('Failed to initiate payment. Please try again.');
               setShowCheckout(false);
               setPaymentSessionId(null);
             });
           } else {
             console.log('✅ Payment method called successfully');
           }
           
         } catch (error) {
           console.error('❌ Error calling checkout method:', error);
           toast.error('Failed to initiate payment. Please try again.');
           setShowCheckout(false);
           setPaymentSessionId(null);
         }
        
      } catch (error) {
        console.error('❌ Error rendering checkout:', error);
        toast.error('Failed to initialize payment. Please try again.');
        setShowCheckout(false);
        setPaymentSessionId(null);
      }
     }
   }, [showCheckout, paymentSessionId, onSuccess, onFailure]);

  return (
    <div className="w-full">
      <Button
        onClick={handlePayment}
        disabled={disabled || isLoading}
        className={`bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors ${className}`}
        size="lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing Payment...
          </div>
        ) : (
          `Upgrade Now - ₹${amount}`
        )}
      </Button>

      {/* Cashfree Checkout Container */}
      {showCheckout && (
        <div className="mt-4">
          <div 
            ref={checkoutContainerRef}
            className="w-full min-h-[400px] border border-gray-200 rounded-lg bg-white"
          >
            <div className="p-4 text-center text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
              Loading payment gateway...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashfreePayment; 