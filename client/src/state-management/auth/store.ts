import { create } from "zustand";

interface User {
  id: string;
  name: string;
  isConnected: boolean;
}

interface AuthStore {
    user: User | null
    login: (credentials: User) => void;
}

const useAuthStore = create<AuthStore>(set => ({
    user: null,
    login: (credentials) => set(() => ({user: {...credentials}}))
}))

export default useAuthStore
