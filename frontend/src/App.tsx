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
    const saveSocketToRecoil = () => setSocket(socket);
    socket.on("connect", saveSocketToRecoil);

    return () => {
      // Remove the "connect" event listener if we unmount too quickly
      socket.off("connect", saveSocketToRecoil);
      // If we did connect, we need to disconnect the socket
      socket.connected && socket.disconnect();
    };
  }, [setSocket]);

  return <Routes />;

}

export default App;
