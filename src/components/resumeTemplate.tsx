'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';


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

interface ResumeTemplateProps {
  data: ChefResumeData;
  onDownloadPDF?: () => void;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data, onDownloadPDF }) => {
  // Helper function to format experience years
  const formatExperienceYears = (years?: number) => {
    if (!years) return '';
    if (years === 1) return '1 year';
    return `${years} years`;
  };



  return (
    <div id="chef-resume" className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none">
      {/* Header Section - Harvard Style */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-4 border-amber-600 p-8 print:bg-white print:border-b-2">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              {data.name}
            </h1>
            <h2 className="text-2xl font-semibold text-amber-700 mb-3">
              {data.currentPosition}
            </h2>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{data.mobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{data.location}</span>
              </div>
            </div>
          </div>
          <div className="w-24 h-24 border-4 border-red-500 bg-black rounded-full flex items-center justify-center print:w-20 print:h-20 transform rotate-12 overflow-hidden">
            <Image 
              src="/website/icons/cheflogo.webp" 
              alt="Chef Logo" 
              width={64}
              height={64}
              className="w-16 h-16 print:w-14 print:h-14 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="p-8 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          Professional Summary
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          {data.experience}
        </p>
      </section>

      {/* Primary Professional Details */}
      <section className="p-8 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          Professional Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-amber-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900">
                {formatExperienceYears(data.totalExperienceYears)}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-amber-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">Job Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {data.jobType}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">Business Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {data.businessType}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">Preferred Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900">{data.preferredLocation}</p>
            </CardContent>
          </Card>

          {data.age && (
            <Card className="border-l-4 border-l-amber-600 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">Age</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900">{data.age} years</p>
              </CardContent>
            </Card>
          )}

          {data.passportNo && (
            <Card className="border-l-4 border-l-amber-600 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">Passport No</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900 font-mono">{data.passportNo}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Culinary Expertise */}
      <section className="p-8 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          Culinary Expertise
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">Specialized Cuisines</h4>
            <div className="flex flex-wrap gap-2">
              {data.cuisines.split(',').map((cuisine, index) => (
                <Badge key={index} variant="outline" className="border-amber-300 text-amber-700 px-3 py-1 text-sm">
                  {cuisine.trim()}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Joining Type</h4>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {data.joiningType}
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Training Readiness</h4>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {data.readyForTraining}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="p-8 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Probation Period</h4>
            <Badge variant={data.probationPeriod ? "default" : "secondary"}>
              {data.probationPeriod ? "Required" : "Not Required"}
            </Badge>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Candidate Consent</h4>
            <Badge variant={data.candidateConsent ? "default" : "secondary"}>
              {data.candidateConsent ? "Consented" : "Not Consented"}
            </Badge>
          </div>
        </div>
      </section>

      {/* Salary & Compensation Details */}
      <section className="p-8 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          Salary & Compensation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-amber-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">Current Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900">{data.currentSalary}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-600 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">Expected Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900">{data.expectedSalary}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <div className="p-8 bg-gray-50 print:bg-white">
        <div className="text-center text-gray-600">
          <p className="text-sm">
            This resume was generated using ChefDhundo - Professional Chef Recruitment Platform
          </p>
          <p className="text-xs mt-1">
            Available for immediate placement • References available upon request
          </p>
        </div>
        
        {/* Download PDF Button - Hidden in print */}
        {onDownloadPDF && (
          <div className="mt-6 text-center print:hidden">
            <Button 
              onClick={onDownloadPDF}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF Resume
            </Button>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background-color: white !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:border-b-2 { border-bottom-width: 2px !important; }
          .print\\:w-20 { width: 5rem !important; }
          .print\\:h-20 { height: 5rem !important; }
          .print\\:text-xl { font-size: 1.25rem !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumeTemplate;
