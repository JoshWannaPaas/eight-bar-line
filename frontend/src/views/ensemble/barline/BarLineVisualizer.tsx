import { UserID } from "common/dist";
import Barline, { VolumeRow } from "./Barline";
import { Stack } from "@mui/material";


interface BarLineVisualizerProps {
  author: UserID;
}

const BarLineVisualizer: React.FC<BarLineVisualizerProps> = ({ author }) => {
  return (
    <Stack spacing={4}>
      <Barline author={author} />
      <VolumeRow author={author} />
    </Stack>
  );
};

export default BarLineVisualizer;
