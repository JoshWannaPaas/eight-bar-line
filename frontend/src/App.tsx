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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { paletteAtom } from "./recoil/palette";
import { paletteDict } from "./ui-components/Palette";

const HOST = import.meta.env.BASE_URL ?? `localhost:${DEFAULT_SERVER_PORT}`;

function App() {
  const setSocket = useSetRecoilState(socketAtom);
  const palette = useRecoilValue(paletteAtom);
  const currentFavicon = paletteDict[palette].icon;

  useEffect(() => {
    // Create a connection to the server, called a "socket"
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      HOST,
      {
        auth: (cb) => cb({ token: sessionStorage.token }),
      },
    );

    // Save this connection to the `socketAtom` for other pages to use.
    const saveSocketToRecoil = () => {
      setSocket(socket);
    };
    socket.on("connect", saveSocketToRecoil);
    socket.on("give-token", (token) => {
      sessionStorage.token = token;
    });

    return () => {
      // Remove the "connect" event listener if we unmount too quickly
      socket.off("connect", saveSocketToRecoil);
      // If we did connect, we need to disconnect the socket
      socket.connected && socket.disconnect();
    };
  }, [setSocket]);

  return (
    <>
      <link id="favicon" rel="icon" type="image/x-icon" href={currentFavicon} />
      <Routes />
    </>
  );
}

export default App;
