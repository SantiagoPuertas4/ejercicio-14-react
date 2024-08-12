import { create } from "zustand";

export const useSession = create((set) => {
  return {
    user: null,
    isLoggedIn: false,
    login: (newUser) => {
      set({ user: newUser, isLoggedIn: true });
    },
    logout: () => {
      set({ user: null, isLoggedIn: false });
    },
  };
});
