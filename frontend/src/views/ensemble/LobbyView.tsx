import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useRecoilValueLoadable } from "recoil";
import { socketAtom } from "../../recoil/socket";
import { useNavigate } from "react-router-dom";

// <Stack> is the same as <Box display='flex' flexDirection='column'>

const LobbyView: FC = () => {
  const stackSpacing = 3;
  const navigate = useNavigate();
  const { state, contents: socket } = useRecoilValueLoadable(socketAtom);

  // if(state !==)

  const onCreateRoom = () => {
    // Tell server you're making a new room
    if (state !== "hasValue") return undefined; // Check if youre talking to the server AKA socket has value
    socket.emit("room:create", (roomCode) => {
      navigate(roomCode);
      // Server creates an inactive room code and gives it to client

      // Client takes the room code and navigates to the Ensemble
    });

    return undefined;
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" gap={10} sx={{ my: 10 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Stack spacing={stackSpacing}>
            <Typography textAlign="center">Join a Room</Typography>
            <TextField label="Room Code" InputProps={{}} />
            <TextField label="Password" />
            <Button variant="outlined">Join</Button>
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
