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
import registerRoomEvents from "./routes/rooms.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || DEFAULT_SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

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

// Serve the index.html file for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
