import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Raw Notion Resume interface for the saveResume API responses
export interface RawNotionSaveResume {
  id: string;
  properties: {
    Name?: {
      title: {
        plain_text: string;
      }[];
    };
    Email?: {
      email: string;
    };
    Mobile?: {
      phone_number: string;
    };
    Location?: {
      rich_text: {
        plain_text: string;
      }[];
    };
    Age?: {
      number: number;
    };
    Experience?: {
      rich_text: {
        plain_text: string;
      }[];
    };
    JobType?: {
      select: {
        name: string;
      };
    };
    Cuisines?: {
      rich_text: {
        plain_text: string;
      }[];
    };
    TotalExperienceYears?: {
      number: number;
    };
    CurrentPosition?: {
      rich_text: {
        plain_text: string;
      }[];
    };
    CurrentSalary?: {
      rich_text: {
        plain_text: string;
      }[];
    };
    ExpectedSalary?: {
      rich_text: {
        plain_text: string;
      }[];
    };
    PreferredLocation?: {
      rich_text: {
        plain_text: string;
      }[];
    };
    PassportNo?: {
      rich_text: {
        plain_text: string;
      }[];
    };
    ProbationPeriod?: {
      checkbox: boolean;
    };
    BusinessType?: {
      select: {
        name: string;
      };
    };
    JoiningType?: {
      select: {
        name: string;
      };
    };
    ReadyForTraining?: {
      select: {
        name: string;
      };
    };
    CandidateConsent?: {
      checkbox: boolean;
    };
  };
  created_time: string;
  last_edited_time: string;
}

// Interface for updating resume data
export interface UpdateResumeData {
  name?: string;
  mobile?: string;
  location?: string;
  age?: number;
  experience?: string;
  jobType?: string;
  cuisines?: string;
  totalExperienceYears?: number;
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
}

// Store state interface
interface SaveResumeState {
  resumes: RawNotionSaveResume[];
  isLoading: boolean;
  error: string | null;
  isUpdating: boolean;
  
  // Actions
  fetchSavedResumes: () => Promise<void>;
  updateResume: (resumeId: string, data: UpdateResumeData) => Promise<void>;
  clearError: () => void;
  clearResumes: () => void;
}

// Create the store
export const useSaveResumeStore = create<SaveResumeState>()(
  devtools(
    (set) => ({
      resumes: [],
      isLoading: false,
      error: null,
      isUpdating: false,

      fetchSavedResumes: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log('🔍 SaveResumeStore: Fetching all resumes from API...');
          const response = await fetch('/api/saveResume');
          if (!response.ok) {
            throw new Error('Failed to fetch resumes');
          }
          const rawResumes: RawNotionSaveResume[] = await response.json();
          console.log('✅ SaveResumeStore: Raw API response:', rawResumes);
          console.log('✅ SaveResumeStore: First resume properties:', rawResumes[0]?.properties);
          set({ resumes: rawResumes, isLoading: false });
        } catch (error) {
          console.error('❌ SaveResumeStore: Error fetching resumes:', error);
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred', 
            isLoading: false 
          });
        }
      },

      updateResume: async (resumeId: string, data: UpdateResumeData) => {
        set({ isUpdating: true, error: null });
        try {
          console.log('🔍 SaveResumeStore: Updating resume with ID:', resumeId);
          console.log('🔍 SaveResumeStore: Update data:', data);
          
          const response = await fetch(`/api/saveResume/${resumeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          
          if (!response.ok) {
            throw new Error('Failed to update resume');
          }
          
          const result = await response.json();
          console.log('✅ SaveResumeStore: Resume updated successfully:', result);
          
          // Refresh the resumes list to get updated data
          set({ isUpdating: false });
          // You might want to refetch the resumes here or update the local state
        } catch (error) {
          console.error('❌ SaveResumeStore: Error updating resume:', error);
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred while updating', 
            isUpdating: false 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      clearResumes: () => {
        set({ resumes: [] });
      },
    }),
    {
      name: 'save-resume-store',
    }
  )
);

// Selector hooks for better performance
export const useSaveResumes = () => useSaveResumeStore(state => state.resumes);
export const useSaveResumeLoading = () => useSaveResumeStore(state => state.isLoading);
export const useSaveResumeError = () => useSaveResumeStore(state => state.error);
export const useSaveResumeUpdating = () => useSaveResumeStore(state => state.isUpdating);

// Helper functions to extract data from the saveResume format
export function extractTitleText(title: { title: { plain_text: string }[] } | undefined): string {
  if (!title || !title.title) return '';
  return title.title.map(text => text.plain_text).join('');
}

export function extractRichText(richText: { rich_text: { plain_text: string }[] } | undefined): string {
  if (!richText || !richText.rich_text) return '';
  return richText.rich_text.map(text => text.plain_text).join('');
}

export function extractSelectValue(select: { select: { name: string } } | undefined): string {
  if (!select || !select.select) return '';
  return select.select.name;
}

export function extractEmail(email: { email: string } | undefined): string {
  if (!email || !email.email) return '';
  return email.email;
}

export function extractPhoneNumber(phone: { phone_number: string } | undefined): string {
  if (!phone || !phone.phone_number) return '';
  return phone.phone_number;
}

export function extractNumber(number: { number: number } | undefined): number {
  if (!number || number.number === null || number.number === undefined) return 0;
  return number.number;
}

export function extractCheckbox(checkbox: { checkbox: boolean } | undefined): boolean {
  if (!checkbox) return false;
  return checkbox.checkbox;
}