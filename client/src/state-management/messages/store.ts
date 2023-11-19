import { create } from "zustand";
import { Message } from "../reducers/messagesReducer";

interface MessagesStore {
  messages: Message[];
  add: (message: Message) => void;
}

const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  add: (message) =>
    set((store) => ({ messages: [message, ...store.messages] })),
}));

export default useMessagesStore;
