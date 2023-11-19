import { useEffect, useCallback } from "react";

import socket from "../socket";

import { Message } from "../state-management/reducers/messagesReducer";
import useMessagesStore from "../state-management/messages/store";
import useOnlineUsersStore from "../state-management/onlineUsers/store";
import { User } from "../utils/userProfiles";

const useSocketSetup = (user: User) => {
  const { add } = useMessagesStore();
  const {add: addOnline, onlineUsers } = useOnlineUsersStore()
  // const [onlineUsers, dispatch] = useReducer(onlinUsersReducer, []);

  const handleMessage = useCallback((msg: Message) => {
    // dispatchMessage({ type: "ADD", message: { ...msg } });
    console.log("res", msg)
    add({ ...msg });
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("addNewUser", user?.id);
    socket.on("getOnlineUsers", (res) => {
      // dispatch({ type: "ADD", onlineUsers: res });
      
      addOnline(res)

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
