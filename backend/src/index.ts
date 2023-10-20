import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import {
  DEFAULT_SERVER_PORT,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "common/dist/index.js";
import registerRoomEvents from "./routes/rooms";

const PORT = process.env.PORT || DEFAULT_SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected to the server!");

  // A dummy endpoint that receives a message from the client and returns it
  socket.on("ping", (message) => {
    console.log("Received a ping from the client.");
    socket.emit("pong", `The server received: ${message}`);
  });

  registerRoomEvents(io, socket);
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
