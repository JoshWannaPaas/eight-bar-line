import { UserID } from "common/dist";
import Barline, { VolumeRow } from "./Barline";

interface BarLineVisualizerProps {
  author: UserID;
}

const BarLineVisualizer: React.FC<BarLineVisualizerProps> = ({ author }) => {
  return (
    <>
      <Barline author={author} />
      <br />
      <VolumeRow author={author} />
    </>
  );
};

export default BarLineVisualizer;
