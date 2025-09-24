'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-600">
            Please read these terms and conditions carefully before using our service.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Welcome to ChefDhundo ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website, 
                mobile application, and services (collectively, the "Service") operated by ChefDhundo.
              </p>
              <p className="text-gray-700">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, 
                then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">2. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                By using our Service, you represent that you are at least 18 years old and have the legal capacity to enter into this agreement. 
                If you are under 18, you must have parental or guardian consent to use our Service.
              </p>
              <p className="text-gray-700">
                You acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">3. Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                ChefDhundo is a platform that connects customers with professional chefs for various culinary services including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Private cooking sessions</li>
                <li>Catering services</li>
                <li>Cooking classes and workshops</li>
                <li>Meal preparation services</li>
                <li>Special event cooking</li>
              </ul>
              <p className="text-gray-700">
                We act as an intermediary platform and do not directly provide cooking services. All services are provided by independent chef partners.
              </p>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">4. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                To use certain features of our Service, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activities.
              </p>
            </CardContent>
          </Card>

          {/* Booking and Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">5. Booking and Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                <strong>Booking Process:</strong> All bookings are subject to availability and chef approval. 
                We reserve the right to cancel bookings due to unforeseen circumstances.
              </p>
              <p className="text-gray-700">
                <strong>Payment Terms:</strong> Payment is required at the time of booking. We accept various payment methods 
                including credit cards, debit cards, UPI, and digital wallets.
              </p>
              <p className="text-gray-700">
                <strong>Pricing:</strong> All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes. 
                Prices may vary based on location, duration, and specific requirements.
              </p>
              <p className="text-gray-700">
                <strong>Refunds:</strong> Refund policies are outlined in our separate Refunds & Cancellations policy.
              </p>
            </CardContent>
          </Card>

          {/* Chef Partners */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">6. Chef Partners</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Our chef partners are independent contractors, not employees of ChefDhundo. We are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>The quality of services provided by chef partners</li>
                <li>Chef partner conduct or behavior</li>
                <li>Food safety and hygiene practices</li>
                <li>Any disputes between customers and chef partners</li>
              </ul>
              <p className="text-gray-700">
                Chef partners are required to maintain proper licenses, insurance, and food safety certifications as applicable.
              </p>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">7. User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Use the Service for any unlawful purpose</li>
                <li>Harass, abuse, or harm other users or chef partners</li>
                <li>Impersonate any person or entity</li>
                <li>Upload or transmit viruses or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to access the Service</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">8. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The Service and its original content, features, and functionality are owned by ChefDhundo and are protected by 
                international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                You may not reproduce, distribute, modify, or create derivative works of our content without express written permission.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">9. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                To the maximum extent permitted by law, ChefDhundo shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses resulting from your use of the Service.
              </p>
              <p className="text-gray-700">
                Our total liability to you for any damages shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </CardContent>
          </Card>

          {/* Indemnification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">10. Indemnification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                You agree to defend, indemnify, and hold harmless ChefDhundo and its officers, directors, employees, and agents 
                from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees).
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">11. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-700">
                Upon termination, your right to use the Service will cease immediately. All provisions of the Terms which by their nature 
                should survive termination shall survive termination.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">12. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-700">
                Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">13. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. 
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">14. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@chefdhundo.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +91 98765 43210</p>
                <p className="text-gray-700"><strong>Address:</strong> Mumbai, Maharashtra, India</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
