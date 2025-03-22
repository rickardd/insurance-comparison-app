import { create } from "zustand";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
}));

// Subscribe to Firebase auth state changes
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
  useAuthStore.setState({ loading: false });
});
