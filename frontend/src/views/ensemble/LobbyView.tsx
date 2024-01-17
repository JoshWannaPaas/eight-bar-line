import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { socketAtom, userIDSelector } from "../../recoil/socket";
import { useNavigate } from "react-router-dom";
import { ensembleAtom } from "../../recoil/ensemble";

// <Stack> is the same as <Box display='flex' flexDirection='column'>

const LobbyView: FC = () => {
  const stackSpacing = 3;
  const navigate = useNavigate();
  const { state, contents: socket } = useRecoilValueLoadable(socketAtom);
  const [currentEnsemble, setCurrentEnsemble] = useRecoilState(ensembleAtom);
  const userID = useRecoilValue(userIDSelector);
  const [joinRoomCode, setJoinRoomCode] = useState("");

  const onCreateRoom = () => {
    // Tell server you're making a new room
    if (state !== "hasValue") return undefined; // Check if youre talking to the server AKA socket has value
    socket.emit("room:create", (roomCode) => {
      navigate(roomCode);
      // Server creates an inactive room code and gives it to client
      currentEnsemble.joinRoom(userID);
      // Client takes the room code and navigates to the Ensemble
    });

    return undefined;
  };

  const onJoinRoom = () => {
    if (joinRoomCode === "") return;
    if (state !== "hasValue") return; // Check if youre talking to the server AKA socket has value
    // return () => currentEnsemble.leaveRoom(userID);
    console.log("Room Code: " + joinRoomCode)
    socket.emit("room:join", joinRoomCode);
    navigate(joinRoomCode);
    currentEnsemble.joinRoom(userID);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" gap={10} sx={{ my: 10 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={stackSpacing}>
            <Typography textAlign="center">Join a Room</Typography>
            <TextField
              value={joinRoomCode}
              label="Room Code"
              InputProps={{}}
              onChange={e => {setJoinRoomCode(e.target.value)}}
            />
            <TextField label="Password" />
            <Button variant="outlined" onClick={onJoinRoom}>
              Join
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack
            spacing={stackSpacing}
            justifyContent="space-between"
            height="100%"
          >
            <Stack spacing={stackSpacing}>
              <Typography textAlign="center">Create a Room</Typography>
              <TextField label="Password" />
            </Stack>
            <Button variant="outlined" onClick={onCreateRoom}>
              Create
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default LobbyView;
