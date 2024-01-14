import { Box } from "@mui/material";
import _ from "lodash";
import SingleNote from "./SingleNote";

// consts for calculating barline, not including volume bar
const BARLINE_WIDTH = 32; // 8 bars of 4 quarter notes = 32 note placements
const BARLINE_HEIGHT = 8; // 8 Notes from C -> C

// temp name for music editor area
const Barline: React.FC = () => {
  return (
    <Box>
      {_.range(BARLINE_HEIGHT).map((n) => (
        <SingleRow pitch={n} key={`note-pitch-${n}`} />
      ))}
    </Box>
  );
};
export default Barline;

interface SingleRowProps {
  pitch: number;
}
const SingleRow: React.FC<SingleRowProps> = ({ pitch }) => {
  return (
    <Box display="flex">
      {_.range(BARLINE_WIDTH).map((n) => (
        <SingleNote beatNumber={n} pitch={pitch} key={`note-number-${n}`} />
      ))}
    </Box>
  );
};

export const VolumeRow: React.FC = () => {
  return (
    <Box display="flex">
      {_.range(BARLINE_WIDTH).map((n) => (
        <SingleNote pitch={-1} beatNumber={n} key={`note-volume-${n}`} />
      ))}
    </Box>
  );
};
