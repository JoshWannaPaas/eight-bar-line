import { Instrument, NoteType } from "common/dist";
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { beatNumberAtom } from "../../recoil/beat";
import * as Tone from "tone";
import { currentInstrumentAtom } from "../../recoil/instrument";
import {
  altoSaxSampler,
  bassSampler,
  fluteSampler,
  guitarSampler,
  marimbaSampler,
  tubaSampler,
} from "./Samplers";

// Colors for notes
const colorMapping = {
  [NoteType.REST]: "lightgray",
  [NoteType.ATTACK]: "gray",
  [NoteType.SUSTAIN]: "darkgray", // This is lighter than gray for some reason
};

interface SingleNoteProps {
  beatNumber: number;
  /** An integer */
  pitch: number;
}

const now = Tone.now();
const PITCH_VALUES = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
let instrumentSampler = fluteSampler;

const SingleNote: FC<SingleNoteProps> = ({ beatNumber, pitch }) => {
  // note type - attack sustain rest
  const [currentNoteType, setCurrentNoteType] = useState(NoteType.REST);

  const globalBeatNumber = useRecoilValue(beatNumberAtom);
  const currentInstrument = useRecoilValue(currentInstrumentAtom);
  const playNow = globalBeatNumber === beatNumber;

  useEffect(() => {
    // Do nothing if music is not being played
    if (!playNow) return;

    // Trigger a music note if we are not a NoteType.REST
    if (currentNoteType === NoteType.ATTACK) {
      // Assign correct instrument sounds to what player selected
      switch (currentInstrument) {
        case Instrument.FLUTE:
          instrumentSampler = fluteSampler;
          break;
        case Instrument.ALTO_SAX:
          instrumentSampler = altoSaxSampler;
          break;
        case Instrument.MARIMBA:
          instrumentSampler = marimbaSampler;
          break;
        case Instrument.GUITAR:
          instrumentSampler = guitarSampler;
          break;
        case Instrument.BASS:
          instrumentSampler = bassSampler;
          break;
        case Instrument.TUBA:
          instrumentSampler = tubaSampler;
          break;
      }
      instrumentSampler.triggerAttack(PITCH_VALUES[pitch]);
    } else if (currentNoteType === NoteType.REST) {
      instrumentSampler.triggerRelease(now);
    }
  }, [playNow, pitch, currentNoteType, currentInstrument]);

  // Store if we are currently hovering over it
  const [onHover, setOnHover] = useState(false);

  // When mouse enter, "we are hovering"
  const handleMouseEnter = () => {
    setOnHover(true);
  };

  // When mouse leave, "we are not hovering"
  const handleMouseLeave = () => {
    setOnHover(false);
  };

  // When click, update current note type
  const handleClick = () => {
    if (currentNoteType === NoteType.REST) setCurrentNoteType(NoteType.ATTACK);
    else if (currentNoteType === NoteType.ATTACK)
      setCurrentNoteType(NoteType.SUSTAIN);
    else if (currentNoteType === NoteType.SUSTAIN)
      setCurrentNoteType(NoteType.REST);
  };

  // Color depends on Hover and NoteType
  let noteColor = colorMapping[NoteType.REST];
  let highlight = 1; // 100% Brightness which is Normal Brightness

  // Coloring
  if (currentNoteType === NoteType.ATTACK)
    noteColor = colorMapping[NoteType.ATTACK];
  if (currentNoteType === NoteType.SUSTAIN)
    noteColor = colorMapping[NoteType.SUSTAIN];
  if (onHover || playNow) highlight = 1.1;

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      sx={{
        backgroundColor: noteColor,
        minWidth: 32,
        minHeight: 32,
        margin: "2px",
        filter: `brightness(${highlight})`,
      }}
    />
  );
};
export default SingleNote;
