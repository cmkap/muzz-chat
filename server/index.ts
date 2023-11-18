import express, { Express } from "express";
import { Server as SocketIOServer, Socket } from "socket.io";
import http from "http";
import helmet from "helmet";
import cors from "cors";

const app: Express = express();
const server: http.Server = http.createServer(app);

const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let onlineUsers: any = [];

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => res.send("hi"));

io.on("connect", (socket) => {
  // Listen for the "addNewUser" event from the connected client
  socket.on("addNewUser", (userId) => {
    // Check if the user is not already in the list of online users
    if (!onlineUsers.some((user: any) => user.userId === userId)) {
      // If not, add the user to the list
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });


    }

    io.emit("getOnlineUsers", onlineUsers);

    socket.on("sendMessage", (message) => {
  
      const user = onlineUsers.find(
        (u: any) => u.userId === message.recipientId
      );



      if (user) {
        io.to(user.socketId).emit("getMessage", message);
      }

    });
    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((u: any) => u.socketId !== socket.id);

      io.emit("getOnlineUsers", onlineUsers);
    });
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});


