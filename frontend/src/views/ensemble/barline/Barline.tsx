import { Box } from "@mui/material";
import _ from "lodash";
import SingleNote from "./SingleNote";
import { BarLine, UserID } from "common/dist";

// consts for calculating barline, not including volume bar
const BARLINE_WIDTH = BarLine.COLS; // 8 bars of 4 quarter notes = 32 note placements
const BARLINE_HEIGHT = BarLine.ROWS; // 8 Notes from C -> C

interface BarlineProps {
  author: UserID;
}

// temp name for music editor area
const Barline: React.FC<BarlineProps> = ({ author }) => {
  return (
    <>
      <p>Barline of {author}</p>
      <Box>
        {_.range(BARLINE_HEIGHT).map((n) => (
          <SingleRow author={author} pitch={n} key={`note-pitch-${n}`} />
        ))}
      </Box>
    </>
  );
};
export default Barline;

interface SingleRowProps {
  pitch: number;
  author: UserID;
}
const SingleRow: React.FC<SingleRowProps> = ({ pitch, author }) => {
  return (
    <Box display="flex">
      {_.range(BARLINE_WIDTH).map((n) => (
        <SingleNote
          author={author}
          beatNumber={n}
          pitch={pitch}
          key={`note-number-${n}`}
        />
      ))}
    </Box>
  );
};

interface VolumeRowProps {
  author: UserID;
}

// Change this to its own component (VolumeNote, etc) independent of pitch
export const VolumeRow: React.FC<VolumeRowProps> = ({ author }) => {
  return (
    <Box display="flex">
      {_.range(BARLINE_WIDTH).map((n) => (
        <SingleNote
          author={author}
          pitch={0}
          beatNumber={n}
          key={`note-volume-${n}`}
        />
      ))}
    </Box>
  );
};
