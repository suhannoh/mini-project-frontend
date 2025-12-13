import { create } from "zustand";
import { persist } from "zustand/middleware";

const AuthStore = create(
  persist (
    (set) => ({
    user: null,  
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
}),
{
      name: "auth-storage", // localStorage key
    }
));
  
export default AuthStore;