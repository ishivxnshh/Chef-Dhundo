import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Temporary interface for raw Notion data
interface RawNotionUser {
  id: string;
  properties: Record<string, unknown>;
  [key: string]: unknown;
}

// Store state interface
interface UserState {
  users: RawNotionUser[];
  isLoading: boolean;
  error: string | null;
  currentUserRole: string;
  isRoleLoaded: boolean;
  
  // Actions
  fetchUsers: () => Promise<void>;
  setCurrentUserRole: (role: string) => void;
  setRoleLoaded: (loaded: boolean) => void;
  clearError: () => void;
  clearUsers: () => void;
  clearCurrentUser: () => void;
}

// Create the store
export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      users: [],
      isLoading: false,
      error: null,
      currentUserRole: 'basic',
      isRoleLoaded: false,

      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          // console.log('🔍 Store: Fetching all users from API...');
          const response = await fetch('/api/user');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const rawUsers: RawNotionUser[] = await response.json();
                      // console.log('✅ Store: Raw API response:', rawUsers);
            // console.log('✅ Store: First user properties:', rawUsers[0]?.properties);
          set({ users: rawUsers, isLoading: false });
        } catch (error) {
          console.error('❌ Store: Error fetching users:', error);
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred', 
            isLoading: false 
          });
        }
      },

      setCurrentUserRole: (role: string) => {
        // console.log('🎭 Store: Setting current user role to:', role);
        set({ currentUserRole: role });
      },

      setRoleLoaded: (loaded: boolean) => {
        // console.log('📊 Store: Setting role loaded to:', loaded);
        set({ isRoleLoaded: loaded });
      },

      clearError: () => {
        set({ error: null });
      },

      clearUsers: () => {
        set({ users: [] });
      },

      clearCurrentUser: () => {
        // console.log('🧹 Store: Clearing current user data');
        set({ currentUserRole: 'basic', isRoleLoaded: false });
      },
    }),
    {
      name: 'user-store',
    }
  )
);

// Selector hooks for better performance
export const useUsers = () => useUserStore(state => state.users);
export const useUserLoading = () => useUserStore(state => state.isLoading);
export const useUserError = () => useUserStore(state => state.error);
export const useCurrentUserRole = () => useUserStore(state => state.currentUserRole);
export const useIsRoleLoaded = () => useUserStore(state => state.isRoleLoaded);
