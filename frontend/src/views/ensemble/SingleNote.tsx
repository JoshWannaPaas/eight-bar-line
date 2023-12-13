import { Instrument, NoteType } from "common/dist";
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { beatNumberAtom } from "../../recoil/beat";
import { paletteAtom } from "../../recoil/palette";
import { paletteDict } from "../../ui-components/Palette";
import { currentInstrumentAtom } from "../../recoil/instrument";
import {
  altoSaxSampler,
  bassSampler,
  fluteSampler,
  guitarSampler,
  marimbaSampler,
  tubaSampler,
} from "./Samplers";
import * as Tone from "tone";

interface SingleNoteProps {
  beatNumber: number;
  /** An integer */
  pitch: number;
}

const PITCH_VALUES = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
let instrumentSampler = fluteSampler;

const SingleNote: FC<SingleNoteProps> = ({ beatNumber, pitch }) => {
  const palette = useRecoilValue(paletteAtom);
  // Colors for notes
  const colorMapping = {
    [NoteType.REST]: paletteDict[palette].rest,
    [NoteType.ATTACK]: paletteDict[palette].attack,
    [NoteType.SUSTAIN]: paletteDict[palette].sustain,
  };

  // note type - attack sustain rest
  const [currentNoteType, setCurrentNoteType] = useState(NoteType.REST);

  const globalBeatNumber = useRecoilValue(beatNumberAtom);
  const currentInstrument = useRecoilValue(currentInstrumentAtom);
  const playNow = globalBeatNumber === beatNumber;
  const now = Tone.now();

  useEffect(() => {
    // Do nothing if music is not being played
    if (!playNow) return;

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
    
    // Trigger a music note if we are not a NoteType.REST
    if (currentNoteType === NoteType.ATTACK) {
      // instrumentSampler.triggerAttack(PITCH_VALUES[pitch]);
      Tone.Transport.scheduleOnce((time) => {
        instrumentSampler.triggerAttackRelease(PITCH_VALUES[pitch], '4n', time);
      }, Tone.now());
    }

    if (currentNoteType === NoteType.REST) {
      instrumentSampler.triggerRelease(now);
    }
  }, [playNow, pitch, currentNoteType, currentInstrument, now, beatNumber]);

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
  if (onHover || playNow) {
    if (currentNoteType === NoteType.REST) highlight = 1.1;
    if (currentNoteType === NoteType.SUSTAIN) highlight = 1.4;
    if (currentNoteType === NoteType.ATTACK) highlight = 1.8;
  }

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
