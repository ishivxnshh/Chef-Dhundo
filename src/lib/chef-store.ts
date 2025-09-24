import { create } from 'zustand';

export type JobType = 'full' | 'part' | 'contract' | '';
export type BusinessType = 'old' | 'new' | 'any';
export type JoiningType = 'immediate' | 'specific';
export type TrainingReadiness = 'yes' | 'no' | 'try';

export interface ChefDetails {
  // Step 1 - Basic Information
  name: string;
  email: string;
  location: string;
  age: number | '';
  mobile: string;
  experience: string;
  jobType: JobType;
  
  // Step 2 - Professional Details
  cuisines: string;
  totalExperienceYears: number | '';
  currentPosition: string;
  currentSalary: string;
  expectedSalary: string;
  preferredLocation: string;
  passportNo: string;
  
  // Step 3 - Preferences & Consent
  probationPeriod: boolean;
  businessType: BusinessType;
  joiningType: JoiningType;
  readyForTraining: TrainingReadiness;
  candidateConsent: boolean;
  resumeFile: File | null;
}

interface ChefStore {
  chefDetails: ChefDetails | null;
  updateChefDetails: (details: ChefDetails) => void;
}

export const useChefStore = create<ChefStore>((set) => ({
  chefDetails: null,
  updateChefDetails: (details) => set({ chefDetails: details }),
})); 