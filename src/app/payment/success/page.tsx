'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Extract order ID from URL parameters
    const orderIdParam = searchParams.get('order_id');
    if (orderIdParam) {
      setOrderId(orderIdParam);
    }

    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Show success message
    toast.success('Payment successful! Welcome to Pro!');
  }, [searchParams]);

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleGoToChefSearch = () => {
    window.location.href = '/findchefs';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4"></div>
          <p className="text-green-600 text-lg">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Welcome to ChefDhundo Pro! Your account has been upgraded successfully. 
              You now have access to all premium features including full contact information, 
              unlimited searches, and direct messaging.
            </p>

            {/* Order Details */}
            {orderId && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Order Details
                </h3>
                <div className="text-sm text-gray-600">
                  <p><strong>Order ID:</strong> {orderId}</p>
                  <p><strong>Status:</strong> <span className="text-green-600 font-semibold">Paid</span></p>
                  <p><strong>Plan:</strong> Pro Subscription</p>
                </div>
              </div>
            )}

            {/* What's Next */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What&apos;s Next?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Search Chefs</h4>
                  <p className="text-sm text-gray-600">
                    Browse our network with full access to contact information
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Direct Contact</h4>
                  <p className="text-sm text-gray-600">
                    Reach out to chefs directly via email and phone
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Features</h4>
                  <p className="text-sm text-gray-600">
                    Access advanced filters and analytics dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGoToChefSearch}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
                size="lg"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Start Searching Chefs
              </Button>
              
              <Button
                onClick={handleGoToDashboard}
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                size="lg"
              >
                Go to Dashboard
              </Button>
            </div>

            {/* Support Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-2">
                Need help? Contact our support team
              </p>
              <p className="text-sm text-gray-400">
                You&apos;ll receive a confirmation email shortly with your receipt
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4"></div>
          <p className="text-green-600 text-lg">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}