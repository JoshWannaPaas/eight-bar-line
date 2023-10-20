import { FC } from "react";
import "./index.css";
import { Box, Container, Paper, Stack, styled } from "@mui/material";
import Divider from '@mui/material/Divider'
import _ from "lodash";

const EnsembleView: FC = () => {
  return (
    <main>
      {/* Top Line for Instrument Settings, Title, and Room Settings */}
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="space-evenly"
        alignItems="center"
        paddingTop="1%"
        textAlign="center"
      >
        <Item>
          <h3>Instrument Settings</h3>
          <p>placeholder</p>
        </Item>
        <Box>
          <h2>Ensemble</h2>
          <h3>Play Together</h3>
        </Box>
        <Item>
          <h3>Room Settings</h3>
          <p>placeholder</p>
        </Item>
      </Stack>

      {/* Your play area */}
      <Container id="playerSelf">
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
  // textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "baseline",
  minWidth: "20%",
  color: theme.palette.text.secondary,
}));

// consts for calculating board, not including volume bar
const boardWidth = 32; // 8 bars of 4 quarter notes = 32 note placements
const boardHeight = 8; // 8 Notes from C -> C

// temp name for music editor area
const Board: React.FC = () => {
  return (
    <Box>
      {_.range(boardHeight).map((n) => (
        <SingleRow key={`note-pitch-${n}`} />
      ))}
    </Box>
  );
};

const SingleRow: React.FC = () => {
  return (
    <RowBox>
      {_.range(boardWidth).map((n) => (
        <SingleNote key={`note-number-${n}`} />
      ))}
    </RowBox>
  );
};

const VolumeRow: React.FC = () => {
  return (
    <RowBox>
      {_.range(boardWidth).map((n) => (
        <SingleNote key={`note-volume-${n}`} />
      ))}
    </RowBox>
  );
}

const RowBox = styled(Container)({
  display: "flex"
});

const SingleNote = styled(Box)({
  minWidth: 32,
  minHeight: 32,
  backgroundColor: "lightblue",
  margin: "2px",
});
