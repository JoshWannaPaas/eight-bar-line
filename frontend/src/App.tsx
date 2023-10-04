import { useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { DEFAULT_SERVER_PORT } from "common/dist";
import Routes from "./routes";
import { Container, CssBaseline } from "@mui/material";

function App() {
  useEffect(() => {
    const socket = io(`localhost:${DEFAULT_SERVER_PORT}`);
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
