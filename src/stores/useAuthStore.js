import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set) => ({
    isLogin: false,

    login: () => set({ isLogin: true }),
    logout: () => set({ isLogin: false }),
  })),
);
