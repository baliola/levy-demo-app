import { create } from "zustand";
import { drawerTabs } from "@/config/data";
import type { INetworkItem, IWalletItem } from "@/types";

interface ICentralStore {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const useCentralStore = create<ICentralStore>((set) => ({
  isDarkMode: false,
  setIsDarkMode: (value: boolean): void => {
    set(() => ({ isDarkMode: value }));
  },
}));
