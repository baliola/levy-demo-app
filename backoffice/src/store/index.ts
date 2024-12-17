import { create } from "zustand";
import type { IUserLoggedInData } from "../interfaces/auth.interface";

interface ICentralStore {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;

  userLoggedIn: IUserLoggedInData | null | undefined;
  setUserLoggedIn: (value: IUserLoggedInData | null | undefined) => void;
}

export const useCentralStore = create<ICentralStore>()(
  (set) => ({
    isSidebarOpen: false,
    setIsSidebarOpen: (value: boolean): void => {
      set(() => ({ isSidebarOpen: value }));
    },
      
    userLoggedIn: undefined,
    setUserLoggedIn: (value: IUserLoggedInData | null | undefined): void => {
      set(() => ({ userLoggedIn: value }));
    },
  }),
)
