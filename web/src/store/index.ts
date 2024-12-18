import { create } from "zustand";

interface ICentralStore {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useCentralStore = create<ICentralStore>((set) => ({
  isDarkMode: false,
  isLoading: false,
  setIsDarkMode: (value: boolean): void => {
    set(() => ({ isDarkMode: value }));
  },
  setIsLoading: (value: boolean): void => {
    set(() => ({ isLoading: value }));
  },
}));
