'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import CashfreePayment from '@/components/CashfreePayment';
import { PricingTable } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const plans = [
  {
    id: '1week',
    name: '1 Week Trial',
    price: '₹99',
    duration: '7 days',
    description: 'Perfect for quick access',
    features: [
      'Full contact information access',
      'Unlimited chef searches',
      'Direct messaging',
      'Priority support',
      'Resume downloads'
    ],
    popular: false,
    savings: null
  },
  {
    id: '1month',
    name: 'Monthly Plan',
    price: '₹300',
    duration: '30 days',
    description: 'Most popular choice',
    features: [
      'Full contact information access',
      'Unlimited chef searches',
      'Direct messaging',
      'Priority support',
      'Resume downloads',
      'Advanced filters',
      'Email notifications'
    ],
    popular: true,
    savings: null
  },
  {
    id: '3months',
    name: 'Quarterly Plan',
    price: '₹500',
    duration: '90 days',
    description: 'Great value for longer term',
    features: [
      'Full contact information access',
      'Unlimited chef searches',
      'Direct messaging',
      'Priority support',
      'Resume downloads',
      'Advanced filters',
      'Email notifications',
      'Bulk export',
      'Analytics dashboard'
    ],
    popular: false,
    savings: 'Save ₹400'
  },
  {
    id: '6months',
    name: 'Semi-Annual Plan',
    price: '₹900',
    duration: '180 days',
    description: 'Best value for businesses',
    features: [
      'Full contact information access',
      'Unlimited chef searches',
      'Direct messaging',
      'Priority support',
      'Resume downloads',
      'Advanced filters',
      'Email notifications',
      'Bulk export',
      'Analytics dashboard',
      'API access',
      'Custom integrations'
    ],
    popular: false,
    savings: 'Save ₹900'
  }
];

function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPricingTable, setShowPricingTable] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePaymentSuccess = (response: unknown) => {
    console.log('Payment successful:', response);
    // Handle successful payment - update user role, redirect, etc.
    toast.success('Welcome to Pro! Your account has been upgraded.');
    
    // Redirect to dashboard or show success message
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handlePaymentFailure = (error: unknown) => {
    console.error('Payment failed:', error);
    // Handle payment failure - user can try again
    toast.error('Payment failed. Please try again or contact support.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Upgrade to Pro
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Unlock full access to our chef network. Get direct contact information, 
                unlimited searches, and premium features to find your perfect culinary professional.
              </p>
              
              {/* Current Plan Info */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Current Plan: Basic
                </h3>
                <p className="text-orange-700">
                  You&apos;re currently on the basic plan with limited access. 
                  Upgrade to unlock all features and contact information.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-gray-600 text-lg">
                Select the plan that best fits your needs
              </p>
            </motion.div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card 
                    className={`relative h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedPlan === plan.id 
                        ? 'ring-2 ring-orange-500 shadow-lg scale-105' 
                        : 'hover:scale-105'
                    } ${plan.popular ? 'border-orange-500' : ''}`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-orange-500 text-white px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    {plan.savings && (
                      <div className="absolute -top-3 right-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {plan.savings}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {plan.name}
                      </CardTitle>
                      <div className="mt-4">
                        <div className="text-3xl font-bold text-gray-900">
                          {plan.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          per {plan.duration}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {plan.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Upgrade Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              {selectedPlan ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-blue-800 font-medium">
                      Selected: {plans.find(p => p.id === selectedPlan)?.name}
                    </p>
                  </div>
                  <CashfreePayment
                    amount={parseInt(plans.find(p => p.id === selectedPlan)?.price.replace('₹', '') || '0')}
                    planName={plans.find(p => p.id === selectedPlan)?.name || ''}
                    planId={selectedPlan}
                    onSuccess={handlePaymentSuccess}
                    onFailure={handlePaymentFailure}
                  />
                </div>
              ) : (
                <div className="text-gray-500">
                  Please select a plan to continue
                </div>
              )}
            </motion.div>

            {/* Clerk Pricing Table Test Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Test Clerk Pricing Table
                </h3>
                <p className="text-gray-600 mb-6">
                  Click the button below to test Clerk&apos;s integrated pricing table component. 
                  This will show the pricing plans configured in your Clerk dashboard.
                </p>
                <Button
                  onClick={() => setShowPricingTable(!showPricingTable)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  {showPricingTable ? 'Hide' : 'Show'} Clerk Pricing Table
                </Button>
              </div>

              {showPricingTable && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
                  <PricingTable
                    appearance={{
                      variables: {
                        colorPrimary: '#f97316', // Orange color to match your theme
                        colorBackground: '#ffffff',
                        colorText: '#1f2937',
                        colorTextSecondary: '#6b7280',
                        borderRadius: '0.5rem',
                      },
                      elements: {
                        rootBox: {
                          boxShadow: 'none',
                        },
                        card: {
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                        },
                      },
                    }}
                    newSubscriptionRedirectUrl="/payment/success"
                    checkoutProps={{
                      appearance: {
                        variables: {
                          colorPrimary: '#f97316',
                        },
                      },
                    }}
                    fallback={
                      <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        <span className="ml-3 text-gray-600">Loading pricing plans...</span>
                      </div>
                    }
                    ctaPosition="bottom"
                    collapseFeatures={false}
                  />
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What You Get with Pro
              </h2>
              <p className="text-gray-600 text-lg">
                Unlock powerful features to streamline your chef hiring process
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Contact Access</h3>
                    <p className="text-gray-600">Get full email addresses and phone numbers to contact chefs directly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Search</h3>
                    <p className="text-gray-600">Use advanced filters to find chefs with specific skills, experience, and availability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Downloads</h3>
                    <p className="text-gray-600">Download complete resumes and portfolios for detailed review.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Messaging</h3>
                    <p className="text-gray-600">Send messages directly to chefs through our secure platform.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Priority Support</h3>
                    <p className="text-gray-600">Get faster response times and dedicated support for your hiring needs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600">Track your hiring metrics and get insights into your search patterns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UpgradePage;