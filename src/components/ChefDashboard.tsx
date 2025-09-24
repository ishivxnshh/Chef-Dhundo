'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  ChefHat, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Star,
  Users,
  FileText,
  CheckCircle,
  TrendingUp,
  Heart
} from 'lucide-react';
import { useUserStore } from '@/store/userStore';
// import { useChefStore } from '@/lib/chef-store';
import { User } from '@/types/notion_database';

interface ChefProfile extends User {
  // Resume submission details
  location?: string;
  age?: string;
  mobile?: string;
  experience?: string;
  jobType?: string;
  cuisines?: string;
  totalExperienceYears?: string;
  currentPosition?: string;
  currentSalary?: string;
  expectedSalary?: string;
  preferredLocation?: string;
  passportNo?: string;
  probationPeriod?: boolean;
  businessType?: string;
  joiningType?: string;
  readyForTraining?: string;
  candidateConsent?: boolean;
  resumeFile?: File | null;
}

interface ChefDashboardProps {
  currentUser?: User | null;
}

export function ChefDashboard({ currentUser }: ChefDashboardProps) {
  const [chefs, setChefs] = useState<ChefProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get users from store
  const users = useUserStore(state => state.users);
  const fetchUsers = useUserStore(state => state.fetchUsers);
  
  // Get chef details from chef store
  //const chefDetails = useChefStore(state => state.chefDetails);

  useEffect(() => {
    const loadChefs = async () => {
      try {
        await fetchUsers();
        setLoading(false);
      } catch (error) {
        console.error('Error loading chefs:', error);
        setLoading(false);
      }
    };

    loadChefs();
  }, [fetchUsers]);

  useEffect(() => {
    // Combine user data with chef details
    const combinedChefs = users.map(user => ({
      id: user.id,
      name: ((user.properties?.name as Record<string, unknown>)?.title as Array<{ plain_text?: string }>)?.[0]?.plain_text || 'Unknown Chef',
      email: (user.properties?.email as Record<string, unknown>)?.email as string || '',
      role: (((user.properties?.role as Record<string, unknown>)?.select as Record<string, unknown>)?.name as string || 'basic') as 'basic' | 'pro',
      chef: (((user.properties?.chef as Record<string, unknown>)?.select as Record<string, unknown>)?.name as string || '') as 'yes' | 'no',
      photo: (user.properties?.photo as Record<string, unknown>)?.url as string || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Add mock resume data for demonstration
      location: 'Mumbai, Maharashtra',
      age: '28',
      mobile: '+91 98765 43210',
      experience: 'The Grand Hotel, Spice Kitchen, Royal Palace',
      jobType: 'full',
      cuisines: 'Indian, Chinese, Continental, Italian',
      totalExperienceYears: '5',
      currentPosition: 'Senior Chef at ABC Restaurant',
      currentSalary: '35,000',
      expectedSalary: '45,000',
      preferredLocation: 'Mumbai, Delhi, Bangalore',
      passportNo: 'A12345678',
      probationPeriod: true,
      businessType: 'any',
      joiningType: 'immediate',
      readyForTraining: 'yes',
      candidateConsent: true,
      resumeFile: null,
    }));
    
    setChefs(combinedChefs);
  }, [users]);

  // Log current user data when available
  useEffect(() => {
    if (currentUser) {
      console.log('👤 Current user data in ChefDashboard:', {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role
      });
    }
  }, [currentUser]);

  const getExperienceColor = (years: string) => {
    const yearNum = parseInt(years);
    if (yearNum >= 8) return 'bg-purple-100 text-purple-800';
    if (yearNum >= 5) return 'bg-blue-100 text-blue-800';
    if (yearNum >= 3) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-green-100 text-green-800';
      case 'part': return 'bg-orange-100 text-orange-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleBadge = (role: string) => {
    return role === 'pro' ? (
      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <Star className="w-3 h-3 mr-1" />
        Pro Chef
      </Badge>
    ) : (
      <Badge variant="secondary">Basic Chef</Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            👨‍🍳 Chef Talent Hub
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing culinary talent from around the world
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge className="bg-orange-100 text-orange-800">
              <TrendingUp className="w-4 h-4 mr-1" />
              {chefs.length} Active Chefs
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              Verified Profiles
            </Badge>
          </div>
        </motion.div>

        {/* Chef List */}
        <div className="space-y-6">
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Chef Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-20 h-20 border-4 border-orange-100">
                        <AvatarImage src={chef.photo} alt={chef.name} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl font-bold">
                          {chef.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {chef.name}
                        </h2>
                        <div className="flex items-center gap-3">
                          {getRoleBadge(chef.role)}
                          <Badge className={getExperienceColor(chef.totalExperienceYears || '0')}>
                            {chef.totalExperienceYears || '0'} Years Experience
                          </Badge>
                          <Badge className={getJobTypeColor(chef.jobType || '')}>
                            {chef.jobType === 'full' ? 'Full-time' : 
                             chef.jobType === 'part' ? 'Part-time' : 'Contract'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-500 hover:text-orange-600"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Contact Information */}
                    <Card className="bg-gray-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="truncate">{chef.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{chef.mobile}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{chef.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Age: {chef.age} years</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Professional Details */}
                    <Card className="bg-gray-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <ChefHat className="w-5 h-5" />
                          Professional Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Cuisine Specializations</h4>
                          <div className="flex flex-wrap gap-1">
                            {chef.cuisines?.split(',').map((cuisine, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {cuisine.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Current Position</h4>
                          <p className="text-gray-600 text-sm">{chef.currentPosition}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Experience History</h4>
                          <p className="text-gray-600 text-sm">{chef.experience}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Salary & Preferences */}
                    <Card className="bg-gray-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          Salary & Preferences
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Current:</span>
                            <p className="text-gray-600">₹{chef.currentSalary}</p>
                          </div>
                          <div>
                            <span className="font-medium">Expected:</span>
                            <p className="text-gray-600">₹{chef.expectedSalary}</p>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Preferred Location:</span>
                          <p className="text-gray-600 text-sm">{chef.preferredLocation}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Business Type:</span>
                            <span className="text-gray-600 capitalize">{chef.businessType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Joining:</span>
                            <span className="text-gray-600 capitalize">{chef.joiningType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Training Ready:</span>
                            <span className="text-gray-600 capitalize">{chef.readyForTraining}</span>
                          </div>
                        </div>
                        {chef.probationPeriod && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-600">Willing to serve probation period</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Chef
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                    <Button variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {chefs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ChefHat className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Chefs Found
            </h3>
            <p className="text-gray-500">
              Start by registering chefs to see them here
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}