import { FC } from "react";
import "./index.css";
import Ping from "../../ui-components/Ping";

const HomeView: FC = () => {
  return (
    <main>
      <div id="title">
        <h1>8Bar Line</h1>
        <h2>Make bites of music</h2>
      </div>
      <Ping />
    </main>
  );
};

export default HomeView;
