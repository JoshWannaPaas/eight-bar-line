import { UserID } from "common/dist";
import Barline from "./Barline";

interface BarLineVisualizerProps {
  author: UserID;
}

const BarLineVisualizer: React.FC<BarLineVisualizerProps> = ({ author }) => {
  return <Barline author={author} />;
};

export default BarLineVisualizer;
