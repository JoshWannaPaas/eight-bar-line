import { FC, useEffect, useState } from "react";
import { Box, Button, Container, Paper, Stack, styled } from "@mui/material";
import Board, { VolumeRow } from "./Board";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { beatNumberAtom } from "../../recoil/beat";
import * as Tone from "tone";

const EnsembleView: FC = () => {
  const roomCode = useParams();

  console.log(roomCode);

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
          <p>placeholder</p>
          <Metronome />
        </Item>
        <Box>
          <h2>Ensemble</h2>
          <h3>Play Together</h3>
        </Box>
        <Item>
          <h3>Room Settings</h3>
          <p>Room Code: {roomCode.roomCode}</p>
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
        <Board />
        <br />
        <VolumeRow />
      </Container>
    </main>
  );
};

export default EnsembleView;

// Taken from https://mui.com/material-ui/react-grid/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  paddingLeft: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "baseline",
  minWidth: "20%",
  color: theme.palette.text.secondary,
}));

/**
 * This component is only responsible for incrementing the global beat number atom
 */
const Metronome: React.FC = () => {
  const setBeatNumber = useSetRecoilState(beatNumberAtom);
  const [playing, setPlaying] = useState(false);
  const toggleMetronome = async () => {
    await Tone.start();
    setPlaying(!playing);
  };
  useEffect(() => {
    if (!playing) return setBeatNumber(-1);
    const intervalId = setInterval(
      () => setBeatNumber((old) => (old + 1) % 32),
      200,
    );
    return () => clearInterval(intervalId);
  }, [playing, setBeatNumber]);

  return (
    <Button
      variant="contained"
      color={playing ? "success" : "primary"}
      onClick={toggleMetronome}
    >
      Toggle Metronome
    </Button>
  );
};
