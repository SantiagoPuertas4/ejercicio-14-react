import { create } from "zustand";
import { decodeJWT } from "../utilities/decodeJWT";

let user = null;
let isLoggedIn = false;

const token = sessionStorage.getItem("token");

if (token) {
  const userData = decodeJWT(token).user;
  user = userData;
  isLoggedIn = true;
}

export const useSession = create((set) => {
  return {
    user: user,
    isLoggedIn: isLoggedIn,
    login: (newUser) => {
      set({ user: newUser, isLoggedIn: true });
    },
    logout: () => {
      sessionStorage.removeItem("token");
      set({ user: null, isLoggedIn: false });
    },
  };
});
