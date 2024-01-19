import { FC, useCallback, useEffect, useState } from "react";
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
import BarLineVisualizer from "./barline/BarLineVisualizer";
import { useParams } from "react-router-dom";
import Metronome from "./Metronome";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentInstrumentAtom } from "../../recoil/instrument";
import { Instrument } from "common/dist/ensembles/Note";
import { userIDSelector } from "../../recoil/socket";
import { userListAtom } from "../../recoil/ensemble";

const EnsembleView: FC = () => {
  const roomCode = useParams();

  const [instrument, setInstrument] = useRecoilState(currentInstrumentAtom);
  const changeInstrumentHandler = (e: SelectChangeEvent<Instrument>) => {
    if (typeof e.target.value === "string") return;
    setInstrument(e.target.value);
  };

  // const { state, contents: socket } = useRecoilValueLoadable(socketAtom);
  const userID = useRecoilValue(userIDSelector);
  // const currentEnsemble = useRecoilState(ensembleAtom);
  const currentUsers = useRecoilValue(userListAtom);
  
  console.log("Local's users: ", currentUsers)
  
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
                value={instrument}
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
          marginTop: "2%",
          alignSelf: "center",
          alignItems: "center",
          padding: "0px",
        }}
      >
        {  currentUsers.map((currentUser) => (
            <BarLineVisualizer key={currentUser} author={currentUser} />
          ))
        }
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
