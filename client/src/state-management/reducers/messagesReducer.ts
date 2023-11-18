export interface Message {
  to: string
  from: string
  content: string
  timeStamp: number
}

interface AddMessage {
  type: "ADD";
  message: Message
}

export type MessageAction = AddMessage


const messagesReducer = (messages: Message[], action: MessageAction): Message[] => {
  switch(action.type) {
    case 'ADD':
      return [ action.message, ...messages]
    default: 
      return messages
  }
};

export default messagesReducer;
