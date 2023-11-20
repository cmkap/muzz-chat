import { create } from "zustand";
export interface OnlineUser {
    id: string;
    socketId: string;
  }
  

interface OnlineUsersStore {
  onlineUsers: OnlineUser[];
  add: (onlineUser: OnlineUser[]) => void;
}

const useOnlineUsersStore = create<OnlineUsersStore>((set) => ({
  onlineUsers: [],
  add: (onlineUser) =>
    set(() => ({ onlineUsers: [...onlineUser] })),
}));

export default useOnlineUsersStore;
