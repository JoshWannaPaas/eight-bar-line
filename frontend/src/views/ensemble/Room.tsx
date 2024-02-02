import { FC, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import BarLineVisualizer from "../../ui-components/barline/BarLineVisualizer";
import { useParams } from "react-router-dom";
import Metronome from "./Metronome";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Instrument } from "common/dist/ensembles/Note";
import { socketAtom, userIDSelector } from "../../recoil/socket";
import { ensembleAtom } from "../../recoil/ensemble";

const EnsembleView: FC = () => {
  const roomCode = useParams();
  const { state, contents: socket } = useRecoilValueLoadable(socketAtom);
  const currentEnsemble = useRecoilValue(ensembleAtom);

  const changeInstrumentHandler = (e: SelectChangeEvent<Instrument>) => {
    if (typeof e.target.value === "string") return;
    if (state !== "hasValue") return;
    socket.emit("ensemble:set-instrument", e.target.value);
  };

  const userID = useRecoilValue(userIDSelector);
  const currentUsers = useRecoilValue(ensembleAtom).getMembers();

  // Tell the server you've left the room when you navigate away
  useEffect(() => {
    return () =>{
      socket.emit("room:leave");
    }
  }, [])

  return (
    <main>
      {/* Top Line for Instrument Settings, Title, and Room Settings */}
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        paddingTop="1%"
        textAlign="center"
      >
        <Item>
          <h3>Instrument Settings</h3>
          <Box sx={{ width: "50%", marginTop: "5px", marginBottom: "20px" }}>
            <FormControl fullWidth>
              <InputLabel>Instrument</InputLabel>
              <Select
                value={currentEnsemble.getInstrument(userID)}
                label="instrument"
                onChange={changeInstrumentHandler}
                fullWidth
                size="small"
              >
                <MenuItem value={Instrument.FLUTE}>Flute</MenuItem>
                <MenuItem value={Instrument.ALTO_SAX}>Alto Sax</MenuItem>
                <MenuItem value={Instrument.MARIMBA}>Marimba</MenuItem>
                <MenuItem value={Instrument.GUITAR}>Guitar</MenuItem>
                <MenuItem value={Instrument.BASS}>Bass</MenuItem>
                <MenuItem value={Instrument.TUBA}>Tuba</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Metronome />
        </Item>
        <Box>
          <h2>Ensemble</h2>
          <h3>Play Together</h3>
        </Box>
        <Item>
          <h3>Room Settings</h3>
          <p>Room Code: {roomCode.roomCode}</p>
          <p>User ID: {userID}</p>
        </Item>
      </Stack>

      {/* Your play area */}
      <Container
        sx={{
          margin: "auto",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        {currentUsers.map((currentUser) => (
          <BarLineVisualizer key={currentUser} author={currentUser} />
        ))}
      </Container>
    </main>
  );
};

export default EnsembleView;

// Taken from https://mui.com/material-ui/react-grid/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: "1px",
  paddingBottom: "25px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  minWidth: "17%",
  color: theme.palette.text.secondary,
}));
