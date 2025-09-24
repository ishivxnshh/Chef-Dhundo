import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RawNotionResume } from '@/types/notion_database';

// Helper functions for extracting data from Notion properties
export const extractPlainText = (richText: { rich_text?: Array<{ plain_text: string }> } | null | undefined): string => {
  if (!richText || !richText.rich_text) return '';
  return richText.rich_text.map((text) => text.plain_text).join('');
};

export const extractTitleText = (title: { title?: Array<{ plain_text: string }> } | null | undefined): string => {
  if (!title || !title.title) return '';
  return title.title.map((text) => text.plain_text).join('');
};

export const extractSelect = (select: { select?: { name: string } } | null | undefined): string => {
  if (!select || !select.select) return '';
  return select.select.name;
};

export const extractPhoneNumber = (phone: { phone_number?: string } | null | undefined): string => {
  if (!phone || !phone.phone_number) return '';
  return phone.phone_number;
};

export const extractMultiSelect = (multiSelect: { multi_select?: Array<{ name: string }> } | null | undefined): string[] => {
  if (!multiSelect || !multiSelect.multi_select) return [];
  return multiSelect.multi_select.map((item) => item.name);
};

export const extractNumber = (number: { number?: number } | null | undefined): number => {
  if (!number || typeof number.number !== 'number') return 0;
  return number.number;
};

// Store state interface
interface ResumeState {
  resumes: RawNotionResume[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchChefResumes: () => Promise<void>;
  clearError: () => void;
  clearResumes: () => void;
}

// Create the store
export const useResumeStore = create<ResumeState>()(
  devtools(
    (set) => ({
      resumes: [],
      isLoading: false,
      error: null,

      fetchChefResumes: async () => {
        set({ isLoading: true, error: null });
        try {
          // console.log('🔍 Store: Fetching all resumes from API...');
          const response = await fetch('/api/chef');
          if (!response.ok) {
            throw new Error('Failed to fetch resumes');
          }
          const rawResumes: RawNotionResume[] = await response.json();
                      // console.log('✅ Store: Raw API response:', rawResumes);
            // console.log('✅ Store: First resume properties:', rawResumes[0]?.properties);
          set({ resumes: rawResumes, isLoading: false });
        } catch (error) {
          console.error('❌ Store: Error fetching resumes:', error);
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred', 
            isLoading: false 
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
      name: 'resume-store',
    }
  )
);

// Selector hooks for better performance
export const useResumes = () => useResumeStore(state => state.resumes);
export const useResumeLoading = () => useResumeStore(state => state.isLoading);
export const useResumeError = () => useResumeStore(state => state.error);
