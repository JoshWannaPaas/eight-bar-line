import { NoteType } from "common/dist";
import { FC, useState } from "react";
import { Box } from "@mui/material";

// Colors for notes
const colorMapping = {
  [NoteType.REST]: "lightgray",
  [NoteType.ATTACK]: "gray",
  [NoteType.SUSTAIN]: "darkgray", // ???? why is this lighter than gray
};

const SingleNote: FC = () => {
  // note type - attack sustain rest
  const [currentNoteType, setCurrentNoteType] = useState(NoteType.REST);

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
  // If hovering, overwrite the note color

  // Color depends on Hover and NoteType

  let noteColor = colorMapping[NoteType.REST];
  let highlight = 1;

  // Coloring
  if (currentNoteType === NoteType.ATTACK)
    noteColor = colorMapping[NoteType.ATTACK];
  if (currentNoteType === NoteType.SUSTAIN)
    noteColor = colorMapping[NoteType.SUSTAIN];
  if (onHover) highlight = 1.1;

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
