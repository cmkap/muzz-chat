import React, { Dispatch } from "react";
import { OnlineUser, OnlineUserAction } from "../reducers/onlineUsersReducer";

interface OnlineUsersContextType {
  onlineUsers: OnlineUser[];
  dispatch: Dispatch<OnlineUserAction>;
}

const OnlineUserContext = React.createContext<OnlineUsersContextType>(
  {} as OnlineUsersContextType
);

export default OnlineUserContext;
