import { create } from "zustand";
import { OnlineUser } from "../reducers/onlineUsersReducer";

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
