import { UserID } from "common/dist";
import Barline, { VolumeRow } from "./Barline";
import { Stack } from "@mui/material";

interface BarLineVisualizerProps {
  author: UserID;
}

/**
 * A component that groups together all the components of a single user's BarLine
 *
 * Contains text for the User who owns it, the Barline which contains the SingleNotes, and the VolumeRow
 */
const BarLineVisualizer: React.FC<BarLineVisualizerProps> = ({ author }) => {
  return (
    <>
      <p>Barline of {author}</p>
      <Stack spacing={4} paddingBottom={6}>
        <Barline author={author} />
        <VolumeRow author={author} />
      </Stack>
    </>
  );
};

export default BarLineVisualizer;
