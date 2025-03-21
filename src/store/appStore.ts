import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface AppState {
  selectedInsurances: string[];
  setSelectedInsurances: (ids: string[]) => void;
}

export const useAppStore = create<AppState>()(
  persist<AppState>(
    (set) => ({
      selectedInsurances: [],
      setSelectedInsurances: (ids) => {
        set({ selectedInsurances: ids });
      },
    }),
    {
      name: "insurance-storage", // Name of the item in local storage
      getStorage: () => localStorage, // Use local storage
    } as PersistOptions<AppState> // Explicitly define the type for PersistOptions
  )
);
