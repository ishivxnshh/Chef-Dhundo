'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useChefStore, ChefDetails, JobType, BusinessType, JoiningType, TrainingReadiness } from '@/lib/chef-store';
import { useResumeStore } from '@/lib/useResumeStore';
import { toast } from 'sonner';
//import { useUserStore } from '@/store/userStore';
//import { User } from '@/types/notion_database';

export function SubmitResume() {
  const updateChefDetails = useChefStore((state) => state.updateChefDetails);
  const { saveResume, isLoading } = useResumeStore();
  // const createUser = useUserStore((state) => state.createUser); // Removed - will use Google Sheets instead
  const [currentStep, setCurrentStep] = React.useState(1);
  const [resumeForm, setResumeForm] = React.useState<ChefDetails>({
    // Step 1 - Basic Information
    name: '',
    email: '',
    location: '',
    age: '',
    mobile: '',
    experience: '',
    jobType: '',
    
    // Step 2 - Professional Details
    cuisines: '',
    totalExperienceYears: '',
    currentPosition: '',
    currentSalary: '',
    expectedSalary: '',
    preferredLocation: '',
    passportNo: '',
    
    // Step 3 - Preferences & Consent
    probationPeriod: false,
    businessType: 'any',
    joiningType: 'immediate',
    readyForTraining: 'yes',
    candidateConsent: false,
    resumeFile: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setResumeForm((prev) => ({ 
      ...prev, 
      [id]: type === 'checkbox' ? checked : (id === 'totalExperienceYears' ? (value === '' ? '' : Number(value)) : value) 
    }));
  };

  const handleSelectChange = (field: keyof ChefDetails, value: string) => {
    setResumeForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeForm((prev) => ({ ...prev, resumeFile: file }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!resumeForm.name || !resumeForm.email || !resumeForm.mobile || !resumeForm.jobType || !resumeForm.experience) {
        toast.error('Please fill in all required fields');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate step 2
      if (!resumeForm.cuisines || !resumeForm.totalExperienceYears || !resumeForm.preferredLocation) {
        toast.error('Please fill in all required fields');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Validate step 3
    if (!resumeForm.candidateConsent) {
      toast.error('Please provide candidate consent');
      return;
    }
    
    try {
      // Save to chef store
      updateChefDetails(resumeForm);
      
      // Save to Notion database
      const result = await saveResume(resumeForm);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to save resume');
      }
      
      console.log('Final Resume Data:', resumeForm);
      
      toast.success('Resume submitted successfully!', {
        description: 'We have received your details and will get back to you shortly.',
        action: {
          label: 'Close',
          onClick: () => {},
        },
        closeButton: true,
      });
      
      // Reset form
      setResumeForm({
        name: '',
        email: '',
        location: '',
        age: '',
        mobile: '',
        experience: '',
        jobType: '',
        cuisines: '',
        totalExperienceYears: '',
        currentPosition: '',
        currentSalary: '',
        expectedSalary: '',
        preferredLocation: '',
        passportNo: '',
        probationPeriod: false,
        businessType: 'any',
        joiningType: 'immediate',
        readyForTraining: 'yes',
        candidateConsent: false,
        resumeFile: null,
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting resume:', error);
      toast.error('Failed to submit resume. Please try again.');
    }
  };

  // Animation variants for page transitions
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const pageTransition = {
    x: { type: "spring" as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      custom={1}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full Name / पूरा नाम *</Label>
        <Input 
          id="name" 
          type="text" 
          required 
          placeholder="Enter your full name" 
          value={resumeForm.name} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email / ईमेल *</Label>
        <Input 
          id="email" 
          type="email" 
          required 
          placeholder="john@example.com" 
          value={resumeForm.email} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile No. / मोबाइल नंबर *</Label>
        <Input 
          id="mobile" 
          type="tel" 
          required 
          placeholder="9XXXXXXXXX" 
          value={resumeForm.mobile} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Age / उम्र *</Label>
        <Input 
          id="age" 
          type="number" 
          required 
          placeholder="20" 
          value={resumeForm.age} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location / स्थान *</Label>
        <Input 
          id="location" 
          type="text" 
          required 
          placeholder="Mumbai, Delhi, Bangalore" 
          value={resumeForm.location} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="jobType">Job Type / कार्य प्रकार *</Label>
        <Select value={resumeForm.jobType} onValueChange={(value) => handleSelectChange('jobType', value as JobType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full-time / पूर्ण समय</SelectItem>
            <SelectItem value="part">Part-time / अर्द्ध समय</SelectItem>
            <SelectItem value="contract">Contract / अनुबंध</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Experience (Hotel Names) / अनुभव (होटल नाम) *</Label>
        <Input 
          id="experience" 
          type="text" 
          required 
          placeholder="e.g., The Grand Hotel, Spice Kitchen (Use comma to separate)" 
          value={resumeForm.experience} 
          onChange={handleInputChange} 
        />
      </div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          type="button" 
          onClick={handleNext}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md text-lg transition-colors shadow-md"
        >
          Next Page →
        </Button>
      </motion.div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      custom={1}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="cuisines">Which Cuisines Do you Know? / आप कौन सी कुजीन जानते हैं? *</Label>
        <Input 
          id="cuisines" 
          type="text" 
          required 
          placeholder="e.g., Indian, Chinese, Continental (separated by commas)" 
          value={resumeForm.cuisines} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="totalExperienceYears">Your Total Experience in Years? / आपका कुल अनुभव कितने वर्षों का है? *</Label>
        <Input 
          id="totalExperienceYears" 
          type="number" 
          required 
          placeholder="e.g., 5" 
          value={resumeForm.totalExperienceYears} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentPosition">Current Position & Job Address / वर्तमान पद और नौकरी का पता</Label>
        <Input 
          id="currentPosition" 
          type="text" 
          placeholder="e.g., Senior Chef at ABC Restaurant, Delhi" 
          value={resumeForm.currentPosition} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentSalary">Current Salary / वर्तमान वेतन</Label>
          <Input 
            id="currentSalary" 
            type="text" 
            placeholder="e.g., 25,000" 
            value={resumeForm.currentSalary} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expectedSalary">Expected Salary / अपेक्षित वेतन</Label>
          <Input 
            id="expectedSalary" 
            type="text" 
            placeholder="e.g., 35,000" 
            value={resumeForm.expectedSalary} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredLocation">Preferred Job Location? / पसंदीदा नौकरी का स्थान? *</Label>
        <Input 
          id="preferredLocation" 
          type="text" 
          required 
          placeholder="e.g., Mumbai, Delhi, Bangalore" 
          value={resumeForm.preferredLocation} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="passportNo">Passport No. / पासपोर्ट नंबर</Label>
        <Input 
          id="passportNo" 
          type="text" 
          placeholder="e.g., A12345678" 
          value={resumeForm.passportNo} 
          onChange={handleInputChange} 
        />
      </div>
      <div className="flex gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Button 
            type="button" 
            onClick={() => setCurrentStep(1)}
            variant="outline"
            className="w-full py-3 px-4 rounded-md text-lg transition-colors"
          >
            ← Previous
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Button 
            type="button" 
            onClick={handleNext}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md text-lg transition-colors shadow-md"
          >
            Next Page →
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      custom={1}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label>Probation Period Need to Follow / प्रोबेशन अवधि का पालन करना होगा</Label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="probationPeriod"
              checked={resumeForm.probationPeriod === true}
              onChange={() => setResumeForm(prev => ({ ...prev, probationPeriod: true }))}
              className="text-orange-500"
            />
            <span>Yes / हाँ</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="probationPeriod"
              checked={resumeForm.probationPeriod === false}
              onChange={() => setResumeForm(prev => ({ ...prev, probationPeriod: false }))}
              className="text-orange-500"
            />
            <span>No / नहीं</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Preferences / प्राथमिकताएं</Label>
        
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type / व्यवसाय का प्रकार</Label>
          <Select value={resumeForm.businessType} onValueChange={(value) => handleSelectChange('businessType', value as BusinessType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="old">Old / पुराना</SelectItem>
              <SelectItem value="new">New / नया</SelectItem>
              <SelectItem value="any">Any / कोई भी</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="joiningType">Joining / शामिल होना</Label>
          <Select value={resumeForm.joiningType} onValueChange={(value) => handleSelectChange('joiningType', value as JoiningType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select joining type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate / तुरंत</SelectItem>
              <SelectItem value="specific">Specific Role / विशिष्ट भूमिका</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="readyForTraining">Ready to Take Up Training / प्रशिक्षण लेने के लिए तैयार</Label>
          <Select value={resumeForm.readyForTraining} onValueChange={(value) => handleSelectChange('readyForTraining', value as TrainingReadiness)}>
            <SelectTrigger>
              <SelectValue placeholder="Select training readiness" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes / हाँ</SelectItem>
              <SelectItem value="no">No / नहीं</SelectItem>
              <SelectItem value="try">Try / कोशिश करें</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="candidateConsent"
            checked={resumeForm.candidateConsent}
            onCheckedChange={(checked) => 
              setResumeForm(prev => ({ ...prev, candidateConsent: checked as boolean }))
            }
            required
          />
          <Label htmlFor="candidateConsent">Candidate Consent / उम्मीदवार की सहमति *</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="resumeFile">Share your Resume / अपना रिज्यूमे साझा करें</Label>
        <Input 
          id="resumeFile" 
          type="file" 
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Button 
            type="button" 
            onClick={() => setCurrentStep(2)}
            variant="outline"
            className="w-full py-3 px-4 rounded-md text-lg transition-colors"
          >
            ← Previous
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md text-lg transition-colors shadow-md"
          >
            {isLoading ? 'Submitting...' : 'Submit Resume / जमा करें'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      id="get-a-job"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex-1"
    >
      <Card className="p-8 rounded-2xl shadow-xl border-0 bg-gradient-to-br from-orange-50 to-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Submit Resume: Get a Job 👩‍🍳</h2>
          <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
