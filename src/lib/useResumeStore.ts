import { create } from "zustand";
import { ChefDetails } from "./chef-store";

interface ResumeStore {
  isLoading: boolean;
  saveResume: (data: ChefDetails) => Promise<{ success: boolean; error?: string }>;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  isLoading: false,
  saveResume: async (data: ChefDetails) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/saveResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      set({ isLoading: false });

      return result;
    } catch (error) {
      console.error("Error saving resume:", error);
      set({ isLoading: false });
      return { success: false, error: "Failed to save resume" };
    }
  },
}));
