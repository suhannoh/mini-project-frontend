import { create } from "zustand";

const AuthStore = create(
    (set) => ({
    user: null,            // ✅ 로그인 유저 정보
    isLogin: false,

  login: (userData) =>
    set({
      user: userData,
      isLogin: true,
    }),

  logout: () =>
    set({
      user: null,
      isLogin: false,
    }),
}));

export default AuthStore;