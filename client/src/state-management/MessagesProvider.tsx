import { ReactNode, useReducer } from "react";
import messagesReducer from "./reducers/messagesReducer";
import MessageContext from "./contexts/messagesContext";

interface Props {
  children: ReactNode;
}
const MessagesProvider = ({ children }: Props) => {
  const [messages, dispatch] = useReducer(messagesReducer, []);
  return (
    <MessageContext.Provider value={{ messages, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessagesProvider;
