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

function App() {
  const setSocket = useSetRecoilState(socketAtom);
  const palette = useRecoilValue(paletteAtom);
  const currentFavicon = paletteDict[palette].icon;

  useEffect(() => {
    // Create a connection to the server, called a "socket"
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `localhost:${DEFAULT_SERVER_PORT}`,
      {
        auth: (cb) => {
          cb({ token: localStorage.token });
        },
      },
    );

    // Save this connection to the `socketAtom` for other pages to use.
    const saveSocketToRecoil = () => {
      setSocket(socket);
      console.log(socket.recovered);
    };
    socket.on("connect", saveSocketToRecoil);

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
