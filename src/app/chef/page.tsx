'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import ResumeTemplate from '@/components/resumeTemplate';


// TypeScript interface for the resume data
interface ChefResumeData {
  name: string;
  email: string;
  mobile: string;
  location: string;
  age?: number;
  experience: string;
  jobType: string;
  cuisines: string;
  totalExperienceYears?: number;
  currentPosition: string;
  currentSalary: string;
  expectedSalary: string;
  preferredLocation: string;
  passportNo?: string;
  probationPeriod: boolean;
  businessType: string;
  joiningType: string;
  readyForTraining: string;
  candidateConsent: boolean;
}

export default function ChefResumePage() {
  console.log('🚀 ChefResumePage: Component is being rendered!');
  
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ChefResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 ChefResumePage: useEffect triggered');
    
    // Get data from localStorage
    const storedData = localStorage.getItem('chefResumeData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log('🔍 ChefResumePage: Data loaded from localStorage:', parsedData);
        setResumeData(parsedData);
        setIsLoading(false);
      } catch (error) {
        console.error('❌ ChefResumePage: Error parsing stored data:', error);
        setError('Failed to load resume data');
        setIsLoading(false);
      }
    } else {
      console.log('❌ ChefResumePage: No resume data found in localStorage');
      setError('No resume data found');
      setIsLoading(false);
    }
  }, []);

  const handleBack = () => {
    router.push('/findchefs');
  };

  const handleContact = (type: 'email' | 'phone') => {
    if (!resumeData) return;
    
    if (type === 'email' && resumeData.email) {
      window.open(`mailto:${resumeData.email}`, '_blank');
    } else if (type === 'phone' && resumeData.mobile) {
      window.open(`tel:${resumeData.mobile}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'No resume data available'}</p>
          <Button onClick={handleBack} className="bg-amber-600 hover:bg-amber-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chef Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chef Search
            </Button>
            
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {resumeData.name} - Resume
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Contact Actions */}
              {resumeData.email && (
                <Button
                  onClick={() => handleContact('email')}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              )}
              
              {resumeData.mobile && (
                <Button
                  onClick={() => handleContact('phone')}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Info Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{resumeData.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium text-gray-900">
                    {resumeData.totalExperienceYears ? `${resumeData.totalExperienceYears} years` : 'Not specified'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium text-gray-900">{resumeData.jobType}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium text-gray-900">{resumeData.currentPosition}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Template */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ResumeTemplate data={resumeData} />
          </div>

          {/* Action Footer */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Interested in this candidate?
                </h3>
                <p className="text-gray-600">
                  Use the contact information above to reach out directly
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Search
                </Button>
                
                {resumeData.email && (
                  <Button
                    onClick={() => handleContact('email')}
                    className="bg-amber-600 hover:bg-amber-700 px-6"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
