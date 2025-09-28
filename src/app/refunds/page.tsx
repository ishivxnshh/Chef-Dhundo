'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refunds & Cancellations</h1>
          <p className="text-xl text-gray-600">
            Our refund and cancellation policy for ChefDhundo services.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">1. Policy Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                At ChefDhundo, we strive to provide excellent service and customer satisfaction. This policy outlines the terms 
                and conditions for cancellations and refunds for our chef booking services.
              </p>
              <p className="text-gray-700">
                Please read this policy carefully before making a booking. By using our services, you agree to the terms outlined below.
              </p>
            </CardContent>
          </Card>

          {/* Cancellation Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">2. Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">2.1 Customer Cancellations</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Free
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-800">More than 48 hours before service</p>
                      <p className="text-gray-600">Full refund will be processed within 5-7 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      25% Fee
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-800">24-48 hours before service</p>
                      <p className="text-gray-600">75% refund will be processed within 5-7 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      50% Fee
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-800">12-24 hours before service</p>
                      <p className="text-gray-600">50% refund will be processed within 5-7 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      No Refund
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-800">Less than 12 hours before service</p>
                      <p className="text-gray-600">No refund available for last-minute cancellations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">2.2 Chef Partner Cancellations</h3>
                <p className="text-gray-700">
                  If a chef partner cancels your booking, you will receive a full refund regardless of timing. 
                  We will also help you find an alternative chef if available.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">2.3 Force Majeure Cancellations</h3>
                <p className="text-gray-700">
                  In case of natural disasters, government restrictions, or other force majeure events, 
                  we will work with you to reschedule or provide appropriate refunds.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Refund Process */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">3. Refund Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">3.1 How to Request a Refund</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>Contact our customer support team via email or phone</li>
                  <li>Provide your booking reference number</li>
                  <li>State the reason for cancellation/refund</li>
                  <li>Our team will review and process your request</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">3.2 Refund Timeline</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Refund requests are processed within 24-48 hours</li>
                  <li>Refunds appear in your account within 5-7 business days</li>
                  <li>Processing time may vary depending on your bank</li>
                  <li>You will receive email confirmation once processed</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">3.3 Refund Methods</h3>
                <p className="text-gray-700">
                  Refunds will be processed using the same payment method used for the original booking. 
                  If that&apos;s not possible, we will contact you to arrange an alternative method.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Non-Refundable Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">4. Non-Refundable Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">The following services are non-refundable:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Services that have already been completed</li>
                <li>Custom menu planning fees (if chef has already started work)</li>
                <li>Special equipment or ingredient costs already incurred</li>
                <li>No-show situations (customer doesn&apos;t appear at scheduled time)</li>
                <li>Cancellations due to customer&apos;s change of mind after service has started</li>
              </ul>
            </CardContent>
          </Card>

          {/* Partial Refunds */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">5. Partial Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                In certain circumstances, we may offer partial refunds:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>If service is significantly delayed due to chef partner issues</li>
                <li>If service quality doesn&apos;t meet agreed standards</li>
                <li>If chef partner is unable to complete the full service</li>
                <li>If there are issues with food safety or hygiene</li>
              </ul>
              <p className="text-gray-700">
                Partial refund amounts will be determined on a case-by-case basis and may range from 25% to 75% of the total booking amount.
              </p>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">6. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you disagree with our refund decision, you can:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>Contact our customer support team for further review</li>
                <li>Provide additional documentation or evidence</li>
                <li>Request escalation to our management team</li>
                <li>File a complaint through our official channels</li>
              </ol>
              <p className="text-gray-700">
                We are committed to fair resolution of all disputes and will work with you to find a satisfactory solution.
              </p>
            </CardContent>
          </Card>

          {/* Special Circumstances */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">7. Special Circumstances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">7.1 Medical Emergencies</h3>
                <p className="text-gray-700">
                  In case of medical emergencies, we may offer more flexible refund terms. 
                  Please provide appropriate documentation when requesting such refunds.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">7.2 Weather Conditions</h3>
                <p className="text-gray-700">
                  For outdoor events affected by severe weather, we will work with you to reschedule 
                  or provide appropriate refunds based on the circumstances.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">7.3 COVID-19 Related Cancellations</h3>
                <p className="text-gray-700">
                  For cancellations related to COVID-19 restrictions or health concerns, 
                  we will provide full refunds or rescheduling options.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">8. Contact for Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> refunds@chefdhundo.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +91 98765 43210</p>
                <p className="text-gray-700"><strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM</p>
                <p className="text-gray-700"><strong>Response Time:</strong> Within 24 hours</p>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">9. Policy Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We reserve the right to update this refund and cancellation policy at any time. 
                Changes will be posted on this page with an updated &quot;Last modified&quot; date.
              </p>
              <p className="text-gray-700">
                For existing bookings, the policy in effect at the time of booking will apply. 
                For new bookings, the current policy will apply.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
