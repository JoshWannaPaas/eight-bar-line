import { FC } from "react";
import { Box, Container, Paper, Stack, styled } from "@mui/material";
import Board, { VolumeRow } from "./Board";

const EnsembleView: FC = () => {
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
