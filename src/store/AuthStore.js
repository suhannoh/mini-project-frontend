import { create } from "zustand";

const AuthStore = create(
    (set) => ({
    user: null,  
    isLogin: false,
    theme: false,

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
  toggleTheme: () =>
    set((state) => ({
      theme : !state.theme,
    })),
}));

export default AuthStore;