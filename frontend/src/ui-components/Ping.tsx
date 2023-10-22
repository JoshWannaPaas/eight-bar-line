import { useRecoilValueLoadable } from "recoil";
import { socketAtom } from "../recoil/socket";
import { useEffect, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Ping: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { state, contents: socket } = useRecoilValueLoadable(socketAtom);

  useEffect(() => {
    if (state !== "hasValue") return console.log("Uh oh");
    socket.emit("ping", "Hello World");
    socket.on("pong", (msg) => {
      setOpen(true);
      setMessage(msg);
    });
    return undefined;
  }, [state, socket, setMessage, setOpen]);
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
