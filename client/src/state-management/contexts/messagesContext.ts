import React, { Dispatch } from "react";
import { Message, MessageAction } from "../reducers/messagesReducer";

interface MessagesContextType {
  messages: Message[];
  dispatch: Dispatch<MessageAction>;
}

const MessageContext = React.createContext<MessagesContextType>(
  {} as MessagesContextType
);

export default MessageContext;
