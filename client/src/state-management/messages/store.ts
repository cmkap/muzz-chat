import { create } from "zustand";
export interface Message {
    to: string
    from?: string
    content: string
    timeStamp: number
  }

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
