import { useEffect } from "react";
import "./App.css";
import Routes from "./routes";
import { Container, CssBaseline } from "@mui/material";
import { Socket, io } from "socket.io-client";
import {
  ClientToServerEvents,
  DEFAULT_SERVER_PORT,
  ServerToClientEvents,
} from "common/dist";

function App() {
  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `localhost:${DEFAULT_SERVER_PORT}`
    );
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <body>
      <CssBaseline />
      <Container id="titlebar">
        <h1 id="title">8Bar Line</h1>
      </Container>
      <Routes />
    </body>
  );
}

export default App;
