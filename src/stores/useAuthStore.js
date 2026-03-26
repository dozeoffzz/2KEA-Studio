import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  // 회원이 아닐 때 기본 세팅
  persist((set) => ({
    isLogin: false,
    token: null,
    userInfo: null,
    // 로그인 했을때 저장 값들
    login: (token, userInfo) =>
      set({
        isLogin: true,
        token,
        userInfo,
      }),
    logout: () =>
      set({
        isLogin: false,
        token: null,
        userInfo: null,
      }),
  })),
  { name: "auth-storage" },
);
