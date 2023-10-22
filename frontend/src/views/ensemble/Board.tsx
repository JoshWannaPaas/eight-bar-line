import { Box } from "@mui/material";
import _ from "lodash";
import SingleNote from "./SingleNote";

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
export default Board;

const SingleRow: React.FC = () => {
  return (
    <Box display="flex">
      {_.range(boardWidth).map((n) => (
        <SingleNote key={`note-number-${n}`} />
      ))}
    </Box>
  );
};

export const VolumeRow: React.FC = () => {
  return (
    <Box display="flex">
      {_.range(boardWidth).map((n) => (
        <SingleNote key={`note-volume-${n}`} />
      ))}
    </Box>
  );
};
