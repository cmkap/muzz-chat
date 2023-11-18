import { ReactNode, useReducer } from "react";
import onlineUsersReducer from "./reducers/onlineUsersReducer";
import OnlineUsersContext from "./contexts/onlineUsersContext";

interface Props {
  children: ReactNode;
}
const OnlineUsersProvider = ({ children }: Props) => {
  const [onlineUsers, dispatch] = useReducer(onlineUsersReducer, []);
  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, dispatch }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

export default OnlineUsersProvider;
