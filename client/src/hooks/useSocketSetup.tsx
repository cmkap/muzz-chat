import { useEffect, useCallback } from "react";
import socket from "../socket";
import { Message } from "../state-management/messages/store";
import useMessagesStore from "../state-management/messages/store";
import useOnlineUsersStore, { OnlineUser } from "../state-management/onlineUsers/store";
import { User } from "../utils/userProfiles";

const useSocketSetup = (user: User) => {
  const { add } = useMessagesStore();
  const { add: addOnline } = useOnlineUsersStore();

  const handleMessage = useCallback((msg: Message) => {
    console.log("Received message:", msg);
    add({ ...msg });
  }, [add]);

  useEffect(() => {
    const handleGetOnlineUsers = (res: OnlineUser[]) => {
      console.log("Received online users:", res);
      addOnline(res);
    };

    socket.connect();
    socket.emit("addNewUser", user?.id);

    socket.on("getOnlineUsers", handleGetOnlineUsers);

    socket.on("connect_error", () => {
      // Handle logout or other actions on connect_error
      console.log("logout");
    });

    return () => {
      socket.off("getOnlineUsers", handleGetOnlineUsers);
      socket.off("connect_error");
    };
  }, [user, addOnline]);

  useEffect(() => {
    const handleGetMessage = (msg: Message) => {
      console.log("Received message:", msg);
      handleMessage(msg);
    };

    if (socket === null) return;

    socket.on("getMessage", handleGetMessage);

    return () => {
      socket.off("getMessage", handleGetMessage);
    };
  }, [handleMessage]);

 
};

export default useSocketSetup;
