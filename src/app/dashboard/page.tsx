'use client'

import { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { useUserStore } from '@/store/userStore';
import { useSaveResumeStore, RawNotionSaveResume, UpdateResumeData } from '@/store/saveResumeStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Edit2, X, Check } from 'lucide-react';
//import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NotionUser {
  id: string;
  properties: {
    name?: { title?: { plain_text?: string }[] };
    email?: { email?: string };
    role?: { select?: { name?: string } };
    chef?: { select?: { name?: string } };
    photo?: { url?: string };
  };
}

// Interface for processed resume data
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

export default function DashboardPage() {
  const { user: clerkUser } = useUser();
  const { fetchUsers, users, isLoading, error } = useUserStore();
  const { fetchSavedResumes, resumes: savedResumes, isLoading: resumesLoading, error: resumesError, updateResume, isUpdating } = useSaveResumeStore();
  const [currentUser, setCurrentUser] = useState<NotionUser | null>(null);
  const [userResume, setUserResume] = useState<ChefResumeData | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<ChefResumeData>>({});
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);

  // Extract user data from Notion properties
  const getUserName = () => {
    if (!currentUser?.properties?.name?.title) return '';
    return currentUser.properties.name.title[0]?.plain_text || '';
  };

  const getUserEmail = useCallback(() => {
    return currentUser?.properties?.email?.email || '';
  }, [currentUser?.properties?.email?.email]);

  const getUserRole = () => {
    return currentUser?.properties?.role?.select?.name || '';
  };

  // const getUserPhoto = () => {
  //   return currentUser?.properties?.photo?.url || '';
  // };

  const getIsChef = useCallback(() => {
    return currentUser?.properties?.chef?.select?.name || '';
  }, [currentUser?.properties?.chef?.select?.name]);

  useEffect(() => {
    const loadAllUsers = async () => {
      try {
        // console.log('🔍 Fetching all users from database...');
        await fetchUsers();
        // console.log('✅ All users fetched successfully');
      } catch (error) {
        console.error('❌ Error fetching all users:', error);
      }
    };

    loadAllUsers();
  }, [fetchUsers, getIsChef]);

  // Find current user by comparing Clerk email with Notion data
  useEffect(() => {
    if (clerkUser?.emailAddresses?.[0]?.emailAddress && users.length > 0) {
      const userEmail = clerkUser.emailAddresses[0].emailAddress;
      // console.log('🔍 Looking for user with Clerk email:', userEmail);
      
      const foundUser = users.find((user: NotionUser) => {
        const notionEmail = user.properties?.email?.email;
        // console.log('🔍 Comparing with Notion email:', notionEmail);
        return notionEmail === userEmail;
      });

      if (foundUser) {
        // console.log('✅ Current user found in Notion:', foundUser);
        setCurrentUser(foundUser);
      } else {
        // console.log('❌ Current user not found in Notion for email:', userEmail);
        setCurrentUser(null);
      }
    }
  }, [clerkUser?.emailAddresses, users, getIsChef, getUserEmail]);

  // Fetch saved resumes if user is a chef
  useEffect(() => {
    if (currentUser && getIsChef() === 'yes') {
      console.log('🔍 User is a chef, fetching saved resumes...');
      fetchSavedResumes();
    }
  }, [currentUser, fetchSavedResumes, getIsChef]);

  // Find matching resume for the current user
  useEffect(() => {
    if (currentUser && savedResumes.length > 0 && getIsChef() === 'yes') {
      const userEmail = getUserEmail();
      console.log('🔍 Looking for resume with email:', userEmail);
      
      const matchingResume = savedResumes.find((resume: RawNotionSaveResume) => {
        const resumeEmail = resume.properties?.Email?.email;
        console.log('🔍 Comparing with resume email:', resumeEmail);
        return resumeEmail === userEmail;
      });

      if (matchingResume) {
        console.log('✅ Matching resume found:', matchingResume);
        const processedResume = processResumeData(matchingResume);
        setUserResume(processedResume);
        setCurrentResumeId(matchingResume.id);
      } else {
        console.log('❌ No matching resume found for email:', userEmail);
        setUserResume(null);
        setCurrentResumeId(null);
      }
    }
  }, [currentUser, savedResumes, getIsChef, getUserEmail]);

  // Console log all users whenever they change
  useEffect(() => {
    if (users.length > 0) {
      // console.log('📊 All users in database:', users);
      // console.log('📊 Total users count:', users.length);
      
      // Log the raw first user to see the actual structure
      // console.log('🔍 Raw first user object:', users[0]);
      // console.log('🔍 Raw first user keys:', Object.keys(users[0]));
      
      // users.forEach((user, index) => {
      //   console.log(`👤 User ${index + 1}:`, user);
      // });
    }
  }, [users]);

  // Process raw resume data to match ChefResumeData interface
  const processResumeData = (rawResume: RawNotionSaveResume): ChefResumeData => {
    return {
      name: rawResume.properties?.Name?.title?.[0]?.plain_text || '',
      email: rawResume.properties?.Email?.email || '',
      mobile: rawResume.properties?.Mobile?.phone_number || '',
      location: rawResume.properties?.Location?.rich_text?.[0]?.plain_text || '',
      age: rawResume.properties?.Age?.number,
      experience: rawResume.properties?.Experience?.rich_text?.[0]?.plain_text || '',
      jobType: rawResume.properties?.JobType?.select?.name || '',
      cuisines: rawResume.properties?.Cuisines?.rich_text?.[0]?.plain_text || '',
      totalExperienceYears: rawResume.properties?.TotalExperienceYears?.number,
      currentPosition: rawResume.properties?.CurrentPosition?.rich_text?.[0]?.plain_text || '',
      currentSalary: rawResume.properties?.CurrentSalary?.rich_text?.[0]?.plain_text || '',
      expectedSalary: rawResume.properties?.ExpectedSalary?.rich_text?.[0]?.plain_text || '',
      preferredLocation: rawResume.properties?.PreferredLocation?.rich_text?.[0]?.plain_text || '',
      passportNo: rawResume.properties?.PassportNo?.rich_text?.[0]?.plain_text,
      probationPeriod: rawResume.properties?.ProbationPeriod?.checkbox || false,
      businessType: rawResume.properties?.BusinessType?.select?.name || '',
      joiningType: rawResume.properties?.JoiningType?.select?.name || '',
      readyForTraining: rawResume.properties?.ReadyForTraining?.select?.name || '',
      candidateConsent: rawResume.properties?.CandidateConsent?.checkbox || false,
    };
  };

  const handleEditField = (fieldName: string, currentValue: unknown) => {
    setEditingField(fieldName);
    setEditValues({ [fieldName]: currentValue });
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  const handleSaveField = async (fieldName: string) => {
    if (!currentResumeId || !editValues[fieldName as keyof ChefResumeData]) {
      handleCancelEdit();
      return;
    }

    try {
      const updateData: UpdateResumeData = {
        [fieldName]: editValues[fieldName as keyof ChefResumeData]
      };

      await updateResume(currentResumeId, updateData);
      
      // Update local state
      if (userResume) {
        setUserResume({
          ...userResume,
          [fieldName]: editValues[fieldName as keyof ChefResumeData]
        });
      }
      
      setEditingField(null);
      setEditValues({});
    } catch (error) {
      console.error('Error saving field:', error);
    }
  };

  const renderField = (fieldName: string, label: string, value: unknown, type: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' = 'text', options?: string[]) => {
    const isEditing = editingField === fieldName;
    const editValue = editValues[fieldName as keyof ChefResumeData];

    return (
      <div className="flex items-center gap-4 mb-4">
        <Label className="font-medium text-gray-700 w-32">{label}:</Label>
        
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            {type === 'textarea' ? (
              <Textarea
                value={typeof editValue === 'string' ? editValue : ''}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                className="flex-1"
                rows={3}
              />
            ) : type === 'select' && options ? (
              <Select
                value={typeof editValue === 'string' ? editValue : ''}
                onValueChange={(value) => setEditValues({ ...editValues, [fieldName]: value })}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === 'checkbox' ? (
              <Checkbox
                checked={typeof editValue === 'boolean' ? editValue : false}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setEditValues({ ...editValues, [fieldName]: checked });
                  }
                }}
              />
            ) : (
              <Input
                type={type}
                value={type === 'number' ? (typeof editValue === 'number' ? editValue.toString() : '') : (typeof editValue === 'string' ? editValue : '')}
                onChange={(e) => {
                  const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
                  setEditValues({ ...editValues, [fieldName]: newValue });
                }}
                className="flex-1"
              />
            )}
            
            <Button
              size="sm"
              onClick={() => handleSaveField(fieldName)}
              disabled={isUpdating}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancelEdit}
              disabled={isUpdating}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={type === 'checkbox' ? (value ? 'Yes' : 'No') : String(value || '')}
              className="flex-1"
              readOnly
              disabled
            />
            
            {fieldName !== 'email' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditField(fieldName, value)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  if (isLoading || (getIsChef() === 'yes' && resumesLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || (getIsChef() === 'yes' && resumesError)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error || resumesError}</div>
      </div>
    );
  }

  // If user is a chef and has resume data, show editable form
  if (getIsChef() === 'yes' && userResume) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                My Resume Dashboard
              </CardTitle>
              <p className="text-gray-600 text-center">
                Update your resume information below
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h3>
                
                {renderField('name', 'Full Name', userResume.name)}
                {renderField('email', 'Email', userResume.email)} {/* Email is disabled */}
                {renderField('mobile', 'Mobile', userResume.mobile)}
                {renderField('location', 'Location', userResume.location)}
                {renderField('age', 'Age', userResume.age, 'number')}
                {renderField('passportNo', 'Passport No', userResume.passportNo)}
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Professional Information
                </h3>
                
                {renderField('currentPosition', 'Current Position', userResume.currentPosition)}
                {renderField('experience', 'Experience', userResume.experience, 'textarea')}
                {renderField('totalExperienceYears', 'Total Experience (Years)', userResume.totalExperienceYears, 'number')}
                {renderField('cuisines', 'Cuisines', userResume.cuisines, 'textarea')}
                {renderField('jobType', 'Job Type', userResume.jobType, 'select', ['Full-time', 'Part-time', 'Contract', 'Freelance'])}
                {renderField('businessType', 'Business Type', userResume.businessType, 'select', ['Restaurant', 'Hotel', 'Catering', 'Other'])}
              </div>

              {/* Salary Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Salary & Preferences
                </h3>
                
                {renderField('currentSalary', 'Current Salary', userResume.currentSalary)}
                {renderField('expectedSalary', 'Expected Salary', userResume.expectedSalary)}
                {renderField('preferredLocation', 'Preferred Location', userResume.preferredLocation)}
                {renderField('joiningType', 'Joining Type', userResume.joiningType, 'select', ['Immediate', '2 weeks', '1 month', '2 months', '3 months'])}
                {renderField('readyForTraining', 'Ready for Training', userResume.readyForTraining, 'select', ['Yes', 'No', 'Maybe'])}
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Additional Information
                </h3>
                
                {renderField('probationPeriod', 'Probation Period', userResume.probationPeriod, 'checkbox')}
                {renderField('candidateConsent', 'Candidate Consent', userResume.candidateConsent, 'checkbox')}
              </div>

              {isUpdating && (
                <div className="text-center text-blue-600">
                  Saving changes...
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If user is not a chef or doesn't have resume data, show regular dashboard
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        
        {currentUser ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700 w-16">Name:</span>
              <Input 
                value={getUserName()}
                className="w-64"
                readOnly
                disabled
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700 w-16">Email:</span>
              <Input 
                value={getUserEmail()}
                className="w-64"
                readOnly
                disabled
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700 w-16">Role:</span>
              <Input 
                value={getUserRole()}
                className="w-64"
                readOnly
                disabled
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700 w-16">Chef:</span>
              <Input 
                value={getIsChef()}
                className="w-64"
                readOnly
                disabled
              />
            </div>
            {getIsChef() === 'yes' && !userResume && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">No resume data found for your account.</p>
              </div>
            )}
            {/* <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700 w-16">Image:</span>
              <Avatar className="w-12 h-12">
                <AvatarImage src={getUserPhoto()} alt="User avatar" />
                <AvatarFallback className="bg-gray-200 text-gray-600">
                  {getUserName().charAt(0).toUpperCase() || '👤'}
                </AvatarFallback>
              </Avatar>
            </div> */}
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-orange-600">User not found in database</p>
            <p className="text-sm text-gray-500">Clerk email: {clerkUser?.emailAddresses?.[0]?.emailAddress}</p>
          </div>
        )}
        
      </div>
    </div>
  );
}
