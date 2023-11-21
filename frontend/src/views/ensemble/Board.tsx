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
        <SingleRow pitch={n} key={`note-pitch-${n}`} />
      ))}
    </Box>
  );
};
export default Board;

interface SingleRowProps {
  pitch: number;
}
const SingleRow: React.FC<SingleRowProps> = ({ pitch }) => {
  return (
    <Box display="flex">
      {_.range(boardWidth).map((n) => (
        <SingleNote beatNumber={n} pitch={pitch} key={`note-number-${n}`} />
      ))}
    </Box>
  );
};

export const VolumeRow: React.FC = () => {
  return (
    <Box display="flex">
      {_.range(boardWidth).map((n) => (
        <SingleNote pitch={-1} beatNumber={n} key={`note-volume-${n}`} />
      ))}
    </Box>
  );
};
