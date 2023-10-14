import { useEffect } from "react";
import "./App.css";
import Routes from "./routes";
import { Socket, io } from "socket.io-client";
import {
  ClientToServerEvents,
  DEFAULT_SERVER_PORT,
  ServerToClientEvents,
} from "common/dist";
import { socketAtom } from "./recoil/socket";
import { useSetRecoilState } from "recoil";

function App() {
  const setSocket = useSetRecoilState(socketAtom);

  useEffect(() => {
    // Create a connection to the server, called a "socket"
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `localhost:${DEFAULT_SERVER_PORT}`,
    );
    // Save this connection to the `socketAtom` for other pages to use. 
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
      <Routes />
  );
}

export default App;


