import { useRecoilValueLoadable } from "recoil";
import { socketAtom } from "../recoil/socket";
import { useEffect, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Ping: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // The `state` will tell you if the socket has connected or not:
  // => "loading" if socket is undefined (the frontend has not connected to the backend yet)
  // => "hasValue" if socket is defined (the frontend has connected to the backend)
  const { state, contents: socket } = useRecoilValueLoadable(socketAtom);

  useEffect(() => {
    // I need to check if we have the value before we continue to do anything
    if (state !== "hasValue") return undefined;

    /** An event handler that is called when the server sends a Pong to the client */
    const pongHandler = (serverMessage: string) => {
      setOpen(true);
      setMessage(serverMessage);
    };

    socket.emit("ping", "Hello World");
    socket.on("pong", pongHandler);
    // This function will be called when the component unmounts.
    // When it unmounts, we want to remove the event listener(s) we set up earlier.
    return () => {
      socket.off("pong", pongHandler);
    };
  }, [socket, state]);
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setOpen(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};
export default Ping;
