import { Instrument, NoteType, UserID } from "common/dist";
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { beatNumberAtom } from "../../../recoil/beat";
import { paletteAtom } from "../../../recoil/palette";
import { paletteDict } from "../../../ui-components/Palette";
import {
  altoSaxSampler,
  bassSampler,
  fluteSampler,
  guitarSampler,
  marimbaSampler,
  tubaSampler,
} from "./Samplers";
import { ensembleAtom } from "../../../recoil/ensemble";
import { socketAtom, userIDSelector } from "../../../recoil/socket";
import * as Tone from "tone";

interface SingleNoteProps {
  beatNumber: number;
  /** An integer */
  pitch: number;
  author: UserID;
}

const PITCH_VALUES = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];

const SingleNote: FC<SingleNoteProps> = ({ beatNumber, pitch, author }) => {
  const palette = useRecoilValue(paletteAtom);
  const [currentEnsemble, setCurrentEnsemble] = useRecoilState(ensembleAtom);
  const { state, contents: socket } = useRecoilValueLoadable(socketAtom);
  const userID = useRecoilValue(userIDSelector);

  // Colors for notes
  const colorMapping = {
    [NoteType.REST]: paletteDict[palette].rest,
    [NoteType.ATTACK]: paletteDict[palette].attack,
    [NoteType.SUSTAIN]: paletteDict[palette].sustain,
  };

  // note type - attack sustain rest
  const currentNoteType = currentEnsemble.getNote(
    author,
    pitch,
    beatNumber,
  ).type;

  const globalBeatNumber = useRecoilValue(beatNumberAtom);
  const currentInstrument = currentEnsemble.getInstrument(author);
  const playNow = globalBeatNumber === beatNumber;
  const now = Tone.now();

  useEffect(() => {
    // Do nothing if music is not being played
    if (!playNow) return;

    // Assign correct instrument sounds to what player selected
    const sampler = getSampler(currentInstrument);

    // Trigger a music note if we are not a NoteType.REST
    if (currentNoteType === NoteType.ATTACK) {
      Tone.Transport.scheduleOnce((time) => {
        sampler.triggerAttackRelease(PITCH_VALUES[pitch], "4n", time);
      }, Tone.now());
    }
  }, [
    playNow,
    pitch,
    currentNoteType,
    currentInstrument,
    now,
    beatNumber,
    currentEnsemble,
    userID,
    author,
  ]);

  // Change instrument sound based on currently selected
  const getSampler = (instrument: Instrument) => {
    switch (instrument) {
      case Instrument.FLUTE:
        return fluteSampler;
      case Instrument.ALTO_SAX:
        return altoSaxSampler;
      case Instrument.MARIMBA:
        return marimbaSampler;
      case Instrument.GUITAR:
        return guitarSampler;
      case Instrument.BASS:
        return bassSampler;
      case Instrument.TUBA:
        return tubaSampler;
      default:
        return fluteSampler;
    }
  };

  // Store if we are currently hovering over it
  const [onHover, setOnHover] = useState(false);

  // When mouse enter, "we are hovering"
  const handleMouseEnter = () => {
    if (userID === author) setOnHover(true);
  };

  // When mouse leave, "we are not hovering"
  const handleMouseLeave = () => {
    if (userID === author) setOnHover(false);
  };

  // When click, update current note type
  const handleClick = () => {
    if (state !== "hasValue") return;
    if (userID === author) {
      // Local update
      currentEnsemble.toggleNote(userID, pitch, beatNumber);
      setCurrentEnsemble(currentEnsemble);
      socket.emit("ensemble:toggle-note", pitch, beatNumber);
    }
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
