import { useEffect, useCallback, useReducer } from "react";

import socket from "../socket";

import { Message } from "../state-management/reducers/messagesReducer";
import onlinUsersReducer from "../state-management/reducers/onlineUsersReducer";

const useSocketSetup = (user, dispatchMessage) => {
  const [onlineUsers, dispatch] = useReducer(onlinUsersReducer, []);

  const handleMessage = useCallback((msg: Message) => {
    dispatchMessage({ type: "ADD", message: { ...msg } });
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("addNewUser", user?.id);
    socket.on("getOnlineUsers", (res) => {
      dispatch({ type: "ADD", onlineUsers: res });
    });

    socket.on("connect_error", () => {
      // logout user
      console.log("logout");
    });
    return () => {
      socket.off("getOnlineUsers");
      socket.off("connect_error");
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", handleMessage);
    return () => socket.off("getMessage");
  }, []);

  return { onlineUsers };
};

export default useSocketSetup;
