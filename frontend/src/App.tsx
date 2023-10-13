import { useEffect } from "react";
import "./App.css";
import Routes from "./routes";
import { Socket, io } from "socket.io-client";
import {
  ClientToServerEvents,
  DEFAULT_SERVER_PORT,
  ServerToClientEvents,
} from "common/dist";

function App() {
  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `localhost:${DEFAULT_SERVER_PORT}`,
    );
    return () => {
      socket.disconnect();
    };
  }, []);

  return <Routes />;
}

export default App;
