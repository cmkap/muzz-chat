import { useContext } from "react";
import MessageContext from "../state-management/contexts/messagesContext";

const useMessages = () => useContext(MessageContext)

export default useMessages