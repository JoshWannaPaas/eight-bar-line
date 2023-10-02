import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { DEFAULT_SERVER_PORT } from "common/dist";

const PORT = process.env.PORT || DEFAULT_SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected to the server!");
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
