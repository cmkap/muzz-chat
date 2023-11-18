import { io, Socket } from "socket.io-client";

const socketOptions = {
  autoConnect: false,
  withCredentials: true,
};

const socket: Socket = io("http://localhost:4000", socketOptions);

export default socket;
