import { FC } from "react";
import "./index.css";
import { Box, Container, Paper, Stack, styled } from "@mui/material";
import _ from "lodash";

const EnsembleView: FC = () => {
  return (
    <main>
      {/* Top Line for Instrument Settings, Title, and Room Settings */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        maxWidth="md"
        m="auto"
      >
        <Item>
          <h3>Instrument Settings</h3>
          <p>placeholder</p>
        </Item>
        <Box>
          <p>Ensemble</p>
          <p>Play Together</p>
        </Box>
        <Item>
          <h3>Room Settings</h3>
          <p>placeholder</p>
        </Item>
      </Stack>

      {/* Your play area */}
      <Container id="playerSelf">
        <Board></Board>
      </Container>
    </main>
  );
};

export default EnsembleView;

// Taken from https://mui.com/material-ui/react-grid/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// consts for calculating board, not including volume bar
const boardWidth = 32; // 8 bars of 4 quarter notes = 32 note placements
const boardHeight = 8; // 8 Notes from C -> C

// temp name for music editor area
const Board: React.FC = () => {
  return (
    <Container>
      {_.range(boardHeight).map((n) => (
        <SingleRow key={`note-pitch-${n}`} />
      ))}
    </Container>
  );
};

const SingleRow: React.FC = () => {
  return (
    <RowContainer>
      {_.range(boardWidth).map((n) => (
        <SingleNote key={`note-number-${n}`} />
      ))}
    </RowContainer>
  );
};

const RowContainer = styled(Container)({
  display: "flex",
});

const SingleNote = styled(Box)({
  width: 32,
  height: 32,
  backgroundColor: "lightblue",
  margin: "1px",
  display: "block",
});
