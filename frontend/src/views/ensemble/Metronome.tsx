import { FC, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { beatNumberAtom } from "../../recoil/beat";
import * as Tone from "tone";
import { Button } from "@mui/material";

/**
 * This component is only responsible for incrementing the global beat number atom
 */
const Metronome: FC = () => {
  const setBeatNumber = useSetRecoilState(beatNumberAtom);
  const [playing, setPlaying] = useState(false);

  const toggleMetronome = () => {
    if (!playing) {
      Tone.start();
      Tone.Transport.start();
      Tone.Transport.bpm.value = msToBPM(tempoMS);
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (!playing) return setBeatNumber(-1);

    const intervalId = setInterval(
      () => setBeatNumber((old) => (old + 1) % 32),
      tempoMS,
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [playing, setBeatNumber]);

  return (
    <Button
      variant="contained"
      color={playing ? "success" : "primary"}
      onClick={toggleMetronome}
    >
      Toggle Metronome
    </Button>
  );
};

export default Metronome;

const tempoMS = 200;

const msToBPM = (ms: number) => {
  return (1000 / ms) * 60;
};
